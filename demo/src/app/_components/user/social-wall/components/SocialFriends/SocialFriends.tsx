import { ASSET_AVATARS } from "@app/_utilities/constants/paths";
import { getAssetPath } from "@app/_utilities/helpers";
import { Div } from "@jumbo/shared";
import { Avatar, Badge, Button, Stack, Typography } from "@mui/material";

const SocialFriends = () => {
  return (
    <Div sx={{ mb: 4 }}>
      <Typography variant={"h4"} mb={2}>
        Friends
      </Typography>
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        sx={{
          mx: -0.5,
          mb: 2,
        }}
      >
        <Div
          sx={{
            textAlign: "center",
            width: "33.33%",
            px: 0.5,
            mb: 2,

            "& .MuiBadge-badge": {
              height: 12,
              width: 12,
              borderRadius: "50%",
              border: 2,
              borderColor: "common.white",
            },
          }}
        >
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            variant="dot"
            color={"success"}
          >
            <Avatar
              sx={{ height: 64, width: 64 }}
              alt="Remy Sharp"
              src={getAssetPath(`${ASSET_AVATARS}/avatar3.jpg`, "64x64")}
            />
          </Badge>
          <Typography
            variant={"body1"}
            color={"text.secondary"}
            fontSize={"12px"}
            mt={1}
          >
            Bryan Sherman
          </Typography>
        </Div>
        <Div
          sx={{
            textAlign: "center",
            width: "33.33%",
            px: 0.5,
            mb: 2,

            "& .MuiBadge-badge": {
              height: 12,
              width: 12,
              borderRadius: "50%",
              border: 2,
              borderColor: "common.white",
            },
          }}
        >
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            variant="dot"
            color={"success"}
          >
            <Avatar
              sx={{ height: 64, width: 64 }}
              alt="Remy Sharp"
              src={getAssetPath(`${ASSET_AVATARS}/avatar4.jpg`, "64x64")}
            />
          </Badge>
          <Typography
            variant={"body1"}
            color={"text.secondary"}
            fontSize={"12px"}
            mt={1}
          >
            Jared Morton
          </Typography>
        </Div>
        <Div
          sx={{
            textAlign: "center",
            width: "33.33%",
            px: 0.5,
            mb: 2,

            "& .MuiBadge-badge": {
              height: 12,
              width: 12,
              borderRadius: "50%",
              border: 2,
              borderColor: "common.white",
            },
          }}
        >
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            variant="dot"
            color={"success"}
          >
            <Avatar
              sx={{ height: 64, width: 64 }}
              alt="Remy Sharp"
              src={getAssetPath(`${ASSET_AVATARS}/avatar5.jpg`, "64x64")}
            />
          </Badge>
          <Typography
            variant={"body1"}
            color={"text.secondary"}
            fontSize={"12px"}
            mt={1}
          >
            Edwin Blair
          </Typography>
        </Div>
        <Div
          sx={{
            textAlign: "center",
            width: "33.33%",
            px: 0.5,
            mb: 2,

            "& .MuiBadge-badge": {
              height: 12,
              width: 12,
              borderRadius: "50%",
              border: 2,
              borderColor: "common.white",
            },
          }}
        >
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            variant="dot"
            color={"success"}
          >
            <Avatar
              sx={{ height: 64, width: 64 }}
              alt="Remy Sharp"
              src={getAssetPath(`${ASSET_AVATARS}/avatar6.jpg`, "64x64")}
            />
          </Badge>
          <Typography
            variant={"body1"}
            color={"text.secondary"}
            fontSize={"12px"}
            mt={1}
          >
            Abbie Roy
          </Typography>
        </Div>
        <Div
          sx={{
            textAlign: "center",
            width: "33.33%",
            px: 0.5,
            mb: 2,

            "& .MuiBadge-badge": {
              height: 12,
              width: 12,
              borderRadius: "50%",
              border: 2,
              borderColor: "common.white",
            },
          }}
        >
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            variant="dot"
            color={"success"}
          >
            <Avatar
              sx={{ height: 64, width: 64 }}
              alt="Remy Sharp"
              src={getAssetPath(`${ASSET_AVATARS}/avatar7.jpg`, "64x64")}
            />
          </Badge>
          <Typography
            variant={"body1"}
            color={"text.secondary"}
            fontSize={"12px"}
            mt={1}
          >
            Leah Massey
          </Typography>
        </Div>
        <Div
          sx={{
            textAlign: "center",
            width: "33.33%",
            px: 0.5,
            mb: 2,

            "& .MuiBadge-badge": {
              height: 12,
              width: 12,
              borderRadius: "50%",
              border: 2,
              borderColor: "common.white",
            },
          }}
        >
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            variant="dot"
            color={"success"}
          >
            <Avatar
              sx={{ height: 64, width: 64 }}
              alt="Remy Sharp"
              src={getAssetPath(`${ASSET_AVATARS}/avatar8.jpg`, "64x64")}
            />
          </Badge>
          <Typography
            variant={"body1"}
            color={"text.secondary"}
            fontSize={"12px"}
            mt={1}
          >
            Jane Bryan
          </Typography>
        </Div>
      </Stack>
      <Button variant={"outlined"} fullWidth>
        View All
      </Button>
    </Div>
  );
};

export { SocialFriends };
