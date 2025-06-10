import { Div, Span } from "@jumbo/shared";
import {
  Avatar,
  AvatarGroup,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

type FeedPhotoUploadProps = {
  feed: {
    metaData: any;
    timeRange: string;
  };
};

const FeedPhotoUpload = ({ feed }: FeedPhotoUploadProps) => {
  return (
    <ListItem alignItems={"flex-start"} sx={{ px: 3 }}>
      <ListItemAvatar sx={{ minWidth: 65 }}>
        <Avatar
          sx={{ width: 44, height: 44 }}
          alt={feed.metaData.user.name}
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
              {"uploaded"} {feed.metaData.count} {"in"}
              <Span sx={{ color: "primary.main" }}> {feed.metaData.group}</Span>
            </Typography>
            <Div sx={{ display: "flex" }}>
              <AvatarGroup max={5}>
                {feed.metaData.photos.map(
                  (item: { photo_url: string }, index: number) => (
                    <Avatar key={index} src={item.photo_url} />
                  )
                )}
              </AvatarGroup>
            </Div>
          </Typography>
        }
      />
    </ListItem>
  );
};

export { FeedPhotoUpload, type FeedPhotoUploadProps };
