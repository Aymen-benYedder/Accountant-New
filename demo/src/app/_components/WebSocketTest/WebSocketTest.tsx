import React, { useState, useEffect } from 'react';
import { useWebSocket } from '@contexts/WebSocketContext';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText,
  Divider,
  Chip
} from '@mui/material';

const WebSocketTest: React.FC = () => {
  const { socket, isConnected, sendMessage, lastMessage } = useWebSocket();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{
    id: number;
    text: string;
    type: 'sent' | 'received';
    timestamp: Date;
  }>>([]);
  const [messageId, setMessageId] = useState(0);

  // Handle sending a test message
  const handleSendMessage = () => {
    if (message.trim() && socket) {
      const messageData = {
        type: 'test',
        message: message,
        timestamp: new Date().toISOString(),
        from: 'react-client'
      };
      
      // Send the message
      sendMessage(messageData);
      
      // Add to local messages
      setMessages(prev => [...prev, {
        id: messageId,
        text: message,
        type: 'sent',
        timestamp: new Date()
      }]);
      
      setMessageId(prev => prev + 1);
      setMessage('');
    }
  };

  // Handle received messages
  useEffect(() => {
    if (lastMessage) {
      console.log('Received message in WebSocketTest:', lastMessage);
      setMessages(prev => [...prev, {
        id: messageId,
        text: lastMessage.message || JSON.stringify(lastMessage),
        type: 'received',
        timestamp: new Date()
      }]);
      setMessageId(prev => prev + 1);
    }
  }, [lastMessage]);

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        WebSocket Test
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Chip 
          label={isConnected ? 'Connected' : 'Disconnected'} 
          color={isConnected ? 'success' : 'error'} 
          variant="outlined"
        />
        <Typography variant="body2" color="text.secondary">
          {socket?.id ? `Socket ID: ${socket.id}` : 'Not connected'}
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a test message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          disabled={!isConnected}
        />
        <Button 
          variant="contained" 
          onClick={handleSendMessage}
          disabled={!isConnected || !message.trim()}
        >
          Send
        </Button>
      </Box>
      
      <Paper variant="outlined" sx={{ maxHeight: 400, overflow: 'auto' }}>
        <List>
          {messages.length === 0 ? (
            <ListItem>
              <ListItemText 
                primary="No messages yet" 
                secondary="Send a message to test the WebSocket connection"
                sx={{ textAlign: 'center', py: 2 }}
              />
            </ListItem>
          ) : (
            messages.map((msg, index) => (
              <React.Fragment key={msg.id}>
                <ListItem 
                  alignItems="flex-start"
                  sx={{
                    flexDirection: msg.type === 'sent' ? 'row-reverse' : 'row',
                    textAlign: msg.type === 'sent' ? 'right' : 'left'
                  }}
                >
                  <Paper 
                    elevation={0} 
                    sx={{
                      p: 2,
                      bgcolor: msg.type === 'sent' ? 'primary.light' : 'grey.100',
                      color: msg.type === 'sent' ? 'primary.contrastText' : 'text.primary',
                      borderRadius: 2,
                      maxWidth: '70%',
                      wordBreak: 'break-word'
                    }}
                  >
                    <Typography variant="body1">{msg.text}</Typography>
                    <Typography variant="caption" display="block" sx={{ mt: 0.5, opacity: 0.7 }}>
                      {msg.timestamp.toLocaleTimeString()}
                    </Typography>
                  </Paper>
                </ListItem>
                {index < messages.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))
          )}
        </List>
      </Paper>
      
      <Box sx={{ mt: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Connection status: {isConnected ? 'Connected to WebSocket server' : 'Disconnected'}
        </Typography>
      </Box>
    </Paper>
  );
};

export default WebSocketTest;
