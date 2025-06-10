import { JumboCard } from "@jumbo/components";
import { Div } from "@jumbo/shared";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { SalesReportChart } from "./component";

function SalesReport({ title }: { title: React.ReactNode }) {
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
        <Grid size={5} alignSelf={"center"}>
          <Typography variant={"h2"}>$685k+</Typography>
          <Typography
            variant={"body1"}
            color={"text.secondary"}
            sx={{ whiteSpace: "nowrap" }}
            mb={0}
          >
            Past 9 months
          </Typography>
        </Grid>
        <Grid size={7}>
          <Div sx={{ my: "-2px" }}>
            <SalesReportChart />
          </Div>
        </Grid>
      </Grid>
    </JumboCard>
  );
}

export { SalesReport };
