import {
  Profile4FilterTabs,
  Profile4Header,
  profileMediaData,
  ProfileMediaItem,
} from "@app/_components/user/profile-4";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid2";

const ProfilePage4 = () => {
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
      <Profile4Header />
      <Profile4FilterTabs />

      <Grid container spacing={4} sx={{ mb: 4 }}>
        {profileMediaData?.map((profile, index) => (
          <ProfileMediaItem profile={profile} key={index} />
        ))}
      </Grid>
    </Container>
  );
};

export default ProfilePage4;
