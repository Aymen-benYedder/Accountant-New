import { PricingPlan } from "@app/_components/extraPages/PricingPlan";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
export default function PricingPlanPage() {
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
      <Typography variant={"h2"} mb={4}>
        {t("extraPages.title.pricePlan")}
      </Typography>
      <PricingPlan />
    </Container>
  );
}
