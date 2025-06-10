import { Span } from "@jumbo/shared";
import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

interface FeedMessageProps {
  feed: {
    name: string;
    avatar: string;
    time: string;
    content: React.ReactNode;
    metaData: any;
  };
}

function FeedMessage({ feed }: FeedMessageProps) {
  return (
    <ListItem alignItems={"flex-start"} sx={{ px: 3 }}>
      <ListItemAvatar sx={{ minWidth: 65 }}>
        <Avatar
          sx={{ width: 44, height: 44 }}
          alt={feed.name}
          src={feed.avatar}
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant={"h6"} color={"text.secondary"}>
            {feed.time}
          </Typography>
        }
        secondary={
          <Typography component={"div"}>
            <Typography color={"text.primary"} mb={2}>
              <Span sx={{ color: "primary.main" }}>{feed.content} </Span>
              {"has sent you an invitation to join project"}
              <Span sx={{ color: "primary.main" }}> {feed.name}</Span>
            </Typography>
            <Stack direction={"row"} spacing={1}>
              <Button variant={"contained"} size={"small"} disableElevation>
                Reply
              </Button>
            </Stack>
          </Typography>
        }
      />
    </ListItem>
  );
}

export { FeedMessage, type FeedMessageProps };
