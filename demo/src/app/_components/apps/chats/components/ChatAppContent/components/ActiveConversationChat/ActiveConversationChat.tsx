import React, { useEffect, useCallback } from "react";
import { Box, Chip, Typography } from "@mui/material";
import { SentMessageContent } from "../SentMessageContent";
import { ReceivedMessageContent } from "../ReceivedMessageContent";
import { MessagesProps, MessageStatus } from "@app/_components/apps/_types/ChatTypes";
import { useWebSocket } from "@contexts/WebSocketContext";


// Enhanced message type that makes content required and handles status properly
type EnhancedMessageProps = Omit<MessagesProps, 'status' | 'content'> & {
  _id?: string;
  status?: MessageStatus;
  timestamp?: string | Date;
  createdAt?: string | Date;
  sent_at?: string | Date;
  read?: boolean;
  senderId?: string;
  content: string; // Required in enhanced type
}

interface ActiveConversationChatProps {
  conversation: {
    messages: EnhancedMessageProps[];
    sent_date?: string;
  };
  activeConversation: {
    contact?: {
      id: string;
      name: string;
      avatar?: string;
    };
  };
  currentUserId: string;
  loading?: boolean;
}

const ActiveConversationChat: React.FC<ActiveConversationChatProps> = (props) => {
  const { conversation, activeConversation, currentUserId, loading = false } = props;
  const remoteUser = activeConversation?.contact;
  const messagesContainerRef = React.useRef<HTMLDivElement>(null);
  const { socket, isConnected } = useWebSocket();
  
  // Track which messages have been seen by the remote user with proper typing
  const [messageStatus, setMessageStatus] = React.useState<Record<string, MessageStatus>>({});
  
  // Memoize and sort messages by timestamp
  const messages = React.useMemo(() => {
    return (conversation?.messages || []).sort((a, b) => {
      const getTime = (msg: EnhancedMessageProps): number => {
        const time = msg.timestamp || msg.createdAt || msg.sent_at;
        if (!time) return 0;
        // Convert to timestamp if it's a Date object or string
        return time instanceof Date ? time.getTime() : new Date(time).getTime();
      };
      return getTime(a) - getTime(b);
    });
  }, [conversation?.messages]);
  
  // Auto-scroll to bottom when new messages arrive
  React.useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  // Set up WebSocket event listeners for message status updates
  useEffect(() => {
    if (!socket || !isConnected) return;
    
    const handleMessageDelivered = (data: { messageId: string }) => {
      console.log('Message delivered:', data.messageId);
      setMessageStatus(prev => ({
        ...prev,
        [data.messageId]: 'delivered' as MessageStatus
      }));
    };
    
    const handleMessageRead = (data: { messageId: string }) => {
      console.log('Message read:', data.messageId);
      setMessageStatus(prev => ({
        ...prev,
        [data.messageId]: 'read' as MessageStatus
      }));
    };
    
    const handleMessageStatusChanged = (data: { 
      messageId: string; 
      status: MessageStatus;
      timestamp?: string | Date;
    }) => {
      console.log('Message status changed:', data);
      setMessageStatus(prev => ({
        ...prev,
        [data.messageId]: data.status
      }));
    };
    
    socket.on('message:delivered', handleMessageDelivered);
    socket.on('message:read', handleMessageRead);
    socket.on('messageStatusChanged', handleMessageStatusChanged);
    
    return () => {
      socket.off('message:delivered', handleMessageDelivered);
      socket.off('message:read', handleMessageRead);
      socket.off('messageStatusChanged', handleMessageStatusChanged);
    };
  }, [socket, isConnected]);
  
  // Mark messages as read when they become visible
  const handleMessageSeen = useCallback((messageId: string | number) => {
    if (!socket || !isConnected) return;
    
    // Only mark as read if the message is from the other user
    const message = messages.find(m => m._id === messageId || m.id === messageId);
    if (message && String(message.senderId) !== String(currentUserId)) {
      console.log('Marking message as read:', messageId);
      socket.emit('message:read', { messageId: String(messageId) });
    }
  }, [socket, isConnected, messages, currentUserId]);
  
  // Message status rendering is handled in the message content components
  
  // Loading state
  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="text.secondary">Loading messages...</Typography>
      </Box>
    );
  }
  
  // Empty state
  if (messages.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="text.secondary">No messages yet. Start the conversation!</Typography>
      </Box>
    );
  }

  return (
    <Box
      ref={messagesContainerRef}
      onScroll={(e) => {
        // Check if we've scrolled to the bottom (or near it)
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
        
        if (isNearBottom) {
          // Mark messages as read when scrolled to bottom
          messages.forEach(msg => {
            // Only mark as read if the message is from the other user and not already read
            const msgId = msg._id || msg.id;
            if (msgId && msg.senderId !== currentUserId && msg.status !== 'read') {
              handleMessageSeen(msgId);
            }
          });
        }
      }}
      sx={{
        flex: 1,
        overflowY: 'auto',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
      {/* Single date chip at the top */}
      {conversation?.sent_date && (
        <Box sx={{ 
          position: 'relative', 
          textAlign: 'center', 
          my: 1,
          '&:after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            top: '50%',
            height: '1px',
            backgroundColor: 'divider',
            zIndex: 1,
          },
        }}>
          <Chip
            label={conversation.sent_date}
            variant="outlined"
            size="small"
            sx={{
              position: 'relative',
              zIndex: 2,
              bgcolor: 'background.paper',
              borderColor: 'divider',
              borderRadius: 2,
            }}
          />
        </Box>
      )}
      
      {/* Messages */}
      {messages.map((message, idx) => {
        const messageId = message._id || `msg-${message.id || Math.random().toString(36).substr(2, 9)}`;
        const isOwnMessage = String(message.senderId || message.sent_by) === String(currentUserId);
        const status = messageStatus[messageId] || message.status || (isOwnMessage ? 'sent' : 'received');
        let senderName = "Contact";
        
        if (isOwnMessage) {
          senderName = "You";
        } else if (remoteUser) {
          senderName = remoteUser.name || "Contact";
        }

        return (
          <React.Fragment key={message._id || `msg-${message.id || Math.random().toString(36).substr(2, 9)}`}>
            {isOwnMessage ? (
              <Box key={messageId} sx={{ position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                <SentMessageContent
                  message={{
                    ...message,
                    status,
                    _id: messageId,
                    read: status === 'read'
                  }}
                  showAvatar={idx === messages.length - 1 || messages[idx + 1].senderId !== message.senderId}
                />
              </Box>
            ) : (
              <ReceivedMessageContent 
                message={{
                  ...message,
                  _id: messageId,
                  status,
                  read: status === 'read',
                  readAt: status === 'read' ? new Date().toISOString() : undefined
                }}
                senderName={senderName}
              />
            )}
          </React.Fragment>
        );
      })}
    </Box>
  );
};

export { ActiveConversationChat };
