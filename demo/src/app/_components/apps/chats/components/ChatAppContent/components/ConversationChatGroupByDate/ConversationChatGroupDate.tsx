import React from "react";
import { ActiveConversationChat } from "../ActiveConversationChat";
import { MessagesProps } from "@app/_components/apps/_types/ChatTypes";
/** todo : change any typescript */
const chatGroupedByDate = (array: any[], key: any) =>
  Object.entries(
    array.reduce((result, { [key]: k, ...rest }) => {
      (result[k] = result[k] || []).push(rest);
      return result;
    }, {})
  ).map(([sent_date, messages]) => ({
    sent_date,
    messages,
  }));
const ConversationChatGroupByDate = ({
  activeConversation,
  currentUserId,
}: {
  activeConversation?: { messages: MessagesProps[] };
  currentUserId?: string | null;
}) => {
  const conversationMessages = React.useMemo(() => {
    if (activeConversation)
      return chatGroupedByDate(activeConversation?.messages, "sent_date");

    return [];
  }, [activeConversation]);
  return (
    <React.Fragment>
      {conversationMessages?.map((messagesGroupByDate, index) => (
        <ActiveConversationChat
          key={index}
          conversation={messagesGroupByDate}
          activeConversation={activeConversation}
          currentUserId={currentUserId}
        />
      ))}
    </React.Fragment>
  );
};

export { ConversationChatGroupByDate };
