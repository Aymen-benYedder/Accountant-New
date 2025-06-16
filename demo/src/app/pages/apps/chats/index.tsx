import { ChatAppContent } from "@app/_components/apps/chats";
import { Card } from "@mui/material";
import React from "react";

const ChatAppPage = () => {
  return (
    <Card
      sx={{
        display: "flex",
        minHeight: "100%",
      }}
    >
      <ChatAppContent />
    </Card>
  );
};

export default ChatAppPage;
