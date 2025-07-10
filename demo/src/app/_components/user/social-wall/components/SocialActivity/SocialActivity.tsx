import { ASSET_AVATARS, ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { getAssetPath } from "@app/_utilities/helpers";
import { Div, Span } from "@jumbo/shared";
import {
  Avatar,
  AvatarGroup,
  Button,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

const SocialActivity = () => {
  return (
    <Div sx={{ mb: 2 }}>
      <Typography variant={"h4"} mb={2}>
        Recent Activity
      </Typography>
      <Typography variant={"body1"} color={"text.secondary"} mb={0.5}>
        Today
      </Typography>
      <List disablePadding sx={{ mb: 3 }}>
        <ListItem alignItems={"flex-start"} sx={{ px: 0 }}>
          <ListItemAvatar sx={{ minWidth: 60 }}>
            <Avatar
              alt="Remy Sharp"
              src={getAssetPath(`${ASSET_AVATARS}/avatar3.jpg`, "44x44")}
              sx={{
                width: 44,
                height: 44,
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography component={"div"}>
                <Typography color={"text.primary"}>
                  <Span sx={{ color: "primary.main" }}>Guptil </Span>
                  {"has sent you an invitation to join project"}
                  <Span sx={{ color: "primary.main" }}> Mouldifi</Span>
                </Typography>
              </Typography>
            }
          />
        </ListItem>
        <ListItem alignItems={"flex-start"} sx={{ px: 0 }}>
          <ListItemAvatar sx={{ minWidth: 60 }}>
            <Avatar
              alt="Mich Sharp"
              src="Mich Sharp"
              sx={{
                width: 44,
                height: 44,
                bgcolor: "success.main",
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography component={"div"}>
                <Typography color={"text.primary"}>
                  {"Mich uploaded 6 new photos in"}
                  <Span sx={{ color: "primary.main" }}> Art Lovers group</Span>
                </Typography>
              </Typography>
            }
          />
        </ListItem>
        <ListItem alignItems={"flex-start"} sx={{ px: 0 }}>
          <ListItemAvatar sx={{ minWidth: 60 }}>
            <Avatar
              alt="Remy Sharp"
              src={getAssetPath(`${ASSET_AVATARS}/avatar3.jpg`, "44x44")}
              sx={{
                width: 44,
                height: 44,
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography component={"div"}>
                <Typography color={"text.primary"}>
                  <Span sx={{ color: "primary.main" }}>Joshua </Span>
                  {"Joshua has shared a post asaying this is bigening."}
                </Typography>
                <Stack direction={"row"} spacing={1} mt={2}>
                  <Button size={"small"} variant={"contained"} disableElevation>
                    Like
                  </Button>
                  <Button
                    size={"small"}
                    variant={"contained"}
                    color={"inherit"}
                    disableElevation
                  >
                    Share
                  </Button>
                </Stack>
              </Typography>
            }
          />
        </ListItem>
        <ListItem alignItems={"flex-start"} sx={{ px: 0 }}>
          <ListItemAvatar sx={{ minWidth: 60 }}>
            <Avatar
              alt="Remy Sharp"
              src={getAssetPath(`${ASSET_AVATARS}/avatar3.jpg`, "44x44")}
              sx={{
                width: 44,
                height: 44,
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography component={"div"}>
                <Typography color={"text.primary"}>
                  <Span sx={{ color: "primary.main" }}>Stella </Span>
                  {"has send you an invitation."}
                </Typography>
                <Stack direction={"row"} spacing={1} mt={2}>
                  <Button
                    size={"small"}
                    variant={"contained"}
                    color={"success"}
                    disableElevation
                  >
                    Accept
                  </Button>
                  <Button
                    size={"small"}
                    variant={"contained"}
                    color={"inherit"}
                    disableElevation
                  >
                    Reject
                  </Button>
                </Stack>
              </Typography>
            }
          />
        </ListItem>
      </List>

      <Typography variant={"body1"} color={"text.secondary"} mb={0.5}>
        Yesterday
      </Typography>
      <List disablePadding sx={{ mb: 3 }}>
        <ListItem alignItems={"flex-start"} sx={{ px: 0 }}>
          <ListItemAvatar sx={{ minWidth: 60 }}>
            <Avatar
              alt="Remy Sharp"
              src={getAssetPath(`${ASSET_AVATARS}/avatar3.jpg`, "44x44")}
              sx={{
                width: 44,
                height: 44,
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography component={"div"}>
                <Typography color={"text.primary"}>
                  {"Agent "}
                  <Span sx={{ color: "primary.main" }}>Kily </Span>
                  {
                    "Agent Kily Johns has added 7 new photos to the property Albama's House"
                  }
                </Typography>
                <Div sx={{ display: "flex", flex: 1, mt: 2 }}>
                  <AvatarGroup variant={"square"} max={3}>
                    <Avatar
                      alt="Remy Sharp"
                      src={getAssetPath(
                        `${ASSET_IMAGES}/products/speaker.jpeg`,
                        "44x44"
                      )}
                    />
                    <Avatar
                      alt="Travis Howard"
                      src={getAssetPath(
                        `${ASSET_IMAGES}/products/laptop.jpeg`,
                        "44x44"
                      )}
                    />
                    <Avatar
                      alt="Cindy Baker"
                      src={getAssetPath(
                        `${ASSET_IMAGES}/products/trimmer.jpg`,
                        "44x44"
                      )}
                    />
                    <Avatar
                      alt="Agnes Walker"
                      src={getAssetPath(
                        `${ASSET_IMAGES}/products/travel-bag.jpg`,
                        "44x44"
                      )}
                    />
                  </AvatarGroup>
                </Div>
              </Typography>
            }
          />
        </ListItem>
        <ListItem alignItems={"flex-start"} sx={{ px: 0 }}>
          <ListItemAvatar sx={{ minWidth: 60 }}>
            <Avatar
              alt="Mich Sharp"
              src={getAssetPath(`${ASSET_AVATARS}/avatar4.jpg`, "44x44")}
              sx={{
                width: 44,
                height: 44,
                bgcolor: "success.main",
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography component={"div"}>
                <Typography color={"text.primary"}>
                  {"Mich uploaded 6 new photos in"}
                  <Span sx={{ color: "primary.main" }}> Art Lovers group</Span>
                </Typography>
              </Typography>
            }
          />
        </ListItem>
        <ListItem alignItems={"flex-start"} sx={{ px: 0 }}>
          <ListItemAvatar sx={{ minWidth: 60 }}>
            <Avatar
              alt="Remy Sharp"
              src={getAssetPath(`${ASSET_AVATARS}/avatar5.jpg`, "44x44")}
              sx={{
                width: 44,
                height: 44,
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography component={"div"}>
                <Typography color={"text.primary"}>
                  <Span sx={{ color: "primary.main" }}>Joshua </Span>
                  {"Joshua has shared a post asaying this is bigening."}
                </Typography>
                <Stack direction={"row"} spacing={1} mt={2}>
                  <Button size={"small"} variant={"contained"} disableElevation>
                    Like
                  </Button>
                  <Button
                    size={"small"}
                    variant={"contained"}
                    color={"inherit"}
                    disableElevation
                  >
                    Share
                  </Button>
                </Stack>
              </Typography>
            }
          />
        </ListItem>
      </List>
      <Div>
        <Link href="#" underline="none">
          Load more
        </Link>
      </Div>
    </Div>
  );
};

export { SocialActivity };
