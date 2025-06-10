import {
  Button,
  Chip,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { AuthProps } from "./data";
const TwoFactorAuthItem = ({ auth }: { auth: AuthProps }) => {
  return (
    <ListItem alignItems="flex-start">
      {auth?.icon && (
        <ListItemAvatar sx={{ minWidth: "42px" }}>{auth.icon}</ListItemAvatar>
      )}
      <ListItemText
        primary={
          <Stack direction={"row"} alignItems={"center"}>
            <Typography variant="h5" fontWeight={500} sx={{ mb: 1 }}>
              {auth?.title}
            </Typography>
            {auth?.config && (
              <Chip
                label="configured"
                color="success"
                variant="outlined"
                size="small"
                sx={{ ml: 1, mb: 0.5 }}
              />
            )}
          </Stack>
        }
        secondary={auth?.subheader}
      />
      {auth?.config ? (
        <ListItemSecondaryAction>
          <Button variant="outlined" size="small">
            Edit
          </Button>
        </ListItemSecondaryAction>
      ) : (
        <ListItemSecondaryAction>
          <Button variant="contained" size="small" disableElevation>
            Add
          </Button>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

export { TwoFactorAuthItem };
