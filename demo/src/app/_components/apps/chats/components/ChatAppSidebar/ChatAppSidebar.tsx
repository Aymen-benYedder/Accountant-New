import { JumboScrollbar } from "@jumbo/components";
import { Div } from "@jumbo/shared";
import React from "react";
import { AuthUserSummary, ChatGlobalSearch, RecentConversationsList } from "./components";

const ChatAppSidebar = () => {
  return (
    <React.Fragment>
      <Div sx={{ p: 2, pb: 1.25 }}>
        <AuthUserSummary />
        <ChatGlobalSearch />
      </Div>
      <JumboScrollbar
        style={{ minHeight: 200 }}
        autoHide
        autoHideDuration={200}
        autoHideTimeout={500}
        autoHeightMin={30}
      >
        <RecentConversationsList />
      </JumboScrollbar>
    </React.Fragment>
  );
};

export { ChatAppSidebar };
