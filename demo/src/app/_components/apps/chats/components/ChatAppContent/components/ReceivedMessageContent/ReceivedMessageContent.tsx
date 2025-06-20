import React from "react";
import { Box, Typography } from "@mui/material";
import { MessagesProps } from "@app/_components/apps/_types/ChatTypes";

interface ReceivedMessageContentProps {
  message: MessagesProps & {
    content: string;
    timestamp?: string | Date;
    sent_at?: string | Date;
    status?: string;
  };
  senderName: string;
}

const ReceivedMessageContent: React.FC<ReceivedMessageContentProps> = ({
  message,
  senderName
}) => {
  // Format the timestamp
  const formatTimestamp = (timestamp?: string | Date) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        mb: 2,
        width: '100%',
        maxWidth: '80%',
        alignSelf: 'flex-start'
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 0.5, fontWeight: 500 }}
      >
        {senderName}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          maxWidth: '100%'
        }}
      >
        <Box
          sx={{
            bgcolor: 'background.paper',
            color: 'text.primary',
            p: 2,
            borderRadius: 2,
            borderTopLeftRadius: 0,
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            position: 'relative',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: -8,
              width: 16,
              height: 16,
              clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
              bgcolor: 'background.paper',
              transform: 'rotate(-90deg)'
            }
          }}
        >
          <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
            {message.content}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5, alignSelf: 'flex-start' }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              fontSize: '0.7rem',
              opacity: 0.8
            }}
          >
            {formatTimestamp(message.timestamp || message.sent_at || undefined)}
          </Typography>
          {message.status === 'received' && (
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                bgcolor: 'rgba(0, 0, 0, 0.05)',
                borderRadius: 1,
                px: 0.75,
                py: 0.25,
                ml: 0.5
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(0, 0, 0, 0.7)',
                  fontSize: '0.65rem',
                  lineHeight: 1.2,
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                Received
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export { ReceivedMessageContent };
