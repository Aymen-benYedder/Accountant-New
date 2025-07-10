import { Container, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";
import { Div } from "@jumbo/shared";
import { JumboScrollbar } from "@jumbo/components";
import {
  InterestTopics,
  SocialActivity,
  SocialChat,
  SocialCommunity,
  SocialFriends,
  SocialPhotos,
  SocialProfile,
} from "@app/_components/user/social-wall";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";

const SocialWallApp = () => {
  const { theme } = useJumboTheme();
  const lg = useMediaQuery(theme.breakpoints.down("lg"));
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
      <Div
        sx={{
          mx: -1,
        }}
      >
        <Grid container spacing={1}>
          <Grid
            size={{ xs: 12, md: 6, lg: 3 }}
            sx={{
              order: { xs: 2, lg: 1 },
              minHeight: { lg: 400 },
              height: { lg: "calc(100vh - 216px)" },
            }}
          >
            <JumboScrollbar
              autoHide
              autoHideDuration={200}
              autoHideTimeout={500}
              disable={!!lg}
            >
              <Div sx={{ px: 2 }}>
                <SocialProfile />
                <InterestTopics />
                <SocialFriends />
                <SocialPhotos />
              </Div>
            </JumboScrollbar>
          </Grid>
          <Grid
            size={{ xs: 12, lg: 6 }}
            sx={{
              order: { xs: 1, lg: 2 },
              minHeight: { lg: 400 },
              height: { lg: "calc(100vh - 216px)" },
            }}
          >
            <JumboScrollbar
              autoHide
              autoHideDuration={200}
              autoHideTimeout={500}
              disable={lg}
            >
              <SocialChat />
            </JumboScrollbar>
          </Grid>
          <Grid
            size={{ xs: 12, md: 6, lg: 3 }}
            sx={{
              order: 3,
              minHeight: { lg: 400 },
              height: { lg: "calc(100vh - 216px)" },
            }}
          >
            <JumboScrollbar
              autoHide
              autoHideDuration={200}
              autoHideTimeout={500}
              disable={lg}
            >
              <Div sx={{ px: 2 }}>
                <SocialCommunity />
                <SocialActivity />
              </Div>
            </JumboScrollbar>
          </Grid>
        </Grid>
      </Div>
    </Container>
  );
};

export default SocialWallApp;
