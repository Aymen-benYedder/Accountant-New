import React from "react";
import { TextField, IconButton } from "@mui/material";
import { Div } from "@jumbo/shared";
import SendIcon from "@mui/icons-material/Send";
import api from "@app/_utilities/api";

interface FooterProps {
  remoteUserId: string;
  taskId: string;
  onMessageSent?: () => void;
  onSendMessage?: (content: string) => Promise<void> | void;
}

const ActiveConversationFooter: React.FC<FooterProps> = ({ 
  remoteUserId, 
  taskId, 
  onMessageSent, 
  onSendMessage 
}) => {
  const [message, setMessage] = React.useState("");
  const [sending, setSending] = React.useState(false);

  const handleSend = async () => {
    if (!message.trim() || !remoteUserId) return;
    
    const content = message.trim();
    setSending(true);
    setMessage("");
    
    try {
      if (onSendMessage) {
        // Use WebSocket if available
        await Promise.resolve(onSendMessage(content));
      } else {
        // Fall back to HTTP
        await api.post("/messages", {
          taskId: taskId || undefined,
          recipientId: remoteUserId,
          content,
        });
      }
      
      if (onMessageSent) {
        onMessageSent();
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Optionally show error to user here
      setMessage(content); // Restore message on error
    } finally {
      setSending(false);
    }
  };

  return (
    <Div
      sx={{
        display: "flex",
        alignItems: "center",
        p: (theme) => theme.spacing(2, 3),
        borderTop: 1,
        borderTopColor: "divider",
        bgcolor: (theme) => theme.palette.action.hover,
      }}
    >
      <TextField
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        size={"small"}
        placeholder={"Type message...."}
        fullWidth
        sx={{
          backgroundColor: (theme) => theme.palette.background.paper,
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        disabled={sending}
      />
      <IconButton color="primary" disabled={sending || !message.trim()} onClick={handleSend}>
        <SendIcon />
      </IconButton>
    </Div>
  );
};

export { ActiveConversationFooter };
