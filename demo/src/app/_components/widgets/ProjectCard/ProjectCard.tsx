import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { JumboCard } from "@jumbo/components";
import { JumboDdMenu } from "@jumbo/components/JumboDdMenu";
import { Div } from "@jumbo/shared";
import {
  Avatar,
  AvatarGroup,
  Button,
  LinearProgress,
  Typography,
} from "@mui/material";
import { projectMenu, projectUsers } from "./data";

export function ProjectCard({ title }: { title: string }) {
  return (
    <JumboCard
      title={title}
      action={<JumboDdMenu menuItems={projectMenu} />}
      sx={{
        "& .MuiCardHeader-action": {
          my: "-4px",
        },
      }}
      contentWrapper
    >
      <Div
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <Div sx={{ display: "flex", mb: 2 }}>
          <img
            width={68}
            height={68}
            src={`${ASSET_IMAGES}/dashboard/icon-german.png`}
            alt={""}
          />
        </Div>
        <Typography variant={"h3"} mb={2}>
          Cling Eagle App
        </Typography>
        <Div sx={{ mb: 2 }}>
          <AvatarGroup max={5}>
            {projectUsers.map((item, index) => (
              <Avatar src={item.profilePic} key={index} />
            ))}
          </AvatarGroup>
        </Div>
        <Div
          sx={{
            display: "flex",
            minWidth: 0,
            flexDirection: "column",
            alignItems: "center",
            alignSelf: "stretch",
          }}
        >
          <LinearProgress
            variant={"determinate"}
            color={"success"}
            value={70}
            sx={{
              width: "85%",
              borderRadius: 4,
              height: 5,
              mb: 1,
              backgroundColor: "#E9EEEF",
            }}
          />
          <Typography variant={"body1"} color={"text.secondary"} mb={3}>
            26/30 tasks completed
          </Typography>
        </Div>
        <Button variant={"contained"} sx={{ mb: 1 }}>
          Access dashboard
        </Button>
      </Div>
    </JumboCard>
  );
}
