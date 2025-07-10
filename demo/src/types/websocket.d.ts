import { Socket } from 'socket.io-client';

export interface WebSocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  onlineUsers: Set<string>;
  sendMessage: (message: any) => void;
  isUserOnline: (userId: string) => boolean;
}

export {};
