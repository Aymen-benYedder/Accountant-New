import { ChatAppContent } from "@app/_components/apps/chats";
import { Card } from "@mui/material";
import React from "react";

const ChatAppPage = () => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 64px - 32px)", // Account for header and padding
        minHeight: 600,
        width: "100%",
        overflow: "hidden"
      }}
    >
      <ChatAppContent />
    </Card>
  );
};

export default ChatAppPage;
