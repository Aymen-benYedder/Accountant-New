import { JumboCard } from "@jumbo/components/JumboCard";
import { JumboScrollbar } from "@jumbo/components/JumboScrollbar";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { CardActions, Chip, Divider, Tab } from "@mui/material";
import React from "react";
import { FeedsList, InvitationsList, MessagesList } from "./components";
import { latestNotifications } from "./data";
import { Link } from "@jumbo/shared";

const NotificationListComponents = {
  MESSAGES: MessagesList,
  FEEDS: FeedsList,
  INVITATIONS: InvitationsList,
};
interface LatestNotificationProps {
  title: React.ReactNode;
  scrollHeight?: number;
}
function LatestNotifications({ title, scrollHeight }: LatestNotificationProps) {
  const [value, setValue] = React.useState("notification");
  return (
    <JumboCard
      title={title}
      action={<Chip size={"small"} label={"2 New"} color={"secondary"} />}
    >
      <TabContext value={value}>
        <TabList
          sx={{ borderBottom: 1, borderColor: "divider" }}
          onChange={({}, newValue) => setValue(newValue)}
        >
          <Tab
            label={"App Notifications"}
            value={"notification"}
            sx={{ flex: "1 1 auto" }}
          />
          <Tab label={"Feeds"} value={"feed"} sx={{ flex: "1 1 auto" }} />
        </TabList>
        <TabPanel value="notification" sx={{ p: 0 }}>
          <JumboScrollbar
            autoHeight
            autoHeightMin={scrollHeight ? scrollHeight : 448}
          >
            {latestNotifications.map((notificationGroupType, index) => {
              const GroupTypeComponent =
                NotificationListComponents[`${notificationGroupType.type}`];
              return (
                <GroupTypeComponent
                  key={index}
                  notifications={notificationGroupType.records}
                  count={notificationGroupType.total}
                  noHeader={true}
                />
              );
            })}
          </JumboScrollbar>
        </TabPanel>
        <TabPanel value="feed" sx={{ p: 0 }}>
          <JumboScrollbar
            autoHeight
            autoHeightMin={scrollHeight ? scrollHeight : 448}
          >
            <FeedsList
              notifications={latestNotifications[2].records}
              count={latestNotifications[2].total}
              noHeader={true}
            />
          </JumboScrollbar>
        </TabPanel>
      </TabContext>
      <Divider />
      <CardActions sx={{ py: (theme) => theme.spacing(1.5) }}>
        <Link to={"#/"} underline={"none"} lineHeight={1.2}>
          Learn More
        </Link>
      </CardActions>
    </JumboCard>
  );
}

export { LatestNotifications };
