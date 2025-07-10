import { Div } from "@jumbo/shared";
import React from "react";

// Temporarily disabled react-big-calendar to fix build errors
/*
import { currentYear } from "@app/_utilities/constants/data";
import moment from "moment";
import "moment/locale/ar";
import "moment/locale/en-gb";
import "moment/locale/en-in";
import "moment/locale/es";
import "moment/locale/fr";
import { Calendar, View, Views, momentLocalizer } from "react-big-calendar";
import { calendarData } from "../../data";
const { events } = calendarData;

const localizer = momentLocalizer(moment);
*/

const SelectableCalendar = () => {
  // Temporarily disabled react-big-calendar to fix build errors
  /*
  const [date, setDate] = React.useState(new Date(currentYear, 1, 15));
  const [viewOption, setViewOption] = React.useState<View>(Views.WEEK);
  return (
    <Calendar
      localizer={localizer}
      events={events}
      selectable
      defaultView={Views.WEEK}
      scrollToTime={new Date(1970, 1, 1, 6)}
      defaultDate={new Date(currentYear, 3, 1)}
      onSelectEvent={(event) => alert(event.title)}
      onSelectSlot={(slotInfo) =>
        alert(
          `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
            `\nend: ${slotInfo.end.toLocaleString()}` +
            `\naction: ${slotInfo.action}`
        )
      }
      culture={"en"}
      style={{ height: 600 }}
      view={viewOption}
      onView={setViewOption}
      onNavigate={setDate}
      date={date}
    />
  );
  */
  
  return (
    <Div
      sx={{
        width: "100%",
        height: "600px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'text.secondary',
        bgcolor: 'background.paper',
        borderRadius: 1,
        p: 2,
        textAlign: 'center',
      }}>
      Selectable Calendar component temporarily disabled
    </Div>
  );
};

export { SelectableCalendar };
