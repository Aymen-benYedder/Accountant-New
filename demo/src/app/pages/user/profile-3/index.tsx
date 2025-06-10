import {
  LicenseCertificate,
  ProfileSkills,
  ProfileWorkHistory,
} from "@app/_components/common";
import {
  experiencesData,
  profileSkillsData,
} from "@app/_components/common/data";
import {
  Profile3Header,
  Profile3Sidebar,
  UserAbout,
} from "@app/_components/user/profile-3";

import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { ContentLayout } from "@app/_layouts";
import { JumboCard } from "@jumbo/components";
import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";
import { Button, Container, IconButton } from "@mui/material";
import React from "react";
import { RiAddLine } from "react-icons/ri";

const useProfileLayout = () => {
  const { theme } = useJumboTheme();
  return React.useMemo(
    () => ({
      rightSidebarOptions: {
        sx: {
          display: "flex",
          flexShrink: 0,
          flexDirection: "column",
          width: { md: "auto", lg: 350 },
        },
      },
      wrapperOptions: {
        sx: { flexDirection: { xs: "column", lg: "row" } },
      },
      contentOptions: {
        sx: {
          p: { lg: 0, sm: 0, xs: 0 },
          mr: { lg: 3 },
        },
      },
      mainOptions: {
        sx: {
          minHeight: 0,
        },
      },
    }),
    [theme]
  );
};
const ProfilePage3 = () => {
  const profileLayoutConfig = useProfileLayout();
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: CONTAINER_MAX_WIDTH,
        display: "flex",
        minWidth: 0,
        flex: 1,
        flexDirection: "column",
      }}
      disableGutters
    >
      <ContentLayout
        rightSidebar={<Profile3Sidebar />}
        header={
          <>
            <Profile3Header />
            <UserAbout />
          </>
        }
        {...profileLayoutConfig}
      >
        {/** user profile skills */}
        <JumboCard
          title={"Profiles"}
          contentWrapper
          action={
            <Button size="small" startIcon={<RiAddLine />}>
              Add Skill Profile
            </Button>
          }
          sx={{ mb: 3.75 }}
          contentSx={{ pt: 0 }}
        >
          <ProfileSkills data={profileSkillsData} />
        </JumboCard>

        {/** Work History  */}
        <JumboCard
          title={"Work History"}
          contentWrapper
          action={
            <IconButton color="primary">
              <RiAddLine />
            </IconButton>
          }
          sx={{
            mb: 3.75,
            ".MuiCardHeader-action": {
              my: -0.5,
              mr: -1,
            },
          }}
          contentSx={{ pt: 0 }}
        >
          <ProfileWorkHistory data={experiencesData} />
        </JumboCard>

        {/** Licence & Certificate Part */}
        <JumboCard
          title={"License & Certificates"}
          contentWrapper
          action={
            <IconButton color="primary">
              <RiAddLine />
            </IconButton>
          }
          sx={{
            mb: 3.75,
            ".MuiCardHeader-action": {
              my: -0.5,
              mr: -1,
            },
          }}
          contentSx={{ pt: 0 }}
        >
          <LicenseCertificate />
        </JumboCard>
      </ContentLayout>
    </Container>
  );
};
export default ProfilePage3;
