import React from "react";
import { JumboScrollbar } from "@jumbo/components";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useParams } from "react-router-dom";
import api from "@app/_utilities/api";
import { useWebSocket } from "../../../../../../contexts/WebSocketContext";
import { ActiveConversationChat } from "./components/ActiveConversationChat";
import {
  ActiveConversationFooter,
  ActiveConversationHeader,
  ContentPlaceholder,
} from "./components";

function getCurrentUserJwt(): { userId: string | null, role: string | null } {
  const token = localStorage.getItem('token');
  if (!token) {
    console.warn("No JWT token found in localStorage");
    return { userId: null, role: null };
  }
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    console.log("Decoded JWT payload:", decoded); // DEBUG!!
    return {
      userId: decoded && decoded.id ? decoded.id : (decoded._id ? decoded._id : null),
      role: decoded && decoded.role ? decoded.role : null
    };
  } catch (err) {
    console.error("Failed to decode JWT token", token, err);
    return { userId: null, role: null };
  }
}

console.log("[ChatAppContent top-level] getCurrentUserJwt():", getCurrentUserJwt());
console.log('API_BASE_URL =', import.meta.env.VITE_API_BASE_URL);

const ChatAppContent = () => {
  const params = useParams();
  const { id, chatBy } = params as { id?: string; chatBy?: string };
  const { userId: currentUserId } = getCurrentUserJwt();
  console.log("[ChatAppContent] userId (from JWT):", currentUserId);
  const [messages, setMessages] = React.useState<any[]>([]);
  const [remoteUser, setRemoteUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [unreadCount, setUnreadCount] = React.useState(0);
  
  // Use proper type for JumboScrollbar ref
  const scrollRef = React.useRef<Scrollbars>(null);

  const { socket, isConnected, sendMessage: wsSendMessage } = useWebSocket();
  const [isInitialLoad, setIsInitialLoad] = React.useState(true);

  const reloadMessages = React.useCallback(() => {
    if (!id) return;
    
    console.log(`[ChatAppContent] Loading messages for conversation with user: ${id}`);
    api.get(`/messages?withUser=${id}`).then(res => {
      console.log(`[ChatAppContent] Loaded ${res.data?.length || 0} messages`);
      setMessages(res.data || []);
      setIsInitialLoad(false);
    }).catch(error => {
      console.error('[ChatAppContent] Error loading messages:', error);
    });
  }, [id]);

  // Set up WebSocket listener for new messages
  // Mark messages as read when they become visible
  const markMessagesAsRead = React.useCallback(async () => {
    if (!messages) return;
    
    const unreadMessages = messages.filter(
      (msg: any) => !msg.read && msg.recipientId === currentUserId
    );

    if (unreadMessages.length > 0) {
      try {
        const messageIds = unreadMessages.map((msg: any) => msg._id);
        
        await fetch(`${import.meta.env.VITE_API_URL}/api/messages/mark-as-read`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCurrentUserJwt()}`
          },
          body: JSON.stringify({ messageIds })
        });

        // Update local state
        setMessages((prevMessages: any[]) => 
          prevMessages.map(msg => 
            messageIds.includes(msg._id) ? { ...msg, read: true } : msg
          )
        );
        
        // Update unread count
        setUnreadCount(0);
      } catch (error) {
        console.error('Error marking messages as read:', error);
      }
    }
  }, [messages, currentUserId]);

  // Handle scroll events to mark messages as read
  const handleScroll = React.useCallback(() => {
    if (!scrollRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current.getValues();
    const isAtBottom = scrollHeight - (scrollTop + clientHeight) < 50;
    
    if (isAtBottom) {
      markMessagesAsRead();
    }
  }, [markMessagesAsRead]);

  // Set up scroll listener
  React.useEffect(() => {
    const scrollElement = scrollRef.current?.container?.firstChild as HTMLElement;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  // Auto-scroll to bottom when new messages arrive or when component mounts
  const scrollToBottom = React.useCallback((behavior: ScrollBehavior = 'auto') => {
    // Small delay to ensure DOM is updated
    setTimeout(() => {
      if (!scrollRef.current) return;
      
      try {
        // Use JumboScrollbar's scrollToBottom method
        if (behavior === 'smooth') {
          // For smooth scrolling, we'll use the native scrollTo with behavior 'smooth'
          const container = scrollRef.current.container || scrollRef.current;
          if (container) {
            container.scrollTo({
              top: container.scrollHeight,
              behavior: 'smooth'
            });
          }
        } else {
          // For instant scrolling, use JumboScrollbar's scrollToBottom
          scrollRef.current.scrollToBottom();
        }
      } catch (error) {
        console.error('Error scrolling to bottom:', error);
      }
    }, 50);
  }, []);

  // Scroll to bottom on initial load and when conversation changes
  React.useEffect(() => {
    scrollToBottom();
  }, [id, chatBy, scrollToBottom]);
  
  // Scroll to bottom when messages change
  React.useEffect(() => {
    scrollToBottom('smooth');
  }, [messages, scrollToBottom]);

  // Handle new messages from WebSocket
  React.useEffect(() => {
    if (!socket || !id) return;

    const handleNewMessage = (newMessage: any) => {
      // Ensure we have all required fields and properly format the timestamp
      const message = {
        ...newMessage,
        _id: newMessage._id || `temp-${Date.now()}`,
        sent_by: newMessage.sent_by || newMessage.senderId, // Support both formats
        recipientId: newMessage.recipientId?.toString(),
        content: newMessage.content,
        timestamp: newMessage.timestamp ? 
          (typeof newMessage.timestamp === 'string' ? newMessage.timestamp : new Date(newMessage.timestamp).toISOString()) : 
          new Date().toISOString(),
        status: 'delivered',
        read: (newMessage.sent_by === currentUserId || newMessage.senderId === currentUserId) || (newMessage.read || false)
      };

      console.log(`[ChatAppContent] Received newMessage event:`, {
        messageId: message._id,
        from: message.senderId,
        to: message.recipientId,
        taskId: message.taskId,
        timestamp: message.timestamp,
        content: message.content ? `${message.content.substring(0, 30)}...` : 'No content',
        currentConversation: id,
        isCurrentTask: chatBy ? message.taskId === chatBy : 'no task filter'
      });

      // Check if this message is part of the current conversation
      const senderId = message.sent_by || message.senderId;
      const isDirectMessage = chatBy === 'contact' && 
        ((senderId === id && message.recipientId === currentUserId) ||
         (senderId === currentUserId && message.recipientId === id));
      
      const isTaskMessage = chatBy && chatBy !== 'contact' && 
        message.taskId === chatBy &&
        (senderId === id || message.recipientId === id);
      
      const isCurrentConversation = isDirectMessage || isTaskMessage;
      
      console.log(`[ChatAppContent] Message is ${isCurrentConversation ? '' : 'NOT '}part of current conversation`, {
        messageId: message._id,
        from: message.senderId,
        to: message.recipientId,
        currentUserId,
        conversationId: id,
        chatBy,
        isDirectMessage,
        isTaskMessage
      });
      
      if (isCurrentConversation) {
        setMessages(prevMessages => {
          // Check if message already exists to avoid duplicates
          const exists = prevMessages.some((msg: any) => {
            const msgSenderId = msg.sent_by || msg.senderId;
            const newMsgSenderId = message.sent_by || message.senderId;
            return msg._id === message._id || 
              (msg.status === 'sending' && msg.content === message.content && msgSenderId === newMsgSenderId);
          });
          
          if (exists) {
            console.log(`[ChatAppContent] Message exists, updating in place`);
            return prevMessages.map((msg: any) => 
              (msg._id === message._id || 
               (msg.status === 'sending' && msg.content === message.content && (msg.sent_by || msg.senderId) === (message.sent_by || message.senderId)))
                ? { ...message, status: 'delivered' }
                : msg
            );
          }
          
          console.log(`[ChatAppContent] Adding new message to UI`);
          return [...prevMessages, message];
        });

        // Always scroll to bottom for both sender and receiver when a new message arrives
        scrollToBottom();

        // If this is a message from the other user, mark it as read
        if ((message.sent_by || message.senderId) !== currentUserId) {
          markMessagesAsRead();
        }
      }
    };

    // Scroll helper function removed - was unused

    socket.on('newMessage', handleNewMessage);
    
    // Clean up the event listener when component unmounts or conversation changes
    return () => {
      console.log(`[ChatAppContent] Cleaning up WebSocket listener for user: ${id}`);
      socket.off('newMessage', handleNewMessage);
    };
  }, [socket, id, chatBy, currentUserId, markMessagesAsRead, scrollToBottom]);

  // Handle sending a new message
  const handleSend = React.useCallback(async (content: string) => {
    if (!id) {
      console.error('[ChatAppContent] Cannot send message: No recipient ID');
      return;
    }
    
    const trimmedContent = content.trim();
    if (!trimmedContent) {
      console.log('[ChatAppContent] Empty message, not sending');
      return;
    }
    
    const messageData = {
      taskId: chatBy || undefined,
      recipientId: id,
      content: trimmedContent,
      timestamp: new Date().toISOString()
    };
    
    console.log('[ChatAppContent] Sending message:', {
      ...messageData,
      content: `${trimmedContent.substring(0, 30)}${trimmedContent.length > 30 ? '...' : ''}`
    });
    
    try {
      // Send message via WebSocket if connected, otherwise fall back to HTTP
      if (isConnected && socket) {
        console.log('[ChatAppContent] Sending via WebSocket');
        // Optimistically update the UI
        const optimisticMessage = {
          ...messageData,
          _id: `optimistic-${Date.now()}`,
          senderId: currentUserId,
          status: 'sending'
        };
        
        setMessages(prev => [...prev, optimisticMessage]);
        
        // Send via WebSocket
        wsSendMessage(messageData);
      } else {
        console.log('[ChatAppContent] WebSocket not connected, falling back to HTTP');
        const response = await api.post('/messages', messageData);
        console.log('[ChatAppContent] Message sent via HTTP, updating UI');
        // Update the messages with the server response
        setMessages(prev => [...prev, response.data]);
      }
    } catch (error) {
      console.error('[ChatAppContent] Error sending message:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        isConnected,
        hasSocket: !!socket
      });
      // Update the message status to show error
      setMessages(prev => prev.map(msg => 
        msg.status === 'sending' ? { ...msg, status: 'error' } : msg
      ));
    }
  }, [id, chatBy, isConnected, wsSendMessage, socket, currentUserId]);
  
  // Initial load of messages
  React.useEffect(() => {
    if (isInitialLoad) {
      reloadMessages();
    }
  }, [isInitialLoad, reloadMessages]);

  React.useEffect(() => {
    // Scroll to bottom whenever messages update
    if (scrollRef.current?.scrollToBottom) {
      scrollRef.current.scrollToBottom();
    }
  }, [messages]);

  React.useEffect(() => {
    let ignore = false;
    console.log("ChatAppContent useEffect called with params", { id, chatBy, currentUserId });
    if (!id || !currentUserId) {
      console.warn("Missing id or currentUserId in ChatAppContent", { id, chatBy, currentUserId });
      return;
    }
    setLoading(true);

    api.get(`/users/${id}`).then(res => {
      if (!ignore) {
        const userObj = res.data || {};
        console.log("[remoteUser fetch] response data:", userObj);
        // Always set .name if missing, fallback to fullName/email/id
        if (!userObj.name) {
          console.log("[remoteUser fallback] no name, using:", userObj.fullName, userObj.email, userObj._id);
          userObj.name = userObj.fullName || userObj.email || userObj._id || "Contact";
        }
        console.log("[remoteUser final object]", userObj);
        setRemoteUser(userObj);
      }
      console.log("Fetched remote user", res.data);
    });

    api.get(`/messages?withUser=${id}`).then(res => {
      if (!ignore) setMessages(res.data || []);
      console.log("Fetched messages", res.data);
    }).finally(() => {
      if (!ignore) setLoading(false);
    });

    return () => { ignore = true; };
  }, [id, currentUserId, chatBy]);

  // If not in an active conversation, render the chat inbox with sidebar
  if (!id && currentUserId) {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Placeholder for Chat Sidebar */}
        <div style={{ borderBottom: "1px solid #eee", padding: 16 }}>
          <h3 style={{ margin: "8px 0" }}>Chats</h3>
          {/* TODO: Render a list of conversations here, e.g., <ChatSidebar userId={currentUserId} /> */}
          <div style={{ color: "#aaa" }}>All chats will be listed here (sidebar)</div>
        </div>
        {/* Center content */}
        <div style={{ 
          flex: 1, 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          color: "#888",
          minHeight: 400
        }}>
          <span>Select a conversation</span>
        </div>
      </div>
    );
  }

  if (!id || !currentUserId) {
    return (
      <>
        <ContentPlaceholder />
        <div style={{ color: "red", margin: 20 }}>
          Could not determine chat contact (id: {String(id)}, chatBy: {String(chatBy)}, currentUser: {String(currentUserId)})
        </div>
        <div style={{ color: "maroon", margin: 10, fontWeight: 600 }}>
          [Auth Debug] Token (localStorage): <br />
          {JSON.stringify(localStorage.getItem('token'))}
        </div>
      </>
    );
  }
  if (loading) return <ContentPlaceholder />;

  const activeConversation = {
    contact: remoteUser,
    messages,
    last_message: messages.length > 0 ? messages[messages.length-1] : undefined,
    // fallback for name if not present
    name: remoteUser?.name || remoteUser?.fullName || remoteUser?.email || "Contact"
  };

  console.log("[ActiveConversationHeader prop] activeConversation:", activeConversation);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      maxHeight: '100vh',
      width: '100%',
      overflow: 'hidden'
    }}>
      {/* Debug info - can be removed in production */}
      <div style={{ 
        border: "1px solid #ddd", 
        margin: 8, 
        padding: 8, 
        color: "#666",
        fontSize: '0.8rem'
      }}>
        <div>Debug: id={id}, chatBy={chatBy}, currentUser={currentUserId}</div>
        <div>Msg count: {messages.length} / Name: {remoteUser?.name || "?"}</div>
        <div>Header Contact Name: {activeConversation?.contact?.name || "-"}</div>
      </div>
      
      {/* Header */}
      <ActiveConversationHeader 
        activeConversation={activeConversation} 
        hasUnreadMessages={unreadCount > 0}
      />
      
      {/* Messages area with scroll */}
      <div style={{ 
        flex: '1 1 auto',
        minHeight: 0, // Important for Firefox
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <JumboScrollbar
          autoHide
          autoHideDuration={200}
          autoHideTimeout={500}
          style={{ 
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
          ref={scrollRef}
        >
          <ActiveConversationChat
            conversation={activeConversation}
            activeConversation={activeConversation}
            currentUserId={currentUserId}
            loading={loading}
          />
        </JumboScrollbar>
      </div>
      
      {/* Message input */}
      <div style={{ 
        borderTop: '1px solid #eee',
        padding: '16px',
        backgroundColor: '#fff'
      }}>
        <ActiveConversationFooter
          remoteUserId={id || ""}
          taskId={chatBy || ""}
          onSendMessage={handleSend}
          onMessageSent={reloadMessages}
        />
      </div>
    </div>
  );
};

export { ChatAppContent };
