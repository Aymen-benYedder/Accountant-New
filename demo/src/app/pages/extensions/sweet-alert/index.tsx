import {
  AdvancedAlert,
  AlertsType,
  AnimationAlert,
  AutoCloseAlert,
  BasicAlert,
  CustomHtmlMessage,
  CustomPosition,
  DialogThreeButton,
  ErrorAlert,
  ImageWithMessage,
  SuccessAlert,
  TitleWithText,
  ToastAlerts,
} from "@app/_components/extensions/sweet-alerts";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTranslation } from "react-i18next";

export default function SweetAlertsPage() {
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
        {t("extensions.title.sweetAlerts")}
      </Typography>
      <Grid container spacing={3.75}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <BasicAlert />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <AnimationAlert />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <TitleWithText />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <DialogThreeButton />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <SuccessAlert />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <ErrorAlert />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <ImageWithMessage />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <CustomHtmlMessage />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <CustomPosition />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <AutoCloseAlert />
        </Grid>
        <Grid size={12}>
          <AdvancedAlert />
        </Grid>
        <Grid size={12}>
          <ToastAlerts />
        </Grid>
        <Grid size={12}>
          <AlertsType />
        </Grid>
      </Grid>
    </Container>
  );
}
