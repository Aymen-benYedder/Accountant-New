import { ASSET_AVATARS, ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { getAssetPath } from "@app/_utilities/helpers";
import { Div } from "@jumbo/shared";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

const SocialProfile = () => {
  return (
    <Card sx={{ mb: 4 }}>
      <CardMedia
        component="img"
        height="180"
        image={getAssetPath(
          `${ASSET_IMAGES}/wall/tamara-bellis.jpg`,
          "240x180"
        )}
        alt="Paella dish"
      />
      <CardContent>
        <Div
          sx={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
            mt: -7.5,
            mb: 2,
          }}
        >
          <Avatar
            alt="Remy Sharp"
            src={getAssetPath(`${ASSET_AVATARS}/avatar3.jpg`, "72x72")}
            sx={{
              width: 72,
              height: 72,
              border: 3,
              mr: 2,
              borderColor: "common.white",
              boxShadow: (theme) => theme.shadows[3],
            }}
          />
          <Div sx={{ flex: 1 }}>
            <Typography variant={"h6"} color={"common.white"} mb={2}>
              Chelsea Jones
            </Typography>
            <Typography variant={"body1"} color={"text.secondary"}>
              Florida,USA
            </Typography>
          </Div>
        </Div>
        <Stack
          direction={"row"}
          justifyContent={"space-evenly"}
          divider={<Divider orientation="vertical" flexItem />}
          mb={2}
        >
          <Div sx={{ textAlign: "center", p: 1 }}>
            <Typography variant={"h6"}>2k+</Typography>
            <Typography
              variant={"body1"}
              fontSize={"12px"}
              color={"text.secondary"}
            >
              Followers
            </Typography>
          </Div>
          <Div sx={{ textAlign: "center", p: 1 }}>
            <Typography variant={"h6"}>689</Typography>
            <Typography
              variant={"body1"}
              fontSize={"12px"}
              color={"text.secondary"}
            >
              Friends
            </Typography>
          </Div>
          <Div sx={{ textAlign: "center", p: 1 }}>
            <Typography variant={"h6"}>283</Typography>
            <Typography
              variant={"body1"}
              fontSize={"12px"}
              color={"text.secondary"}
            >
              Following
            </Typography>
          </Div>
        </Stack>
        <Button
          size={"small"}
          variant={"contained"}
          sx={{ px: 2 }}
          disableElevation
        >
          Follow
        </Button>
      </CardContent>
    </Card>
  );
};

export { SocialProfile };
