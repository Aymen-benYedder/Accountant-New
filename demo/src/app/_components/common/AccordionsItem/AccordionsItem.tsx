import { Typography } from "@mui/material";

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import { notificationsData } from "../data";

const AccordionsItem = () => {
  return (
    <List
      disablePadding
      sx={{
        ".MuiListItemIcon-root": {
          border: 1,
          borderColor: "divider",
          width: 42,
          height: 42,
          borderRadius: 2,
          alignItems: "center",
          justifyContent: "center",
          minWidth: 42,
          mr: 2.5,
        },
        ".MuiListItem-root": {
          paddingBlock: 0.5,
        },
      }}
    >
      {notificationsData.map((notification, index) => (
        <ListItem disableGutters key={index}>
          <ListItemIcon>{notification?.icon}</ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="h5" mb={0.5}>
                {notification?.title}
              </Typography>
            }
            secondary={notification?.description}
          />
          <Switch defaultChecked />
        </ListItem>
      ))}
    </List>
  );
};

export { AccordionsItem };
