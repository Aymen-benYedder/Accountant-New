import {
  CustomContentTreemapChart,
  SimpleTreemapChart,
} from "@app/_components/charts/treemap";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTranslation } from "react-i18next";

const TreeMapChartPage = () => {
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
        {t("modules.title.treemapChart")}
      </Typography>
      <Grid container spacing={3.75}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <SimpleTreemapChart />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <CustomContentTreemapChart />
        </Grid>
      </Grid>
    </Container>
  );
};

export default TreeMapChartPage;
