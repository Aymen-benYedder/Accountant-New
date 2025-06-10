import {
  BiaxialBarChart,
  CustomShapeBarChart,
  MixBarChart,
  PositiveAndNegativeBarChart,
  StackedBarChart,
  StackedWithErrorBarChart,
  TinyBarChart,
} from "@app/_components/charts/bar";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { Container, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const BarChartPage = () => {
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
        {t("modules.title.barChart")}
      </Typography>
      <Stack spacing={3}>
        <TinyBarChart />
        <StackedBarChart />
        <StackedWithErrorBarChart />
        <MixBarChart />
        <CustomShapeBarChart />
        <PositiveAndNegativeBarChart />
        <BiaxialBarChart />
      </Stack>
    </Container>
  );
};

export default BarChartPage;
