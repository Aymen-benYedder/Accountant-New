import { JumboDdMenu } from "@jumbo/components";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { RiPencilLine } from "react-icons/ri";
import { licenseData } from "../data";

const LicenseCertificate = ({ action = false }: { action?: boolean }) => {
  return (
    <List
      sx={{
        pt: 0,
        ".MuiListItemSecondaryAction-root": {
          top: 5,
          transform: "translateY(0)",
        },
        ".MuiListItem-root": action
          ? {
              pr: 14,
            }
          : {},
      }}
    >
      {licenseData?.map((item, index) => (
        <ListItem
          key={index}
          sx={{ paddingLeft: 0 }}
          secondaryAction={
            action && (
              <Stack direction={"row"} spacing={1} alignItems={"center"}>
                <IconButton
                  size="small"
                  color="primary"
                  sx={{ border: 1, flexShrink: 0 }}
                >
                  <RiPencilLine />
                </IconButton>
                <JumboDdMenu />
              </Stack>
            )
          }
        >
          <ListItemAvatar sx={{ minWidth: 88 }}>
            <Avatar
              src={item.profileImage}
              sx={{
                width: 72,
                height: 72,
                border: 1,
                borderColor: "divider",
                borderRadius: 4,
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography variant="h5" mt={0.5} mb={0.5}>
                {item.name}
              </Typography>
            }
            secondary={item.desc && item.desc}
          />
        </ListItem>
      ))}
    </List>
  );
};

export { LicenseCertificate };
