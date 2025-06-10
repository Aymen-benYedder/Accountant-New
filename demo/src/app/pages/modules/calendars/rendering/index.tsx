import { CalendarWrapper } from "@app/_components/calendars/components/CalendarWrapper";
import { RenderingCalendar } from "@app/_components/calendars/components/RenderingCalendar";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { JumboCard } from "@jumbo/components/JumboCard";
import { Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function RenderingCalendarPage() {
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
        {t("modules.title.renderingCalendar")}
      </Typography>

      <JumboCard contentWrapper>
        <CalendarWrapper>
          <RenderingCalendar />
        </CalendarWrapper>
      </JumboCard>
    </Container>
  );
}
