import { JumboCard } from "@jumbo/components";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { ChartYearlyProfit } from "./components";

const YearlyProfileReport = ({ title }: { title: React.ReactNode }) => {
  return (
    <JumboCard
      title={
        <Typography variant={"h4"} mb={0}>
          {title}
        </Typography>
      }
      contentWrapper
      contentSx={{ pt: 0 }}
    >
      <Grid container columnSpacing={2}>
        <Grid size={8}>
          <ChartYearlyProfit />
        </Grid>
        <Grid size={4} alignSelf={"center"}>
          <Typography variant={"h2"}>$685k+</Typography>
          <Typography
            variant={"body1"}
            color={"text.secondary"}
            sx={{ whiteSpace: "nowrap" }}
          >
            Past 9 months
          </Typography>
        </Grid>
      </Grid>
    </JumboCard>
  );
};

export { YearlyProfileReport };
