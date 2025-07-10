import {
  ConnectNullLineChart,
  CustomizedDotLineChart,
  DashedLineChart,
  ReferenceLineChart,
  SimpleLineChart,
  SynchronizedLineChart,
  VerticalLineChart,
  XAxisPaddingLineChart,
} from "@app/_components/charts/line";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { Container, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const LineChartPage = () => {
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
        {t("modules.title.lineChart")}
      </Typography>
      <Stack spacing={3}>
        <SimpleLineChart />
        <VerticalLineChart />
        <CustomizedDotLineChart />
        <DashedLineChart />
        <ReferenceLineChart />
        <XAxisPaddingLineChart />
        <ConnectNullLineChart />
        <SynchronizedLineChart />
      </Stack>
    </Container>
  );
};

export default LineChartPage;
