import { ASSET_AVATARS, ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { JumboBackdrop, JumboCard } from "@jumbo/components";
import { Div } from "@jumbo/shared";
import { MoreHoriz } from "@mui/icons-material";
import {
  Avatar,
  CardContent,
  CardHeader,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { ProfileStats } from "./components";

function UserProfileCard1() {
  return (
    <JumboCard>
      <Div
        sx={{
          height: 256,
          position: "relative",
          background: `url(${ASSET_IMAGES}/event2.jpg) center center / cover no-repeat`,
        }}
      >
        <JumboBackdrop />
        <CardHeader
          action={
            <IconButton sx={{ color: "common.white" }}>
              <MoreHoriz />
            </IconButton>
          }
        />
        <Div sx={{ zIndex: 2, position: "relative" }}>
          <Stack
            alignItems={"center"}
            sx={{ p: (theme) => theme.spacing(0, 2), mt: -2 }}
          >
            <Avatar
              sx={{ width: 72, height: 72, mb: 2 }}
              alt={"Chelsea Ray"}
              src={`${ASSET_AVATARS}/avatar5.jpg`}
            />
            <Typography variant={"h5"} color={"common.white"}>
              Chelsea Ray
            </Typography>
            <Typography variant={"h6"} color={"common.white"}>
              @sofia.halfway
            </Typography>
          </Stack>
          <Div sx={{ width: "75%", m: "16px auto 0" }}>
            <LinearProgress
              variant={"determinate"}
              color={"success"}
              value={80}
              sx={{
                borderRadius: 4,
                height: 5,
                backgroundColor: "#E9EEEF",
              }}
            />
          </Div>
        </Div>
      </Div>
      <ProfileStats
        data={[
          { count: 457, label: "Followers" },
          { count: 689, label: "Friends" },
          { count: 283, label: "Following" },
        ]}
      />
      <CardContent>
        <Typography variant={"h4"}>About Chelsea</Typography>
        <Typography>
          Chelsea is an Australian actress. She was born on August 11, 1983. The
          actress gained super stardom with the role of Amily.
        </Typography>
      </CardContent>
    </JumboCard>
  );
}

export { UserProfileCard1 };
