import React from "react";
import { ActiveConversationChat } from "../ActiveConversationChat";
import { MessagesProps } from "@app/_components/apps/_types/ChatTypes";

interface GroupedMessages {
  sent_date: string;
  messages: Array<MessagesProps & { content: string }>; // Ensure messages have content
}

interface ConversationChatGroupByDateProps {
  activeConversation?: {
    messages: MessagesProps[];
    contact?: {
      id: string;
      name: string;
      avatar?: string;
    };
  };
  currentUserId?: string | null;
}

const chatGroupedByDate = (
  array: MessagesProps[],
  key: keyof MessagesProps
): GroupedMessages[] => {
  // Filter out messages without content and ensure they have the required properties
  const validMessages = array.filter((msg): msg is MessagesProps & { content: string } => {
    return typeof msg.content === 'string' && typeof msg.message_type === 'string';
  });

  const grouped = validMessages.reduce<Record<string, Array<MessagesProps & { content: string }>>>(
    (result, item) => {
      const groupKey = String(item[key] || '');
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(item);
      return result;
    }, 
    {}
  );

  return Object.entries(grouped).map(([sent_date, messages]) => ({
    sent_date,
    messages,
  }));
};

const ConversationChatGroupByDate: React.FC<ConversationChatGroupByDateProps> = ({
  activeConversation,
  currentUserId,
}) => {
  const conversationMessages = React.useMemo(() => {
    if (activeConversation?.messages?.length) {
      return chatGroupedByDate(activeConversation.messages, "sent_date");
    }
    return [];
  }, [activeConversation]);

  if (!activeConversation) {
    return null;
  }

  return (
    <React.Fragment>
      {conversationMessages.map((messagesGroupByDate, index) => (
        <ActiveConversationChat
          key={`${messagesGroupByDate.sent_date}-${index}`}
          conversation={{
            messages: messagesGroupByDate.messages,
            sent_date: messagesGroupByDate.sent_date,
          }}
          activeConversation={activeConversation}
          currentUserId={currentUserId || ''}
          loading={false}
        />
      ))}
    </React.Fragment>
  );
};

export { ConversationChatGroupByDate };
