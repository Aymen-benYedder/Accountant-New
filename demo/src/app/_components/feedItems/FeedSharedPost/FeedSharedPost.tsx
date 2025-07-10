import { Span } from "@jumbo/shared";
import BookmarkAddTwoToneIcon from "@mui/icons-material/BookmarkAddTwoTone";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

type FeedSharedPostProps = {
  feed: {
    metaData: any;
    timeRange: string;
  };
};
const FeedSharedPost = ({ feed }: FeedSharedPostProps) => {
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  return (
    <ListItem alignItems={"flex-start"} sx={{ px: 3 }}>
      <ListItemAvatar sx={{ minWidth: 65 }}>
        <Avatar
          sx={{ width: 44, height: 44 }}
          src={feed.metaData.user.profile_pic}
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant={"h6"} color={"text.secondary"}>
            {feed.timeRange}
          </Typography>
        }
        secondary={
          <Typography component={"div"}>
            <Typography color={"text.primary"} mb={2}>
              <Span sx={{ color: "primary.main" }}>
                {feed.metaData.user.name}{" "}
              </Span>
              {" has shared a post saying"}
              <Span sx={{ color: "primary.main" }}>
                {" "}
                {feed.metaData.post.title}
              </Span>
            </Typography>
            <Button
              size={"small"}
              variant={"contained"}
              color={isBookmarked ? "secondary" : "inherit"}
              startIcon={
                isBookmarked ? (
                  <BookmarkAddTwoToneIcon />
                ) : (
                  <BookmarkBorderOutlinedIcon />
                )
              }
              onClick={() => setIsBookmarked(!isBookmarked)}
              disableElevation
            >
              Bookmarks
            </Button>
          </Typography>
        }
      />
    </ListItem>
  );
};

export { FeedSharedPost };
