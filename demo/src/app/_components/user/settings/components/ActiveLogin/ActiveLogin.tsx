import { ASSET_AVATARS } from "@app/_utilities/constants/paths";
import { JumboCard } from "@jumbo/components";
import { Div, Span } from "@jumbo/shared";
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import { RiMacLine, RiTimeLine, RiUser6Line } from "react-icons/ri";
import { SettingHeader } from "../../SettingHeader";
const ActiveLogin = () => {
  return (
    <Div sx={{ mb: 3 }}>
      <SettingHeader
        title={"Active Login Device"}
        action={
          <Button
            variant="contained"
            sx={{ textTransform: "none", boxShadow: "none" }}
          >
            Sign Out Of All Devices
          </Button>
        }
        divider
      />
      <Grid container spacing={3.75}>
        <Grid size={{ xs: 12, md: 6 }}>
          <JumboCard
            title={
              <Span sx={{ display: "flex", alignItems: "center" }}>
                <RiMacLine fontSize={24} />
                <Typography variant="h5" color="textPrimary" ml={1} mb={0}>
                  {"Mac Chrome - Web Browser"}
                </Typography>
              </Span>
            }
            action={<Button size="small">Current</Button>}
            contentWrapper
            contentSx={{ pt: 0 }}
            sx={{ ".MuiCardHeader-action": { my: -0.5 } }}
          >
            <List
              disablePadding
              sx={{
                mb: 3,
                ".MuiListItemIcon-root": {
                  minWidth: 32,
                },
              }}
            >
              <ListItem disablePadding>
                <ListItemIcon>
                  <RiUser6Line fontSize={18} />
                </ListItemIcon>
                <ListItemText primary="No profile to show" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <RiTimeLine fontSize={18} />
                </ListItemIcon>
                <ListItemText primary="14/09/24, 12:43 am GMT" />
              </ListItem>
            </List>

            <Button
              variant="outlined"
              sx={{
                color: "error",
                textTransform: "none", // To match the button's simple text style
              }}
            >
              Sign Out
            </Button>
          </JumboCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <JumboCard
            title={
              <Span sx={{ display: "flex", alignItems: "center" }}>
                <RiMacLine fontSize={24} />
                <Typography variant="h5" color="textPrimary" ml={1} mb={0}>
                  {"iPhone Safari - Web Browser"}
                </Typography>
              </Span>
            }
            contentWrapper
            contentSx={{ pt: 0 }}
          >
            <List
              disablePadding
              sx={{
                mb: 3,
                ".MuiListItemIcon-root": {
                  minWidth: 32,
                },
              }}
            >
              <ListItem disablePadding>
                <ListItemIcon>
                  <Avatar
                    sx={{ width: "18px", height: "18px" }}
                    src={`${ASSET_AVATARS}/avatar9.jpg`}
                    alt="Alexa"
                  />
                </ListItemIcon>
                <ListItemText primary="No profile to show" />
              </ListItem>
              <ListItem disablePadding>
                <ListItemIcon>
                  <RiTimeLine fontSize={18} />
                </ListItemIcon>
                <ListItemText primary="14/09/24, 12:43 am GMT" />
              </ListItem>
            </List>

            <Button
              variant="outlined"
              sx={{
                color: "error",
                textTransform: "none", // To match the button's simple text style
              }}
            >
              Sign Out
            </Button>
          </JumboCard>
        </Grid>
      </Grid>
    </Div>
  );
};

export { ActiveLogin };
