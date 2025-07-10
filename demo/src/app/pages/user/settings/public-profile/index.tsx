import {
  LicenseCertificate,
  ProfileSkills,
  ProfileWorkHistory,
} from "@app/_components/common";
import {
  experiencesData,
  profileSkillsData,
} from "@app/_components/common/data";
import { SettingHeader } from "@app/_components/user/settings";
import { ASSET_AVATARS } from "@app/_utilities/constants/paths";
import { JumboCard, JumboDdMenu } from "@jumbo/components";
import { Div } from "@jumbo/shared";
import {
  Avatar,
  Badge,
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

const PublicProfile = () => {
  return (
    <>
      <SettingHeader title={"Public Profile"} />
      {/** User profile information */}
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={4}
        sx={{ px: 2, mt: 1 }}
      >
        <Div
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Badge
            overlap="circular"
            variant="dot"
            sx={{
              "& .MuiBadge-badge": {
                height: 10,
                width: 10,
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
              sx={{ borderRadius: 3, width: 56, height: 56 }}
              src={`${ASSET_AVATARS}/avatar9.jpg`}
            />
          </Badge>
          <Div sx={{ flex: "1 1 auto", ml: 2 }}>
            <Typography
              variant={"body1"}
              fontWeight={500}
              textTransform={"capitalize"}
              sx={{ fontSize: 18 }}
            >
              {"Chris Hardy"}
            </Typography>
            <Typography
              variant={"body2"}
              component={"span"}
              lineHeight={1.5}
              textTransform={"capitalize"}
            >
              Active
            </Typography>
          </Div>
        </Div>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <IconButton color="primary" size="small" sx={{ border: 1 }}>
            <RiPencilLine />
          </IconButton>
          <JumboDdMenu />
        </Stack>
      </Stack>

      {/** Profile Part */}
      <JumboCard
        title={"Profiles"}
        contentWrapper
        action={
          <Button
            size="small"
            sx={{ letterSpacing: 1.5 }}
            startIcon={<RiAddLine />}
          >
            Add Skill Profile
          </Button>
        }
        contentSx={{ pt: 0 }}
        sx={{ mb: 3.75 }}
      >
        <ProfileSkills data={profileSkillsData} />
      </JumboCard>

      {/** Work History Part */}
      <JumboCard
        title={"Work History"}
        contentWrapper
        action={
          <Button
            size="small"
            sx={{ letterSpacing: 1.5 }}
            startIcon={<RiAddLine />}
          >
            Add Work History
          </Button>
        }
        sx={{ mb: 3.75 }}
        contentSx={{ pt: 0 }}
      >
        <ProfileWorkHistory data={experiencesData} action />
      </JumboCard>

      {/** Licence & Certificate */}
      <JumboCard
        title={"License & Certificates"}
        contentWrapper
        action={
          <Button
            size="small"
            sx={{ letterSpacing: 1.5 }}
            startIcon={<RiAddLine />}
          >
            Add License/Certificate
          </Button>
        }
        sx={{ mb: 3.75 }}
        contentSx={{ pt: 0 }}
      >
        <LicenseCertificate action />
      </JumboCard>
    </>
  );
};

export default PublicProfile;
