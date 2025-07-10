import { ASSET_AVATARS } from "@app/_utilities/constants/paths";
import { JumboDdMenu } from "@jumbo/components";
import { Div } from "@jumbo/shared";
import { Avatar, Badge, Button, Stack, Typography } from "@mui/material";

const Profile2Header = () => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        pb: 3,
      }}
      mb={2.5}
    >
      <Div
        sx={{
          display: "flex",
          minWidth: 0,
          alignItems: "center",
          mr: 2,
        }}
      >
        <Badge
          overlap="circular"
          variant="dot"
          sx={{
            "& .MuiBadge-badge": {
              height: 12,
              width: 12,
              border: 1,
              borderColor: "common.white",
              borderRadius: "50%",
              backgroundColor: "#72d63a",
              right: 2,
              top: 2,
            },
          }}
        >
          <Avatar
            alt={""}
            variant="square"
            sx={{ borderRadius: 3, width: 60, height: 60 }}
            src={`${ASSET_AVATARS}/avatar9.jpg`}
          />
        </Badge>
        <Div sx={{ flex: "1 1 auto", ml: 2 }}>
          <Typography variant={"h4"} textTransform={"capitalize"} mb={0.5}>
            {"Chris Hardy"}
          </Typography>
          <Typography
            variant={"body2"}
            component={"span"}
            display={"block"}
            textTransform={"capitalize"}
          >
            Active
          </Typography>
        </Div>
      </Div>
      <Stack direction={"row"} spacing={2} alignItems={"center"}>
        <Button variant="outlined" size="small">
          Edit Profile
        </Button>
        <JumboDdMenu />
      </Stack>
    </Stack>
  );
};

export { Profile2Header };
