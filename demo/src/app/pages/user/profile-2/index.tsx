import {
  LicenseCertificate,
  ProfileWorkHistory,
} from "@app/_components/common";
import { experiencesData } from "@app/_components/common/data";
import {
  About,
  BasicInformation,
  Profile2Header,
  Profile2Sidebar,
  Profile2Skill,
} from "@app/_components/user/profile-2";

import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { ContentLayout } from "@app/_layouts";
import { JumboCard, JumboDdMenu } from "@jumbo/components";
import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";
import { Container } from "@mui/material";
import React from "react";

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
        sx: {
          flexDirection: { xs: "column", lg: "row" },
        },
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
const ProfilePage2 = () => {
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
      {/** Content Part */}
      <ContentLayout
        rightSidebar={<Profile2Sidebar />}
        header={
          <>
            <Profile2Header />
            <BasicInformation />
          </>
        }
        {...profileLayoutConfig}
      >
        <JumboCard
          title={"About"}
          subheader={"Education, Work and More"}
          action={<JumboDdMenu />}
          contentWrapper
          contentSx={{ pt: 0 }}
          sx={{ mb: 3.75 }}
        >
          <About />
        </JumboCard>
        {/** Profile Work History Component */}
        <JumboCard
          title={"Experience"}
          subheader={"Your work experience and achievements"}
          action={<JumboDdMenu />}
          contentWrapper
          contentSx={{ pt: 0 }}
          sx={{ mb: 3.75 }}
        >
          <ProfileWorkHistory data={experiencesData} />
        </JumboCard>

        <JumboCard
          title={"Skill"}
          action={<JumboDdMenu />}
          contentWrapper
          contentSx={{ pt: 0 }}
          sx={{ mb: 3.75 }}
        >
          <Profile2Skill />
        </JumboCard>

        {/** License & Certificate */}
        <JumboCard
          title={"License & Certificates"}
          subheader={"Your work experience and achievements"}
          action={<JumboDdMenu />}
          contentWrapper
          contentSx={{ pt: 0 }}
          sx={{ mb: 3.75 }}
        >
          <LicenseCertificate />
        </JumboCard>
      </ContentLayout>
    </Container>
  );
};
export default ProfilePage2;
