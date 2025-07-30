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
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
console.log('All env vars:', import.meta.env);

const ChatAppContent = () => {
  const params = useParams();
  const { id, chatBy } = params as { id?: string; chatBy?: string };
  const { userId: currentUserId } = getCurrentUserJwt();
  console.log("[ChatAppContent] userId (from JWT):", currentUserId);
  const [messages, setMessages] = React.useState<any[]>([]);
  const [remoteUser, setRemoteUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  // Removed local unreadCount, now managed by WebSocketContext
  
  // Use proper type for JumboScrollbar ref
  const scrollRef = React.useRef<Scrollbars>(null);

  const { socket, isConnected, sendMessage: wsSendMessage, markMessagesAsRead: markMessagesAsReadWebSocket, unreadMessageCount } = useWebSocket();
  const [isInitialLoad, setIsInitialLoad] = React.useState(true);
  const pendingMarkAsReadQueue = React.useRef<Array<{messageIds: string[], readerId: string}>>([]);
  const outgoingMessageQueue = React.useRef<any[]>([]);
  const lastPollRef = React.useRef<number>(Date.now());

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

  // Mark messages as read when they become visible using WebSocket
  const markMessagesAsRead = React.useCallback(async () => {
    if (!messages || !messages.length) {
      console.log('[markMessagesAsRead] No messages to mark as read');
      return;
    }
    
    // Find all unread messages for the current user
    const unreadMessages = messages.filter(
      (msg: any) => !msg.read && 
                  msg.recipientId === currentUserId &&
                  msg.senderId !== currentUserId // Don't mark our own sent messages as read
    );

    if (unreadMessages.length === 0) {
      console.log('[markMessagesAsRead] No unread messages to mark');
      return;
    }

    const messageIds = unreadMessages.map((msg: any) => msg._id);
    console.log(`[markMessagesAsRead] Marking ${messageIds.length} messages as read`);

    try {
      if (!currentUserId) {
        console.error('[markMessagesAsRead] Cannot mark messages as read: currentUserId is null');
        return;
      }
      if (!isConnected) {
        // Queue the action and notify user
        pendingMarkAsReadQueue.current.push({ messageIds, readerId: currentUserId });
        console.warn('[markMessagesAsRead] WebSocket not connected, action queued. Will retry on reconnect.');
        // Optionally, trigger a UI notification here
        return;
      }
      const result = await markMessagesAsReadWebSocket(messageIds, currentUserId);
      if (result.success) {
        console.log('[markMessagesAsRead] Successfully marked messages as read via WebSocket');
        setMessages(prevMessages =>
          prevMessages.map(msg =>
            messageIds.includes(msg._id)
              ? { ...msg, read: true, status: 'read' }
              : msg
          )
        );
        // setUnreadCount(prev => Math.max(0, prev - messageIds.length)); // Removed, now managed by WebSocketContext
      } else {
        console.error('[markMessagesAsRead] Failed to mark messages as read via WebSocket:', result.error);
      }
    } catch (error) {
      console.error('[markMessagesAsRead] Error:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        messageIds,
        currentUserId
      });
    }
  }, [messages, currentUserId, isConnected, markMessagesAsReadWebSocket]);

  // Listen for WebSocket connection changes to flush queue
  React.useEffect(() => {
    if (isConnected && pendingMarkAsReadQueue.current.length > 0) {
      // Flush the queue
      pendingMarkAsReadQueue.current.forEach(async ({ messageIds, readerId }) => {
        const result = await markMessagesAsReadWebSocket(messageIds, readerId);
        if (result.success) {
          console.log('[markMessagesAsRead] Flushed queued mark as read:', messageIds);
        } else {
          console.error('[markMessagesAsRead] Failed to flush queued mark as read:', result.error);
        }
      });
      pendingMarkAsReadQueue.current = [];
    }
  }, [isConnected, markMessagesAsReadWebSocket]);

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

  // Handle messages being marked as read via WebSocket
  React.useEffect(() => {
    if (!socket) return;

    const handleMessagesRead = (data: { messageIds: string[], readerId: string }) => {
      console.log('[ChatAppContent] messagesRead event received:', data);
      
      // Only update if the current user is the sender of these messages
      // and the messages are in the current conversation
      setMessages(prevMessages => {
        const updatedMessages = prevMessages.map(msg => {
          if (data.messageIds.includes(msg._id) && 
              msg.senderId === currentUserId && 
              msg.recipientId === data.readerId) {
            console.log(`[ChatAppContent] Marking message as read:`, {
              messageId: msg._id,
              previousStatus: msg.status,
              newStatus: 'read',
              timestamp: new Date().toISOString()
            });
            return { ...msg, read: true, status: 'read' };
          }
          return msg;
        });
        
        // Check if any messages were actually updated
        const updatedCount = updatedMessages.filter(msg => 
          data.messageIds.includes(msg._id) && 
          msg.senderId === currentUserId && 
          msg.recipientId === data.readerId
        ).length;
        
        if (updatedCount > 0) {
          console.log(`[ChatAppContent] Updated ${updatedCount} messages to read status`);
        }
        
        return updatedMessages;
      });
    };

    socket.on('messagesRead', handleMessagesRead);

    return () => {
      if (socket) {
        socket.off('messagesRead', handleMessagesRead);
      }
    };
  }, [socket, currentUserId]);

  // Handle new messages from WebSocket and global events
  React.useEffect(() => {
    const handleNewMessage = (event: CustomEvent) => {
      const newMessage = event.detail;
      
      // Skip if no message or no conversation ID
      if (!newMessage || !id) return;
      
      console.log('[ChatAppContent] New message received:', { 
        id: newMessage._id, 
        from: newMessage.senderId,
        to: newMessage.recipientId,
        conversationId: newMessage.conversationId,
        content: newMessage.content?.substring(0, 50) + (newMessage.content?.length > 50 ? '...' : '')
      });

      // Check if message belongs to current conversation
      // The message is for this conversation if:
      // 1. The conversationId matches the current conversation ID, OR
      // 2. The message is between the current user and the contact we're chatting with
      const isCurrentConversation = 
        newMessage.conversationId === id ||
        (newMessage.senderId === currentUserId && newMessage.recipientId === id) ||
        (newMessage.senderId === id && newMessage.recipientId === currentUserId);

      if (!isCurrentConversation) {
        console.log('[ChatAppContent] Message not for current conversation, ignoring');
        return;
      }

      // Check if this is a server response for a message we sent
      const isServerResponseForOurMessage = 
        newMessage.senderId === currentUserId && 
        newMessage.tempId;

      // Process the new message
      const processedMessage = {
        ...newMessage,
        _id: newMessage._id || `temp-${Date.now()}`,
        sent_by: newMessage.sent_by || newMessage.senderId,
        senderId: newMessage.senderId || newMessage.sent_by,
        recipientId: newMessage.recipientId?.toString(),
        content: newMessage.content,
        timestamp: newMessage.timestamp || new Date().toISOString(),
        status: newMessage.status || 'delivered',
        read: newMessage.read || (newMessage.senderId === currentUserId)
      };

      // Update messages state
      setMessages(prevMessages => {
        // If this is a server response for a message we sent, replace the optimistic update
        if (isServerResponseForOurMessage) {
          console.log('[ChatAppContent] Replacing optimistic message with server response');
          return prevMessages.map(msg => 
            (msg.tempId && newMessage.tempId && msg.tempId === newMessage.tempId)
              ? { ...processedMessage, _id: newMessage._id, status: 'sent' }
              : msg
          );
        }
        // Simple deduplication by ID
        const exists = prevMessages.some(msg => msg._id === processedMessage._id);
        if (exists) {
          console.log('[ChatAppContent] Duplicate message detected, ignoring');
          return prevMessages;
        }
        console.log('[ChatAppContent] Adding new message to state');
        return [...prevMessages, processedMessage];
      });
      
      // Auto-scroll to bottom when new message arrives
      scrollToBottom();
      
      // Mark as read if message is from other user and has a valid ID
      if (processedMessage.senderId !== currentUserId && processedMessage._id && !processedMessage._id.startsWith('temp-')) {
        console.log('[ChatAppContent] Marking message as read via WebSocket');
        // Ensure we have a valid message ID and current user ID
        if (!currentUserId) {
          console.error('[ChatAppContent] Cannot mark message as read: currentUserId is missing');
          return;
        }
        
        // Use the WebSocket function directly with the message ID and current user ID
        markMessagesAsReadWebSocket([processedMessage._id], currentUserId)
          .then(result => {
            if (result.success) {
              console.log('[ChatAppContent] Message marked as read successfully');
              // Update the message status in the UI
              setMessages(prevMessages => 
                prevMessages.map(msg => 
                  msg._id === processedMessage._id 
                    ? { ...msg, read: true, status: 'read' } 
                    : msg
                )
              );
            } else {
              console.error('[ChatAppContent] Failed to mark message as read:', result.error);
            }
          })
          .catch(error => {
            console.error('[ChatAppContent] Error marking message as read:', error);
          });
      }
    };

    // Set up event listener for global WebSocket messages
    const eventListener = (e: Event) => handleNewMessage(e as CustomEvent);
    window.addEventListener('newMessage', eventListener as EventListener);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('newMessage', eventListener as EventListener);
    };
  }, [id, currentUserId, markMessagesAsRead, scrollToBottom]);

  // Listen for WebSocket connection changes to flush outgoing message queue
  React.useEffect(() => {
    if (isConnected && outgoingMessageQueue.current.length > 0) {
      outgoingMessageQueue.current.forEach((msg) => {
        wsSendMessage(msg, (status: string) => {
          if (status === 'sent' || status === 'delivered') {
            // Remove from queue
            outgoingMessageQueue.current = outgoingMessageQueue.current.filter(m => m.tempId !== msg.tempId);
          }
        });
      });
    }
  }, [isConnected, wsSendMessage]);

  // Improved handleSend with queueing
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
    const tempId = Date.now().toString();
    const messageData = {
      taskId: chatBy || undefined,
      recipientId: id,
      content: trimmedContent,
      timestamp: new Date().toISOString(),
      tempId
    };
    // Optimistic UI
    setMessages(prev => [...prev, {
      ...messageData,
      _id: `optimistic-${tempId}`,
      senderId: currentUserId,
      status: 'sending',
      tempId,
      read: false
    }]);
    // If not connected, queue the message
    if (!isConnected) {
      outgoingMessageQueue.current.push(messageData);
      console.warn('[ChatAppContent] WebSocket not connected, message queued. Will retry on reconnect.');
      return;
    }
    // Send via WebSocket
    wsSendMessage(
      { ...messageData, tempId },
      (status) => {
        setMessages(prev =>
          prev.map(msg =>
            msg.tempId === tempId ? { ...msg, status } : msg
          )
        );
        if (status === 'error') {
          outgoingMessageQueue.current.push(messageData);
        }
      }
    );
  }, [id, chatBy, isConnected, wsSendMessage, currentUserId]);

  // Fallback polling for new messages if disconnected for a while
  React.useEffect(() => {
    if (!isConnected) {
      const interval = setInterval(() => {
        if (Date.now() - lastPollRef.current > 10000) { // 10s
          reloadMessages();
          lastPollRef.current = Date.now();
        }
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [isConnected, reloadMessages]);

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
        hasUnreadMessages={unreadMessageCount > 0} // Use global unreadMessageCount
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
