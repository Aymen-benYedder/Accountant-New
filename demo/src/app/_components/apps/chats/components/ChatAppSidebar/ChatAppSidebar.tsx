import { JumboScrollbar } from "@jumbo/components";
import { Div } from "@jumbo/shared";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import React from "react";
import {
  AuthUserSummary,
  ChatContactsList,
  ChatGlobalSearch,
  FavoriteConversationsList,
  RecentConversationsList,
} from "./components";

const ChatAppSidebar = () => {
  const [activeTab, setActiveTab] = React.useState<string>("chat");
  return (
    <React.Fragment>
      <Div sx={{ p: 2, pb: 1.25 }}>
        <AuthUserSummary />
        <ChatGlobalSearch />
      </Div>
      <TabContext value={activeTab}>
        <Div sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            variant="fullWidth"
            onChange={(_, newTab) => setActiveTab(newTab)}
          >
            <Tab label="Chats" value={"chat"} />
            <Tab label="Contacts" value={"contact"} />
          </TabList>
        </Div>
        <JumboScrollbar
          style={{ minHeight: 200 }}
          autoHide
          autoHideDuration={200}
          autoHideTimeout={500}
          autoHeightMin={30}
        >
          <TabPanel value={"chat"} sx={{ p: 0 }}>
            <FavoriteConversationsList />
            <RecentConversationsList />
          </TabPanel>
          <TabPanel value={"contact"} sx={{ p: 0 }}>
            <ChatContactsList />
          </TabPanel>
        </JumboScrollbar>
      </TabContext>
    </React.Fragment>
  );
};

export { ChatAppSidebar };
