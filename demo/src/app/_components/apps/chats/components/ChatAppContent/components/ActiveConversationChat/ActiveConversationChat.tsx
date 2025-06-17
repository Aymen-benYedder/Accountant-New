import React from "react";
import { Box, Chip, Typography } from "@mui/material";
import { SentMessageContent } from "../SentMessageContent";
import { ReceivedMessageContent } from "../ReceivedMessageContent";
import { MessagesProps } from "@app/_components/apps/_types/ChatTypes";

// Union of specific status values we expect, plus any string for backward compatibility
type MessageStatus = 'sending' | 'delivered' | 'error' | string;

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
      {messages.map((message) => {
        const isOwnMessage = String(message.senderId || message.sent_by) === String(currentUserId);
        let senderName = "Contact";
        
        if (isOwnMessage) {
          senderName = "You";
        } else if (remoteUser) {
          senderName = remoteUser.name || "Contact";
        }

        return (
          <React.Fragment key={message._id || `msg-${message.id || Math.random().toString(36).substr(2, 9)}`}>
            {isOwnMessage ? (
              <div style={{ position: 'relative' }}>
                <SentMessageContent 
                  message={message} 
                  senderName={senderName}
                  status={message.status || 'delivered'}
                />
              </div>
            ) : (
              <ReceivedMessageContent 
                message={message}
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
