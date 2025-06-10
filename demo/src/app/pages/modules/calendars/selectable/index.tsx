import { CalendarWrapper } from "@app/_components/calendars/components/CalendarWrapper";
import { SelectableCalendar } from "@app/_components/calendars/components/SelectableCalendar";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { JumboCard } from "@jumbo/components/JumboCard";
import { Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function SelectableCalendarPage() {
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
        {t("modules.title.selectableCalendar")}
      </Typography>
      <JumboCard contentWrapper>
        <CalendarWrapper>
          <SelectableCalendar />
        </CalendarWrapper>
      </JumboCard>
    </Container>
  );
}
