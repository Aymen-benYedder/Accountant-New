import {
  JointScatterChart,
  MultipleYAxesScatterChart,
  SimpleScatterChart,
  ThreeDimensionalScatterChart,
} from "@app/_components/charts/scatter";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTranslation } from "react-i18next";

const ScatterChartPage = () => {
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
      <Typography variant={"h1"} mb={3}>
        {t("modules.title.scatterChart")}
      </Typography>
      <Grid container spacing={3.75}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <SimpleScatterChart />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <JointScatterChart />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <ThreeDimensionalScatterChart />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <MultipleYAxesScatterChart />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ScatterChartPage;
