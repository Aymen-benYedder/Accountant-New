import React from "react";
import Chip from "@mui/material/Chip";
import { Div } from "@jumbo/shared";
import { CircularProgress, Tooltip } from "@mui/material";
import { SentMessageContent } from "../SentMessageContent";
import { ReceivedMessageContent } from "../ReceivedMessageContent";
import { MessagesProps } from "@app/_components/apps/_types/ChatTypes";

interface EnhancedMessageProps extends MessagesProps {
  _id?: string;
  status?: 'sending' | 'delivered' | 'error';
  timestamp?: string;
  createdAt?: string;
}

/** todo any convert to real props */
const ActiveConversationChat = (props: any) => {
  console.log('[ActiveConversationChat] received props:', props);
  const { conversation, activeConversation, currentUserId } = props;
  // Assume messages array has senderId populated for each message
  const remoteUser = activeConversation?.contact;
  
  // Memoize the message list to prevent unnecessary re-renders
  const messages = React.useMemo(() => {
    return (conversation?.messages || []).sort((a: any, b: any) => 
      new Date(a.timestamp || a.createdAt).getTime() - new Date(b.timestamp || b.createdAt).getTime()
    );
  }, [conversation?.messages]);

  return (
    <React.Fragment>
      <Div
        sx={{
          position: "relative",
          textAlign: "center",
          mb: 2,
          "&:after": {
            display: "inline-block",
            content: "''",
            position: "absolute",
            left: 0,
            right: 0,
            height: "1px",
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "divider",
          },
        }}
      >
        <Chip
          label={typeof conversation?.sent_date === "string" && conversation.sent_date !== "undefined"
            ? conversation.sent_date
            : ""}
          variant="outlined"
          sx={{
            position: "relative",
            zIndex: 1,
            bgcolor: (theme) => theme.palette.background.paper,
            borderColor: "divider",
            borderRadius: 2,
          }}
        />
      </Div>
      {messages.map((message: EnhancedMessageProps, index: number) => {
        const isOwnMessage = message.senderId === currentUserId;
        let senderName = "Contact";
        
        if (message.senderId === currentUserId) {
          senderName = "You";
        } else if (message.senderId === remoteUser?._id) {
          senderName = remoteUser?.name ?? "Contact";
        }
        
        // Add status indicator for sent messages
        const statusIndicator = isOwnMessage && message.status && (
          <Tooltip 
            title={message.status === 'sending' ? 'Sending...' : message.status === 'error' ? 'Failed to send' : 'Delivered'} 
            placement="left"
            arrow
          >
            <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center' }}>
              {message.status === 'sending' && <CircularProgress size={12} />}
              {message.status === 'error' && '❌'}
              {message.status === 'delivered' && '✓'}
            </span>
          </Tooltip>
        );

        // Determine message status for sent messages
        const messageStatus = isOwnMessage ? 
          (message.status || 'delivered') : 
          undefined;

        return (
          <React.Fragment key={message._id || `msg-${index}`}>
            {isOwnMessage ? (
              <div style={{ position: 'relative' }}>
                <SentMessageContent 
                  message={message} 
                  senderName={senderName}
                  status={messageStatus}
                />
                {statusIndicator}
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
    </React.Fragment>
  );
};
export { ActiveConversationChat };
