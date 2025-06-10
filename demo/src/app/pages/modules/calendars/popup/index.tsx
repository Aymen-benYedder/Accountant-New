import { CalendarWrapper } from "@app/_components/calendars/components/CalendarWrapper";
import { PopupCalendar } from "@app/_components/calendars/components/PopupCalendar";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { JumboCard } from "@jumbo/components/JumboCard";
import { Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function PopupCalendarPage() {
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
      <Typography variant={"h1"}>{t("modules.title.popupCalendar")}</Typography>
      <Typography variant={"h5"} color={"text.secondary"} mb={3}>
        {`Click the "+x more" link on any calendar day that cannot fit all the
        days events to see an inline popup of all the events.`}
      </Typography>
      <JumboCard contentWrapper>
        <CalendarWrapper>
          <PopupCalendar />
        </CalendarWrapper>
      </JumboCard>
    </Container>
  );
}
