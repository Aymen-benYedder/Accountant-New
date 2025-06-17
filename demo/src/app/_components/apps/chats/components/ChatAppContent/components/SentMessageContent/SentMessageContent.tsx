import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { MessagesProps } from "@app/_components/apps/_types/ChatTypes";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'error' | string;

interface SentMessageContentProps {
  message: {
    content: string;
    timestamp?: string | Date;
    status?: MessageStatus;
    [key: string]: any; // Allow additional properties
  };
  senderName: string;
  status?: MessageStatus;
}

const SentMessageContent: React.FC<SentMessageContentProps> = ({
  message,
  senderName,
  status: propStatus
}) => {
  const status = propStatus || message.status || 'sent';
  
  // Format the timestamp
  const formatTimestamp = (timestamp?: string | Date): string => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Get status icon
  const getStatusIcon = () => {
    switch (status) {
      case 'sending':
        return <AccessTimeIcon color="disabled" sx={{ fontSize: '1rem', ml: 0.5 }} />;
      case 'error':
        return <ErrorIcon color="error" sx={{ fontSize: '1rem', ml: 0.5 }} />;
      case 'read':
        return <CheckCircleIcon color="primary" sx={{ fontSize: '1rem', ml: 0.5 }} />;
      case 'delivered':
      case 'sent':
        return <CheckCircleIcon color="action" sx={{ fontSize: '1rem', ml: 0.5 }} />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        mb: 2,
        width: '100%',
        px: 1
      }}
    >
      <Box
        sx={{
          display: 'inline-flex',
          flexDirection: 'column',
          maxWidth: '85%',
          alignItems: 'flex-end'
        }}
      >
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            fontSize: '0.75rem',
            mb: 0.5,
            textAlign: 'right',
            pr: 1
          }}
        >
          {senderName}
        </Typography>
        <Paper
          elevation={0}
          sx={{
            px: 2,
            py: 1.5,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            borderRadius: 2,
            borderTopRightRadius: 0,
            maxWidth: '100%',
            position: 'relative',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              width: 0,
              height: 0,
              border: '8px solid transparent',
              borderTopColor: 'primary.main',
              borderRight: 0,
              marginTop: 0,
              marginRight: '-8px',
              transform: 'rotate(90deg)'
            }
          }}
        >
          <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
            {message.content}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              mt: 1,
              gap: 0.5
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.7rem',
                lineHeight: 1
              }}
            >
              {formatTimestamp(message.timestamp || message.sent_at)}
            </Typography>
            {getStatusIcon()}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export { SentMessageContent };
