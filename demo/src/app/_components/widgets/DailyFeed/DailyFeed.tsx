import { CardActions, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";

import { JumboCard } from "@jumbo/components/JumboCard";
import { JumboScrollbar } from "@jumbo/components/JumboScrollbar";
import { dailyFeed } from "./data";
import { FeedItem } from "./components/FeedItem";

interface DailyFeedProps {
  title: React.ReactNode;
  scrollHeight?: number;
}
const DailyFeed = ({ title, scrollHeight }: DailyFeedProps) => {
  return (
    <JumboCard
      title={title}
      action={<Chip label={"23 New Feeds"} size={"small"} color={"warning"} />}
    >
      <JumboScrollbar
        autoHeight
        autoHeightMin={scrollHeight ? scrollHeight : 498}
      >
        <List disablePadding>
          {dailyFeed.map((feed, index) => (
            <FeedItem key={index} feed={feed} />
          ))}
        </List>
      </JumboScrollbar>
      <Divider />
      <CardActions sx={{ py: (theme) => theme.spacing(1.5) }}>
        <Typography variant={"h6"} color={"text.secondary"} mb={0}>
          {"Last Updated 30 min ago"}
        </Typography>
      </CardActions>
    </JumboCard>
  );
};

export { DailyFeed };
