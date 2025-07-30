import { FeaturedCard1 } from "@app/_components/cards";
import { Orders } from "@app/_components/widgets/Orders";
import { SalesOverview } from "@app/_components/widgets/SalesOverview";
import { UserSummary } from "@app/_components/widgets/UserSummary";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { EmojiObjectsOutlined, FolderOpen } from "@mui/icons-material";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTranslation } from "react-i18next";

import React from "react";

// Simple error boundary for MiscPage
class MiscErrorBoundary extends React.Component<{ children: React.ReactNode }, { error: any }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { error };
  }
  componentDidCatch(error: any, errorInfo: any) {
    // Optionally report error here
    // eslint-disable-next-line no-console
    console.error("MiscPage error boundary:", error, errorInfo);
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 48, color: "red", background: "#fff0f0" }}>
          <b>MiscPage error:</b> {this.state.error.message || String(this.state.error)}
        </div>
      );
    }
    return this.props.children;
  }
}

export default function MiscPage() {
  // DEBUG: This should always log when /dashboards/misc page mounts!
  // eslint-disable-next-line no-console
  console.log('MiscPage MOUNTED!');
  const { t } = useTranslation();
  return (
    <MiscErrorBoundary>
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
        <Grid container spacing={3.75}>
          <Grid size={{ xs: 12, lg: 7 }}>
            <SalesOverview title={t("widgets.title.salesOverview")} />
          </Grid>
          <Grid size={{ xs: 12, lg: 2 }}>
            <Grid container spacing={3.75}>
              <Grid size={{ xs: 12, sm: 6, lg: 12 }}>
                <FeaturedCard1
                  title={"250"}
                  subheader="Docs"
                  icon={<FolderOpen sx={{ fontSize: 36 }} />}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, lg: 12 }}>
              <FeaturedCard1
                title={"23"}
                subheader="Ideas"
                icon={<EmojiObjectsOutlined sx={{ fontSize: 42 }} />}
                bgcolor={["135deg", "#FBC79A", "#D73E68"]}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Grid container spacing={3.75}>
            <Grid size={{ xs: 12, sm: 6, lg: 12 }}>
              <Orders title={t("widgets.title.orders")} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 12 }}>
              <UserSummary
                title={t("widgets.title.userSummary")}
                subheader={t("widgets.subheader.userSummary")}
              />
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid size={{ xs: 12, lg: 8 }}>
          <PopularProducts
            title={t("widgets.title.popularProducts")}
            subheader={t("widgets.subheader.popularProducts")}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <ProjectsListCard title={t("widgets.title.projectsList")} />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <ProductImage height={370} />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <CafeStore1 />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <ExplorePlaceCard height={450} />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <LatestNotifications title={t("widgets.title.latestAlerts")} />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 5 }}>
          <DailyFeed title={t("widgets.title.dailyFeed")} />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <ScheduleCard />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <UserProfileCard />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <NewConnections title={t("widgets.title.newConnections")} />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 5 }}>
          <RecentActivities title={t("widgets.title.recentActivities")} />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <LastMonthSales subheader={t("widgets.subheader.latestMonthSales")} />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <OnlineSignupsFilled
            subheader={t("widgets.subheader.onlineSignups")}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <NewVisitorsThisMonth
            subheader={t("widgets.subheader.newVisitors")}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <TotalRevenueThisYear
            subheader={t("widgets.subheader.totalRevenueYear")}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <UpgradePlan />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 6 }}>
          <SalesReport1 title={t("widgets.title.salesReport1")} />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <AppUsers
            title={t("widgets.title.appUsers")}
            subheader={t("widgets.subheader.appUsers")}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <WordOfTheDay title={t("widgets.title.wordOfTheDay")} />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <OurOffice1 title={t("widgets.title.ourOffice1")} />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 5 }}>
          <UserProfileAction height={282} />
        </Grid>

     
        <Grid size={12}>
          <MapProvider>
            <MarkerClustererMap />
          </MapProvider>
        </Grid> */}
      </Grid>
      </Container>
    </MiscErrorBoundary>
  );
}
