import React from 'react';
import { Check, CheckCircle, ErrorOutline } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { MessageStatus } from '../../_types/ChatTypes';

interface MessageStatusIndicatorProps {
  status: MessageStatus;
  timestamp?: string | Date;
  className?: string;
}

const statusLabels: Partial<Record<MessageStatus, string>> = {
  sent: 'Sent',
  delivered: 'Delivered',
  read: 'Read',
  error: 'Failed to send',
  sending: 'Sending...',
  received: 'Received'
};

export const MessageStatusIndicator: React.FC<MessageStatusIndicatorProps> = ({
  status,
  timestamp,
  className = ''
}) => {
  const getStatusIcon = () => {
    const iconProps = { fontSize: 'small' as const };
    
    switch (status) {
      case 'delivered':
        return <Check {...iconProps} className="text-gray-400" />;
      case 'read':
        return <CheckCircle {...iconProps} className="text-blue-500" />;
      case 'error':
        return <ErrorOutline {...iconProps} className="text-red-500" />;
      case 'sending':
        return <span className="text-gray-300 animate-pulse">...</span>;
      case 'sent':
      default:
        return <Check {...iconProps} className="text-gray-300" />;
    }
  };

  const title = (statusLabels[status] || 'Sent') + 
    (timestamp ? ` at ${new Date(timestamp).toLocaleTimeString()}` : '');

  return (
    <Tooltip title={title} placement="left">
      <span className={`inline-flex items-center ${className}`} style={{ minWidth: '20px' }}>
        {getStatusIcon()}
      </span>
    </Tooltip>
  );
};

export default MessageStatusIndicator;
