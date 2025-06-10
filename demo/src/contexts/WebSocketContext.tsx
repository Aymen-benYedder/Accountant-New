import React, { createContext, useContext, useEffect, useRef, useCallback, useState, useMemo, ReactNode } from 'react';
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
    // Only connect if we have a user and not in SSR
    if (typeof window === 'undefined') {
      return () => {}; // Return empty cleanup function
    }

    // Skip if already initialized or no user
    if (initializedRef.current || !user?._id) {
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

    // Get the WebSocket URL from environment variables or use default
    const wsUrl = import.meta.env.VITE_WS_URL || 
                 (import.meta.env.VITE_API_URL ? 
                   import.meta.env.VITE_API_URL.replace(/^http/, 'ws') : 
                   'ws://localhost:3001');
    
    console.log(`[WebSocket] Connecting to: ${wsUrl}`);
    
    // Get authentication token
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('[WebSocket] No token found, cannot connect');
      return () => {}; // Return empty cleanup function
    }
    
    // Create socket connection with auth token
    const socket = io(wsUrl, {
      auth: { token },
      reconnection: true,
      reconnectionAttempts: maxReconnectionAttempts,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      autoConnect: true,
      transports: ['websocket', 'polling'],
      withCredentials: true,
      query: {
        _t: Date.now(),
        clientType: 'web',
        userId: user._id || 'unknown'
      }
    });

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
    };

    const onConnectError = (error: Error) => {
      console.error('[WebSocket] Connection error:', error);
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

    // Cleanup function
    return () => {
      console.log('[WebSocket] Cleaning up WebSocket connection');
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('connect_error', onConnectError);
      socket.off('userStatus', onUserStatus);
      
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
  const contextValue = useMemo<WebSocketContextType>(() => ({
    socket: socketRef.current,
    isConnected,
    onlineUsers,
    sendMessage,
    isUserOnline,
  }), [isConnected, onlineUsers, sendMessage, isUserOnline]);

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};

// Export the WebSocketProvider as a named export
export { WebSocketProvider, useWebSocket };
