import {
  Avatar,
  Button,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { UserConnectedProps } from "../../data";
const ConnectToUsers = ({ user }: { user: UserConnectedProps }) => {
  return (
    <React.Fragment>
      <ListItem disableGutters alignItems="flex-start">
        <ListItemAvatar sx={{ minWidth: 64 }}>
          <Avatar
            variant="square"
            src={user.avatar}
            sx={{ width: 48, height: 48, borderRadius: 3 }}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant="h5" mb={0.5} mt={0.25}>
              {user.name}
            </Typography>
          }
          secondary={
            <>
              <Typography
                variant="body2"
                color="textSecondary"
                mb={1.5}
                component={"span"}
                display={"block"}
              >
                {user.role}
              </Typography>
              <Button
                variant="outlined"
                color="error"
                size="small"
                sx={{ borderRadius: 1.5 }}
              >
                Connect
              </Button>
            </>
          }
        />
      </ListItem>

      <Divider component={"li"} sx={{ my: 1.5 }} />
    </React.Fragment>
  );
};
export { ConnectToUsers };
