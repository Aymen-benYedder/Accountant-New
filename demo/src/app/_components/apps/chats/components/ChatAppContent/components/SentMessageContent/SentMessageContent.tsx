import React, { useEffect } from "react";
import { Box, Typography, Paper, Tooltip } from "@mui/material";
import { format } from 'date-fns';
import { MessageStatus } from "@app/_components/apps/_types/ChatTypes";

// Debug helper to log props changes
const useDebugLog = (name: string, props: any) => {
  useEffect(() => {
    console.log(`[${new Date().toISOString()}] ${name} mounted/updated:`, props);
    return () => {
      console.log(`[${new Date().toISOString()}] ${name} unmounted`);
    };
  }, [props, name]);
};

interface SentMessageContentProps {
  message: {
    content: string;
    timestamp?: string | Date;
    status?: MessageStatus;
    _id?: string | number;
    readAt?: string | Date;
    [key: string]: any; // Allow additional properties
  };
  senderName?: string;
  status?: MessageStatus;
  showAvatar?: boolean;
}

const SentMessageContent: React.FC<SentMessageContentProps> = ({
  message,
  senderName = 'You',
  status: propStatus,
  showAvatar = false
}) => {
  // Debug logging
  useDebugLog('SentMessageContent', { 
    messageId: message._id || 'unknown',
    status: propStatus || message.status,
    content: message.content?.substring(0, 30) + (message.content?.length > 30 ? '...' : ''),
    showAvatar
  });
  
  // Ensure status is always a valid MessageStatus
  const status: MessageStatus = (propStatus || message.status || 'sent') as MessageStatus;
  const readAt = message.readAt ? new Date(message.readAt) : null;
  
  // Format the timestamp
  const formatTimestamp = (timestamp?: string | Date, includeDate = false): string => {
    if (!timestamp) return '';
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    
    if (isNaN(date.getTime())) return 'Invalid date';
    
    try {
      if (includeDate) {
        return format(date, 'MMM d, yyyy h:mm a');
      }
      return format(date, 'h:mm a');
    } catch (error) {
      console.error('Error formatting timestamp:', { timestamp, error });
      return 'Invalid date';
    }
  };

  // Get status text with appropriate styling
  const getStatusText = () => {
    // Debug log status changes
    console.log(`[${new Date().toISOString()}] Status update for message ${message._id || 'unknown'}:`, {
      previousStatus: message.status,
      newStatus: status,
      readAt: message.readAt ? new Date(message.readAt).toISOString() : 'Not read'
    });
    
    // Map status to display text and icons
    // Define status configuration with proper typing
    const statusConfig: Record<MessageStatus, { text: string; icon: string; readAt?: Date | null }> = {
      'sending': { text: 'Sending...', icon: '🕒' },
      'sent': { text: 'Sent', icon: '✓' },
      'delivered': { text: 'Delivered', icon: '✓✓' },
      'read': { text: 'Read', icon: '✓✓', readAt },
      'error': { text: 'Error', icon: '⚠️' },
      'received': { text: 'Received', icon: '✓' } // Add received status for completeness
    };
    
    // Get the status config, defaulting to error if status is invalid
    const config = statusConfig[status] || statusConfig['error'];
    
    const statusText = config.text;
    const statusIcon = config.icon;
    
    // Styling based on status with proper type safety
    const statusStyles = (() => {
      const styles = {
        'sending': { color: 'rgba(255, 255, 255, 0.7)', bgColor: 'rgba(0, 0, 0, 0.1)' },
        'received': { color: 'rgba(0, 0, 0, 0.6)', bgColor: 'rgba(0, 0, 0, 0.05)' },
        'error': { color: '#ff6b6b', bgColor: 'rgba(255, 76, 81, 0.1)' },
        'read': { color: '#4caf50', bgColor: 'rgba(76, 175, 80, 0.1)' },
        'delivered': { color: 'rgba(255, 255, 255, 0.7)', bgColor: 'rgba(0, 0, 0, 0.1)' },
        'sent': { color: 'rgba(255, 255, 255, 0.7)', bgColor: 'rgba(0, 0, 0, 0.1)' },
      } as const;
      
      return styles[status as keyof typeof styles] || styles.sent;
    })();
    
    // Create the status content with tooltip
    const statusContent = (
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          bgcolor: statusStyles.bgColor,
          borderRadius: 1,
          px: 0.75,
          py: 0.25,
          ml: 0.5,
          cursor: 'help'
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: statusStyles.color,
            fontSize: '0.65rem',
            lineHeight: 1.2,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5
          }}
        >
          <span>{statusIcon}</span>
          <span>{statusText}</span>
        </Typography>
      </Box>
    );

    // Add tooltip for read messages to show when it was read
    if (status === 'read' && readAt) {
      return (
        <Tooltip 
          title={`Read at ${format(readAt, 'MMM d, yyyy h:mm a')}`}
          arrow
          placement="left"
        >
          {statusContent}
        </Tooltip>
      );
    }

    // Add tooltip for other statuses
    const tooltipTitle = status === 'sent' && message.timestamp
      ? `Sent at ${formatTimestamp(message.timestamp, true)}`
      : statusText;

    return (
      <Tooltip title={tooltipTitle} arrow placement="left">
        {statusContent}
      </Tooltip>
    );
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
            {getStatusText()}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export { SentMessageContent };
