// Mark this file as a module to allow global declarations
export {};

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useCallback,
  useState,
  ReactNode,
} from 'react';
import { io, Socket } from 'socket.io-client';
import { MessageStatus, MessagesProps } from '@app/_components/apps/_types/ChatTypes';
import { useAuth } from '../app/_components/_core/AuthProvider/AuthContext';
import api from "@app/_utilities/api"; // Import API utility

// Extend global window for ENV
declare global {
  interface Window {
    ENV?: {
      VITE_WS_URL?: string;
      VITE_API_URL?: string;
    };
  }
}

export interface TaskNotification {
  id: string;
  taskId: string;
  message: string;
  timestamp: string;
  eventType?: string;
  task?: {
    _id: string;
    title: string;
  };
}

export interface WebSocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  onlineUsers: Set<string>;
  lastMessage: any | null;
  unreadMessageCount: number; // Add unreadMessageCount
  taskNotifications: TaskNotification[]; // Add task notifications
  lastTaskNotification: TaskNotification | null; // Add task notification
  sendMessage: (message: any, onStatusUpdate?: (status: MessageStatus) => void) => void;
  isUserOnline: (userId: string) => boolean;
  updateMessageStatus: (messageId: string, status: MessageStatus) => void;
  markMessagesAsRead: (
    messageIds: string[],
    readerId: string
  ) => Promise<{ success: boolean; error?: string }>;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (!context) throw new Error('useWebSocket must be used within a WebSocketProvider');
  return context;
};

interface WebSocketProviderProps {
  children: ReactNode;
}

const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const reconnectAttemptsRef = useRef(0);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  //const initializedRef = useRef(false);
  const messageStatusHandlers = useRef<Record<string, (status: MessageStatus) => void>>({});

  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
  const [lastMessage, setLastMessage] = useState<any | null>(null);
  const [unreadMessageCount, setUnreadMessageCount] = useState(0); // New state for unread count
  const [taskNotifications, setTaskNotifications] = useState<TaskNotification[]>([]); // New state for task notifications
  const [lastTaskNotification, setLastTaskNotification] = useState<TaskNotification | null>(null); // New state for task notifications

  const { user: authUser } = useAuth();
  const [user, setUser] = useState<any>(authUser);

  // Hydrate user from JWT if not available
  useEffect(() => {
    if (authUser && authUser._id) {
      setUser(authUser);
      console.log('[WebSocketContext] Hydrated user from AuthProvider:', authUser);
    } else {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          if (payload && (payload.id || payload._id)) {
            setUser({ _id: payload.id || payload._id, ...payload });
            console.log('[WebSocketContext] Hydrated user from JWT:', payload);
          }
        } catch (e) {
          console.error('[WebSocketContext] Failed to decode JWT for user hydration:', e);
        }
      }
    }
  }, [authUser]);

  const sendMessage = useCallback(
    (message: any, onStatusUpdate?: (status: MessageStatus) => void) => {
      if (socketRef.current?.connected) {
        const tempId = message.tempId || `temp-${Date.now()}`;
        if (onStatusUpdate) {
          messageStatusHandlers.current[tempId] = onStatusUpdate;
          onStatusUpdate('sending');
        }

        const payload = {
          ...message,
          tempId,
          timestamp: message.timestamp || new Date().toISOString(),
        };

        socketRef.current.emit('sendMessage', payload, (response: any) => {
          if (response?.success && response.message?._id) {
            if (onStatusUpdate) {
              onStatusUpdate('sent');
              if (response.message.status === 'delivered') {
                onStatusUpdate('delivered');
              }
            }
            messageStatusHandlers.current[response.message._id] =
              messageStatusHandlers.current[tempId];
            delete messageStatusHandlers.current[tempId];
          } else {
            onStatusUpdate?.('error');
          }
        });
      } else {
        onStatusUpdate?.('error');
      }
    },
    []
  );

  const isUserOnline = useCallback(
    (userId: string): boolean => onlineUsers.has(userId),
    [onlineUsers]
  );

  const updateMessageStatus = useCallback((messageId: string, status: MessageStatus) => {
    const handler = messageStatusHandlers.current[messageId];
    if (handler) {
      handler(status);
      if (['delivered', 'read', 'error'].includes(status)) {
        delete messageStatusHandlers.current[messageId];
      }
    }
  }, []);

  const markMessagesAsRead = useCallback(
    async (messageIds: string[], readerId: string): Promise<{ success: boolean; error?: string }> => {
      if (!socketRef.current?.connected) return { success: false, error: 'Not connected' };
      if (!messageIds?.length) return { success: false, error: 'No message IDs' };

      return await new Promise((resolve) => {
        const timeout = setTimeout(() => resolve({ success: false, error: 'Timeout' }), 5000);

        socketRef.current?.emit('markMessagesAsRead', { messageIds, readerId }, (response: any) => {
          clearTimeout(timeout);
          if (response?.success) {
            messageIds.forEach((id) => updateMessageStatus(id, 'read'));
            resolve({ success: true });
          } else {
            resolve({ success: false, error: response?.error || 'Failed' });
          }
        });
      });
    },
    [updateMessageStatus, user?._id] // Add user?._id to dependencies
  );

  const connectWebSocket = useCallback(() => {
    console.log('[WebSocketContext] connectWebSocket called');
    if (typeof window === 'undefined') {
      console.warn('[WebSocketContext] Not in browser environment, aborting connect');
      return () => {};
    }
    if (socketRef.current?.connected) {
      console.warn('[WebSocketContext] Socket already connected, skipping');
      return () => {};
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('[WebSocketContext] No token found, aborting connect');
      return () => {};
    }

    let userId = user?._id;
    if (!userId) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        userId = decoded.id || decoded._id;
        if (userId) localStorage.setItem('userId', userId);
        console.log('[WebSocketContext] Hydrated userId from JWT in connectWebSocket:', userId);
      } catch (e) {
        console.error('[WebSocketContext] Failed to decode JWT for userId in connectWebSocket:', e);
      }
    }

    if (!userId) {
      console.error('[WebSocketContext] No userId found, aborting connect');
      return () => {};
    }

    let wsUrl =
      import.meta.env.VITE_WS_URL ||
      window.ENV?.VITE_WS_URL ||
      'ws://localhost:3000';

    // Validate token
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < now) {
        // Token is expired, clear it and force logout
        console.log('[WebSocketContext] Token expired, redirecting to login');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('user');
        window.location.href = '/auth/login-1';
        return () => {};
      }
    } catch (e) {
      console.error('[WebSocketContext] Failed to decode JWT for token validation:', e);
    }

    console.log('[WebSocketContext] Connecting to', wsUrl, 'with userId:', userId);
    const socket = io(wsUrl, {
      auth: { token },
      autoConnect: true,
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      forceNew: true,
      query: {
        _t: Date.now(),
        clientType: 'web',
        userId,
        clientVersion: '1.0.0',
      },
      path: '/socket.io/',
    });

    socketRef.current = socket;

    socket.on('connect', async () => {
      setIsConnected(true);
      reconnectAttemptsRef.current = 0;
      console.log('[WebSocketContext] Socket connected! Socket ID:', socket.id, 'userId:', userId);
      // Fetch initial unread count on connect
      if (userId) {
        try {
          const response = await api.get(`/messages/unread/count?userId=${userId}`);
          setUnreadMessageCount(response.data.count);
          console.log('[WebSocketContext] Initial unread count:', response.data.count);
        } catch (error) {
          console.error('[WebSocketContext] Error fetching initial unread count:', error);
        }
      }
    });

    socket.on('disconnect', (reason) => {
      setIsConnected(false);
      console.warn('[WebSocketContext] Socket disconnected. Reason:', reason);
      if (reconnectAttemptsRef.current < 5) {
        const delay = Math.min(1000 * 2 ** reconnectAttemptsRef.current, 30000);
        reconnectAttemptsRef.current++;
        reconnectTimeoutRef.current = setTimeout(() => socket.connect(), delay);
        console.log('[WebSocketContext] Scheduling reconnect in', delay, 'ms. Attempt:', reconnectAttemptsRef.current);
      }
    });

    socket.on('connect_error', (error) => {
      console.error('[WebSocketContext] Connection error:', error);
      socket.io.opts.transports = ['polling', 'websocket'];
      socket.disconnect().connect();
    });

    socket.on('userStatus', ({ userId, isOnline }) => {
      setOnlineUsers((prev) => {
        const newSet = new Set(prev);
        isOnline ? newSet.add(userId) : newSet.delete(userId);
        return newSet;
      });
      console.log('[WebSocketContext] userStatus event:', userId, isOnline);
    });

    socket.on('newMessage', (msg: MessagesProps) => {
      setLastMessage(msg);
      window.dispatchEvent(new CustomEvent('newMessage', { detail: msg }));
      if (msg.recipientId === userId && !msg.read) {
        setUnreadMessageCount(prev => prev + 1);
      }
      console.log('[WebSocketContext] newMessage event:', msg);
    });

    socket.on('message:delivered', ({ messageId }) => {
      updateMessageStatus(messageId, 'delivered');
      console.log('[WebSocketContext] message:delivered event:', messageId);
    });
    socket.on('message:read', ({ messageId }) => {
      updateMessageStatus(messageId, 'read');
      console.log('[WebSocketContext] message:read event:', messageId);
    });
    socket.on('message:received', ({ messageId }) => {
      updateMessageStatus(messageId, 'received');
      console.log('[WebSocketContext] message:received event:', messageId);
    });

    socket.on('taskNotification', (taskNotification: TaskNotification) => {
      setTaskNotifications((prevNotifications) => [...prevNotifications, taskNotification]);
      setLastTaskNotification(taskNotification);
      window.dispatchEvent(new CustomEvent('taskNotification', { detail: taskNotification }));
      console.log('[WebSocketContext] taskNotification event:', taskNotification);
    });

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
      console.log('[WebSocketContext] Socket cleanup complete');
    };
  }, [user?._id, updateMessageStatus, setUnreadMessageCount]);

  // Track token in state to trigger reconnect on change (including same-tab changes)
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = localStorage.getItem('token');
      setToken(newToken);
      if (newToken && (!user || !user._id)) {
        try {
          const payload = JSON.parse(atob(newToken.split('.')[1]));
          if (payload && (payload.id || payload._id)) {
            setUser({ _id: payload.id || payload._id, ...payload });
            console.log('[WebSocketContext] Hydrated user from JWT in storage event:', payload);
          }
        } catch (e) {
          console.error('[WebSocketContext] Failed to decode JWT for user hydration in storage event:', e);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('auth:login', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth:login', handleStorageChange);
    };
  }, [user]);

  // Attempt to connect when token changes or on initial mount if token exists
useEffect(() => {
  if (!token || !user?._id) return; // Only attempt connection if both token and user are present
  const cleanup = connectWebSocket();
  return () => {
    cleanup();
    reconnectTimeoutRef.current && clearTimeout(reconnectTimeoutRef.current);
    socketRef.current?.disconnect();
  };
}, [connectWebSocket, token, user?._id]); // Depend on connectWebSocket, token, and user._id

  useEffect(() => {
    if (!isConnected && user?._id && reconnectAttemptsRef.current < 5) {
      reconnectTimeoutRef.current = setTimeout(() => {
        reconnectAttemptsRef.current += 1;
        connectWebSocket();
      }, 1000 * 2 ** reconnectAttemptsRef.current);

      return () => {
        reconnectTimeoutRef.current && clearTimeout(reconnectTimeoutRef.current);
      };
    }
  }, [isConnected, user?._id, connectWebSocket]);

  const contextValue = React.useMemo(
    () => ({
      socket: socketRef.current,
      isConnected,
      onlineUsers,
      lastMessage,
      unreadMessageCount, // Expose unreadMessageCount
      taskNotifications, // Expose task notifications
      lastTaskNotification, // Expose task notification
      sendMessage,
      isUserOnline,
      updateMessageStatus,
      markMessagesAsRead,
    }),
    [isConnected, onlineUsers, lastMessage, unreadMessageCount, lastTaskNotification, sendMessage, isUserOnline, updateMessageStatus, markMessagesAsRead]
  );

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};

export { WebSocketProvider, useWebSocket };
