import React from "react";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import { JumboDdMenu } from "@jumbo/components";
import { menuItems } from "../../data";

const NewRequestItem = ({ item, onAction }: any) => {
  return (
    <React.Fragment>
      <Divider component="li" />
      <ListItem sx={{ px: 3, py: 1.25 }}>
        <ListItemAvatar>
          <Avatar alt={item.user.name} src={item.user.profile_pic} />
        </ListItemAvatar>
        <ListItemText
          sx={{ flexBasis: "40%" }}
          primary={
            <Typography variant="h5" mb={0.5}>
              {item.user.name}
            </Typography>
          }
          secondary={"@" + item.user.username}
        />
        <ListItemText
          sx={{ flexBasis: "20%" }}
          primary={<Typography>{item.created_at}</Typography>}
        />

        <ListItemText
          sx={{ flexGrow: 0 }}
          primary={
            <JumboDdMenu
              onClickCallback={(action) => {
                onAction(action, item);
              }}
              menuItems={menuItems}
            />
          }
        />
      </ListItem>
    </React.Fragment>
  );
};
/* Todo prop define */
export { NewRequestItem };
