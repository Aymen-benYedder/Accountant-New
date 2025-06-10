import { JumboCard } from "@jumbo/components";
import Grid from "@mui/material/Grid2";
import { VisitorsOnMap } from "../SiteVisitors/components";
import { RevenueInfo, RevenueProgress } from "./components";

const RevenueOverview = ({ title }: { title: React.ReactNode }) => {
  return (
    <JumboCard title={title}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <RevenueProgress />
        </Grid>
        <Grid
          size={{ xs: 12, sm: 6, lg: 3 }}
          sx={{
            order: { lg: 3 },
            mb: { lg: -3 },
            mt: { sm: -7 },
          }}
        >
          <RevenueInfo />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <VisitorsOnMap />
        </Grid>
      </Grid>
    </JumboCard>
  );
};

export { RevenueOverview };
