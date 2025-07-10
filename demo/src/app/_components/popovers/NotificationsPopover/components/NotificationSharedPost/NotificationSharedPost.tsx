import { getDateElements } from "@app/_utilities/helpers";
import { Link, Span } from "@jumbo/shared";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import {
  Avatar,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import { NotificationsDataProps } from "../data";

const NotificationSharedPost = ({ item }: { item: NotificationsDataProps }) => {
  return (
    <ListItemButton component={"li"} alignItems={"flex-start"}>
      <ListItemAvatar>
        <Avatar src={item.user.profile_pic} />
      </ListItemAvatar>
      <ListItemText>
        <Link underline={"none"} to="#/">
          {item.user.name}
        </Link>
        {` has shared ${item?.metaData?.post?.owner?.name}'s post`}
        <Typography
          component="span"
          sx={{
            display: "flex",
            fontSize: "90%",
            mt: 0.5,
          }}
        >
          <ShareOutlinedIcon fontSize="small" sx={{ color: "#0795F4" }} />
          <Span sx={{ color: "text.secondary", ml: 1 }}>
            {getDateElements(item.date).time}
          </Span>
        </Typography>
      </ListItemText>
    </ListItemButton>
  );
};

export { NotificationSharedPost };
