import React, { createContext, useContext, useEffect, useRef, useCallback, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
// Import useAuth with a safe default to handle cases where AuthProvider is not available
let useAuth: any = () => ({});
try {
  // Try to import useAuth dynamically
  const authModule = require('../app/_components/_core/AuthProvider/AuthContext');
  useAuth = authModule.useAuth || (() => ({}));
} catch (e) {
  console.warn('AuthContext not available, WebSocket will only work with explicit user data');
}

// Define the WebSocket context type
export interface WebSocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  onlineUsers: Set<string>;
  lastMessage: any | null;
  sendMessage: (message: any) => void;
  isUserOnline: (userId: string) => boolean;
}

// Create the WebSocket context
const WebSocketContext = createContext<WebSocketContextType | null>(null);

/**
 * Custom hook to use WebSocket context
 * @returns {WebSocketContextType} WebSocket context with connection status and methods
 * @throws {Error} If used outside of WebSocketProvider
 */
const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};

// Extend Window interface for environment variables
declare global {
  interface Window {
    ENV: {
      VITE_WS_URL?: string;
      VITE_API_URL?: string;
    };
  }
}

interface WebSocketProviderProps {
  children: ReactNode;
}

/**
 * WebSocketProvider component that manages WebSocket connection and provides it via context
 */
const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  // Use a ref to track if we've shown the auth warning
  const authWarningShown = useRef(false);
  
  // Safely get auth and user, with fallbacks
  let user: any = null;
  try {
    const auth = useAuth?.() || {};
    user = auth?.user;
  } catch (error) {
    if (!authWarningShown.current) {
      console.warn('Auth context not available, WebSocket will only work with explicit user data');
      authWarningShown.current = true;
    }
  }
  
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
  const [lastMessage, setLastMessage] = useState<any | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const maxReconnectionAttempts = 5;
  // Track if we've initialized the socket connection
  const initializedRef = useRef(false);

  // Function to send a message through the socket
  const sendMessage = useCallback((message: any) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('sendMessage', message);
    } else {
      console.warn('Cannot send message - socket not connected');
    }
  }, []);

  // Check if a user is online
  const isUserOnline = useCallback((userId: string): boolean => {
    return onlineUsers.has(userId);
  }, [onlineUsers]);

  // Connect to WebSocket
  const connectWebSocket = useCallback((): (() => void) => {
    // Only connect if not in SSR
    if (typeof window === 'undefined') {
      return () => {}; // Return empty cleanup function
    }

    // Skip if already connected
    if (socketRef.current?.connected) {
      console.log('[WebSocket] Already connected, skipping reconnection');
      return () => {}; // Return empty cleanup function
    }

    // Get token and parse user ID from JWT
    const authToken = localStorage.getItem('token');
    if (!authToken) {
      console.warn('[WebSocket] No auth token found, cannot connect');
      return () => {}; // Return empty cleanup function
    }

    // Parse user ID from JWT token
    let userId = user?._id;
    if (!userId && authToken) {
      try {
        const payload = authToken.split('.')[1];
        const decoded = JSON.parse(atob(payload));
        userId = decoded?.id || decoded?._id;
        if (userId) {
          console.log('[WebSocket] Extracted user ID from JWT:', userId);
          // Store the user ID for future reconnections
          localStorage.setItem('userId', userId);
        }
      } catch (error) {
        console.error('[WebSocket] Error parsing JWT token:', error);
      }
    }

    if (!userId) {
      console.warn('[WebSocket] No user ID available, cannot connect');
      return () => {}; // Return empty cleanup function
    }
    
    initializedRef.current = true;

    // Clear any existing reconnection timeout
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    // Don't reconnect if already connected
    if (socketRef.current?.connected) {
      console.log('[WebSocket] Already connected, skipping reconnection');
      return () => {}; // Return empty cleanup function
    }

    // Get the WebSocket URL from environment variables with proper fallbacks
    let wsUrl = import.meta.env.VITE_WS_URL || 
      `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}`;
      
    // If API base URL is provided but WS URL isn't, derive it from API URL
    if (!import.meta.env.VITE_WS_URL && import.meta.env.VITE_API_BASE_URL) {
      try {
        const apiUrl = new URL(import.meta.env.VITE_API_BASE_URL);
        wsUrl = `${apiUrl.protocol === 'https:' ? 'wss:' : 'ws:'}//${apiUrl.host}`;
      } catch (e) {
        console.warn('Invalid VITE_API_BASE_URL, using default WebSocket URL');
      }
    }
    
    console.log(`[WebSocket] Connecting to: ${wsUrl}`);
    
    // Get authentication token
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('[WebSocket] No token found, cannot connect');
      return () => {}; // Return empty cleanup function
    }
    
    // Parse token to check expiration
    let isTokenExpired = false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < currentTime) {
        console.warn('[WebSocket] Token has expired');
        isTokenExpired = true;
      }
    } catch (e) {
      console.error('[WebSocket] Error parsing token:', e);
    }
    
    if (isTokenExpired) {
      console.warn('[WebSocket] Token is invalid or expired, cannot connect');
      return () => {}; // Return empty cleanup function
    }
    
    // Create socket connection with enhanced configuration
    const socket = io(wsUrl, {
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 10000,
      timeout: 20000,
      autoConnect: true,
      transports: ['websocket', 'polling'], // Try both transports
      withCredentials: true,
      forceNew: true,
      secure: true, // Enable secure connection
      rejectUnauthorized: false, // Only for development with self-signed certs
      query: {
        _t: Date.now(),
        clientType: 'web',
        token: token,
        userId: userId || 'unknown',
        clientVersion: '1.0.0'
      },
      path: '/socket.io/' // Ensure this matches your server configuration
    });
    
    // Enable debug logging
    socket.on('connect', () => console.log('[WebSocket] Connected to server'));
    socket.on('disconnect', (reason) => console.log(`[WebSocket] Disconnected: ${reason}`));
    socket.on('connect_error', (error) => console.error('[WebSocket] Connection error:', error));
    socket.on('error', (error) => console.error('[WebSocket] Error:', error));
    
    socketRef.current = socket;
    console.log('[WebSocket] Socket instance created, connecting...');

    // Connection event handlers
    const onConnect = () => {
      const timestamp = new Date().toISOString();
      console.log(`[WebSocket] [${timestamp}] Connected!`);
      setIsConnected(true);
      reconnectAttemptsRef.current = 0;
    };

    const onDisconnect = (reason: string) => {
      console.log(`[WebSocket] Disconnected: ${reason}`);
      setIsConnected(false);
      
      // Attempt to reconnect with exponential backoff
      if (reconnectAttemptsRef.current < maxReconnectionAttempts) {
        const delay = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 30000);
        console.log(`[WebSocket] Attempting to reconnect in ${delay}ms...`);
        reconnectAttemptsRef.current++;
        
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
        }
        
        reconnectTimeoutRef.current = setTimeout(() => {
          console.log('[WebSocket] Attempting to reconnect...');
          socket.connect();
        }, delay);
      } else {
        console.warn('[WebSocket] Max reconnection attempts reached');
      }
    };

    const onConnectError = (error: Error) => {
      console.error('[WebSocket] Connection error:', error);
      
      // Try falling back to polling if websocket fails
      if (socket.io.opts.transports?.[0] !== 'polling') {
        console.log('[WebSocket] Trying fallback to polling transport...');
        socket.io.opts.transports = ['polling', 'websocket'];
        socket.disconnect().connect();
      }
    };

    const onUserStatus = (data: { userId: string; isOnline: boolean }) => {
      console.log(`[WebSocket] User ${data.userId} is now ${data.isOnline ? 'online' : 'offline'}`);
      setOnlineUsers(prev => {
        const newSet = new Set(prev);
        if (data.isOnline) {
          newSet.add(data.userId);
        } else {
          newSet.delete(data.userId);
        }
        return newSet;
      });
    };

    // Set up event listeners
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('connect_error', onConnectError);
    socket.on('userStatus', onUserStatus);

    // Handle new incoming messages
    const onNewMessage = (message: any) => {
      console.log('[WebSocket] New message received in context:', {
        id: message._id,
        from: message.senderId,
        to: message.recipientId,
        content: message.content ? `${message.content.substring(0, 50)}${message.content.length > 50 ? '...' : ''}` : 'No content',
        timestamp: message.timestamp || new Date().toISOString()
      });
      
      // Store the last message in state
      setLastMessage(message);
      
      // Also emit a global event for backward compatibility
      window.dispatchEvent(new CustomEvent('newMessage', { detail: message }));
    };

    // Set up event listeners
    socket.on('newMessage', onNewMessage);
    
    // Cleanup function
    return () => {
      console.log('[WebSocket] Cleaning up WebSocket connection');
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('connect_error', onConnectError);
      socket.off('userStatus', onUserStatus);
      socket.off('newMessage', onNewMessage);
      
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, [user?._id, maxReconnectionAttempts]);

  // Handle initial connection and reconnections
  useEffect(() => {
    const cleanup = connectWebSocket();
    
    return () => {
      cleanup();
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
      
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [connectWebSocket]);

  // Handle reconnection when connection is lost
  useEffect(() => {
    if (!isConnected && user?._id && reconnectAttemptsRef.current < maxReconnectionAttempts) {
      const delay = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 30000);
      console.log(`[WebSocket] Will attempt to reconnect in ${delay}ms...`);
      
      reconnectTimeoutRef.current = setTimeout(() => {
        reconnectAttemptsRef.current += 1;
        connectWebSocket();
      }, delay);
      
      return () => {
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
          reconnectTimeoutRef.current = null;
        }
      };
    }
  }, [isConnected, user?._id, connectWebSocket, maxReconnectionAttempts]);

  // Context value
  const contextValue = React.useMemo(() => ({
    socket: socketRef.current,
    isConnected,
    onlineUsers,
    lastMessage,
    sendMessage,
    isUserOnline
  }), [isConnected, onlineUsers, lastMessage, sendMessage, isUserOnline]);

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};

// Export the WebSocketProvider as a named export
export { WebSocketProvider, useWebSocket };
