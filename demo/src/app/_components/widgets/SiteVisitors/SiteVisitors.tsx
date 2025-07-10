import { JumboCard } from "@jumbo/components";
import Grid from "@mui/material/Grid2";
import { CountriesList, VisitorsOnMap } from "./components";
import { countryList } from "./data";
interface SiteVisitorsProps {
  title: React.ReactNode;
  subheader: React.ReactNode;
}
const SiteVisitors = ({ title, subheader }: SiteVisitorsProps) => {
  return (
    <JumboCard
      title={title}
      subheader={subheader}
      contentSx={{ p: 3 }}
      contentWrapper
    >
      <Grid container spacing={3.75}>
        <Grid size={{ xs: 12, md: 5 }}>
          <CountriesList countries={countryList} />
        </Grid>
        <Grid size={{ xs: 12, md: 7 }}>
          <VisitorsOnMap />
        </Grid>
      </Grid>
    </JumboCard>
  );
};

export { SiteVisitors };
