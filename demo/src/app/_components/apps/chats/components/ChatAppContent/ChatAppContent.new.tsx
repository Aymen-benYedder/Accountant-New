import React, { useEffect, useCallback } from "react";
import { JumboScrollbar } from "@jumbo/components";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useParams } from "react-router-dom";
import api from "@app/_utilities/api";
import { useWebSocket, WebSocketMessage } from "../../../../../../contexts/WebSocketContext";
import { ActiveConversationChat } from "./components/ActiveConversationChat";
import {
  ActiveConversationFooter,
  ActiveConversationHeader,
  ContentPlaceholder,
} from "./components";

function getCurrentUserJwt(): { userId: string | null; role: string | null } {
  const token = localStorage.getItem('token');
  if (!token) {
    console.warn("No JWT token found in localStorage");
    return { userId: null, role: null };
  }
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return {
      userId: decoded?.id || decoded?._id || null,
      role: decoded?.role || null
    };
  } catch (err) {
    console.error("Failed to decode JWT token", err);
    return { userId: null, role: null };
  }
}

const ChatAppContent = () => {
  const params = useParams();
  const { id: conversationId, chatBy } = params as { id?: string; chatBy?: string };
  const { userId: currentUserId } = getCurrentUserJwt();
  const [messages, setMessages] = React.useState<any[]>([]);
  const [remoteUser, setRemoteUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [unreadCount, setUnreadCount] = React.useState(0);
  const scrollRef = React.useRef<Scrollbars>(null);
  
  // Use the WebSocket context
  const { 
    isConnected, 
    lastMessage, 
    sendMessage: sendWebSocketMessage,
    isUserOnline 
  } = useWebSocket();

  // Handle new messages from WebSocket context
  useEffect(() => {
    if (!lastMessage || !conversationId) return;

    const newMessage = lastMessage;
    
    console.log('[ChatAppContent] New message from WebSocket:', { 
      id: newMessage._id, 
      from: newMessage.senderId,
      to: newMessage.recipientId,
      conversationId: newMessage.conversationId,
      status: newMessage.status,
      content: newMessage.content?.substring(0, 50) + (newMessage.content?.length > 50 ? '...' : '')
    });

    // Check if message belongs to current conversation
    const isCurrentConversation = 
      newMessage.conversationId === conversationId ||
      (newMessage.senderId === currentUserId && newMessage.recipientId === conversationId) ||
      (newMessage.senderId === conversationId && newMessage.recipientId === currentUserId);

    if (!isCurrentConversation) {
      console.log('[ChatAppContent] Message not for current conversation, ignoring');
      return;
    }

    // Process the new message
    const processedMessage = {
      ...newMessage,
      _id: newMessage._id || `temp-${Date.now()}`,
      sent_by: newMessage.senderId,
      senderId: newMessage.senderId,
      recipientId: newMessage.recipientId?.toString(),
      content: newMessage.content,
      timestamp: newMessage.timestamp || new Date().toISOString(),
      status: newMessage.status || 'delivered',
      read: newMessage.read || (newMessage.senderId === currentUserId)
    };

    // Update messages state with deduplication
    setMessages(prevMessages => {
      const exists = prevMessages.some(msg => msg._id === processedMessage._id);
      return exists ? prevMessages : [...prevMessages, processedMessage];
    });

    // Auto-scroll to bottom when new message arrives
    scrollToBottom();
    
    // Mark as read if message is from other user
    if (processedMessage.senderId !== currentUserId) {
      markMessagesAsRead();
    }
  }, [lastMessage, conversationId, currentUserId]);

  // Fetch conversation messages
  useEffect(() => {
    if (!conversationId) return;

    const fetchMessages = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/messages/conversation/${conversationId}`);
        setMessages(response.data);
        
        // Mark messages as read when opening conversation
        markMessagesAsRead();
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [conversationId]);

  // Fetch remote user details
  useEffect(() => {
    if (!conversationId) return;

    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${conversationId}`);
        setRemoteUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [conversationId]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollToBottom();
    }
  };

  const markMessagesAsRead = useCallback(async () => {
    if (!conversationId || !currentUserId) return;

    try {
      await api.post(`/messages/mark-as-read`, {
        conversationId,
        readerId: currentUserId
      });
      
      // Update local state to mark messages as read
      setMessages(prevMessages => 
        prevMessages.map(msg => ({
          ...msg,
          read: true,
          status: msg.status === 'delivered' ? 'read' : msg.status
        }))
      );
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  }, [conversationId, currentUserId]);

  const handleSendMessage = useCallback(async (message: string) => {
    if (!conversationId || !currentUserId) return;

    const messageData = {
      senderId: currentUserId,
      recipientId: conversationId,
      content: message,
      conversationId
    };

    try {
      // Optimistically add the message to the UI
      const tempId = `temp-${Date.now()}`;
      const tempMessage = {
        ...messageData,
        _id: tempId,
        timestamp: new Date().toISOString(),
        status: 'sending' as const,
        read: false
      };

      setMessages(prev => [...prev, tempMessage]);
      scrollToBottom();

      // Send the message via WebSocket with acknowledgment
      sendWebSocketMessage(messageData, (response) => {
        if (response?.success) {
          // Replace the temporary message with the server-confirmed one
          setMessages(prev => 
            prev.map(msg => 
              msg._id === tempId ? { ...response.message, status: 'sent' as const } : msg
            )
          );
        } else {
          // Update status to failed if sending failed
          setMessages(prev => 
            prev.map(msg => 
              msg._id === tempId 
                ? { 
                    ...msg, 
                    status: 'failed' as const,
                    error: response?.error || 'Failed to send message'
                  } 
                : msg
            )
          );
        }
      });
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Update status to failed if an error occurs
      setMessages(prev => 
        prev.map(msg => 
          msg._id === tempId 
            ? { 
                ...msg, 
                status: 'failed' as const,
                error: 'Failed to send message'
              } 
            : msg
        )
      );
    }
  }, [conversationId, currentUserId, sendWebSocketMessage]);

  if (!conversationId) {
    return <ContentPlaceholder />;
  }

  if (loading) {
    return <div>Loading conversation...</div>;
  }

  return (
    <div className="chat-content">
      {remoteUser && (
        <ActiveConversationHeader 
          user={remoteUser} 
          isOnline={isUserOnline(remoteUser._id)} 
        />
      )}
      
      <JumboScrollbar 
        ref={scrollRef}
        autoHide
        autoHideDuration={200}
        autoHideTimeout={500}
      >
        <ActiveConversationChat 
          messages={messages} 
          currentUserId={currentUserId || ''} 
        />
      </JumboScrollbar>
      
      <ActiveConversationFooter 
        onSendMessage={handleSendMessage} 
        disabled={!isConnected}
      />
    </div>
  );
};

export { ChatAppContent };
