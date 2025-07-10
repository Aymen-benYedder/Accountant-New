import { CultureCalendar } from "@app/_components/calendars/components/CultureCalendar";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function CultureCalendarPage() {
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
        {t("modules.title.cultureCalendar")}
      </Typography>
      <Typography variant={"h5"} color={"text.primary"}>
        Select a culture
      </Typography>
      <CultureCalendar />
    </Container>
  );
}
