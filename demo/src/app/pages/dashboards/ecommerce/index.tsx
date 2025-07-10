import { AppUsers } from "@app/_components/widgets/AppUsers";
import { LastMonthSales } from "@app/_components/widgets/LastMonthSales";
import { LatestNotifications } from "@app/_components/widgets/LatestNotifications";
import { MarketingCampaign } from "@app/_components/widgets/MarketingCampaign";
import { NewVisitorsThisMonth } from "@app/_components/widgets/NewVisitorsThisMonth";
import { OnlineSignupsFilled } from "@app/_components/widgets/OnlineSignupsFilled";
import { OnlineVisitors } from "@app/_components/widgets/OnlineVisitors";
import { OrdersReport } from "@app/_components/widgets/OrdersReport";
import { PopularProducts } from "@app/_components/widgets/PopularProducts";
import { SalesReport } from "@app/_components/widgets/SalesReport";
import { SalesStatistics } from "@app/_components/widgets/SalesStatistics";
import { SiteVisitors } from "@app/_components/widgets/SiteVisitors";
import { TotalRevenueThisYear } from "@app/_components/widgets/TotalRevenueThisYear";
import { WebsiteTraffic } from "@app/_components/widgets/WebsiteTraffic";
import { YearlyProfileReport } from "@app/_components/widgets/YearlyProfileReport";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTranslation } from "react-i18next";

export default function EcommercePage() {
  const { t } = useTranslation();
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
      <Grid container spacing={3.75}>
        <Grid size={12}>
          <SalesStatistics title={t("widgets.title.salesStatistics")} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SalesReport title={t("widgets.title.salesReports")} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <YearlyProfileReport
            title={t("widgets.title.yearlyProfileReports")}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <AppUsers
            title={t("widgets.title.appUsers")}
            subheader={t("widgets.subheader.appUsers")}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <OnlineVisitors
            title={t("widgets.title.onlineVisitors")}
            subheader={t("widgets.subheader.onlineVisitors")}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <WebsiteTraffic title={t("widgets.title.websiteTraffics")} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <OrdersReport
            title={t("widgets.title.orderReports")}
            subheader={t("widgets.subheader.orderReports")}
            subTitle={null}
            chartHeight={183}
          />
        </Grid>
        <Grid size={12}>
          <PopularProducts
            title={t("widgets.title.popularProducts")}
            subheader={t("widgets.subheader.popularProducts")}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <MarketingCampaign
            title={t("widgets.title.marketingCampaign")}
            subheader={t("widgets.subheader.marketingCampaign")}
            scrollHeight={428}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <LatestNotifications
            title={t("widgets.title.latestNotifications")}
            scrollHeight={387}
          />
        </Grid>
        <Grid size={12}>
          <SiteVisitors
            title={t("widgets.title.siteVisitors")}
            subheader={t("widgets.subheader.siteVisitors")}
          />
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
      </Grid>
    </Container>
  );
}
