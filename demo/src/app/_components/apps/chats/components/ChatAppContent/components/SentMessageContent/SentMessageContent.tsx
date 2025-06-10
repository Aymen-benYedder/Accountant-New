// Add prop senderName to allow sender title in bubbles
import { MessagesProps } from "@app/_components/apps/_types";
import { Div } from "@jumbo/shared";
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import moment from "moment";

interface Props {
  message: MessagesProps;
  senderName: string;
  status?: 'sending' | 'sent' | 'delivered' | 'read' | 'error';
}

const SentMessageContent: React.FC<Props> = ({ message, senderName, status = 'delivered' }) => {
  // Use timestamp, sent_at, or current time as fallback
  const timestamp = message.timestamp || message.sent_at || new Date().toISOString();
  const sentDate = moment(timestamp);
  const messageContent = message.content || message.message || '';
  
  return (
    <Div
      sx={{
        display: "flex",
        textAlign: "right",
        alignItems: "flex-start",
        flexDirection: "row-reverse",
        mb: 2,
        px: 3,
      }}
    >
      <div className="Message-root">
        <div className="Message-item">
          <Typography
            variant={"body1"}
            color={"#035388"}
            fontWeight={500}
            mb={0.5}
            sx={{ textAlign: "right" }}
          >
            {senderName || 'You'}
          </Typography>
          <Typography
            variant={"body1"}
            color={"text.secondary"}
            fontSize={"smaller"}
            mb={0.5}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
          >
            {sentDate.isValid() ? sentDate.format("h:mm A") : 'Just now'}
            {status === 'sending' && (
              <span style={{ marginLeft: '4px', fontSize: '0.75rem' }}>Sending...</span>
            )}
            {status === 'sent' && (
              <span style={{ marginLeft: '4px', fontSize: '0.75rem' }}>✓</span>
            )}
            {status === 'delivered' && (
              <span style={{ marginLeft: '4px', fontSize: '0.75rem' }}>✓✓</span>
            )}
            {status === 'read' && (
              <span style={{ marginLeft: '4px', fontSize: '0.75rem', color: '#4CAF50' }}>✓✓</span>
            )}
          </Typography>
          <Paper
            elevation={0}
            sx={{
              p: (theme) => theme.spacing(1.5, 2),
              bgcolor: (theme) => theme.palette.primary.main,
              color: 'white',
              borderRadius: '18px 18px 0 18px',
              maxWidth: '80%',
              marginLeft: 'auto',
              wordBreak: 'break-word'
            }}
          >
            <Typography variant="body1" sx={{ color: 'white' }}>{messageContent}</Typography>
          </Paper>
        </div>
      </div>
    </Div>
  );
};

export { SentMessageContent };
