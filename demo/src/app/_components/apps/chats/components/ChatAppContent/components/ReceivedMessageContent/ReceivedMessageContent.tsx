import React from "react";
import { Div } from "@jumbo/shared";
// This module formerly relied on local users/fake-data; integrate with props/context instead.

// TODO: Update the parent component to pass in real message/user info
// For now, eliminate all references to users/conversations
// and use only props for activeConversation and contact info.

interface Props {
  message: any;
  senderName: string;
}

const ReceivedMessageContent: React.FC<Props> = ({ senderName, message }) => {
  return (
    <Div sx={{ background: "#f5f5f5", p: 1.5, borderRadius: 2, mb: 1 }}>
      <Div sx={{ fontWeight: 500, color: "#035388" }}>{senderName}</Div>
      <Div sx={{ fontSize: 15 }}>{message.content}</Div>
      <Div sx={{ fontSize: 12, color: "#999" }}>
        {new Date(message.timestamp).toLocaleString()}
      </Div>
    </Div>
  );
};

export { ReceivedMessageContent };
