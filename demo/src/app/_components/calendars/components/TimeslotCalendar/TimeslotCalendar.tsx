import { Div } from "@jumbo/shared";
import React from "react";

// Temporarily disabled react-big-calendar to fix build errors
/*
import moment from "moment";
import { Calendar, View, Views, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { calendarData } from "../../data";
import { currentYear } from "@app/_utilities/constants/data";
import "moment/locale/ar";
import "moment/locale/en-gb";
import "moment/locale/en-in";
import "moment/locale/es";
import "moment/locale/fr";

const { events } = calendarData;
const localizer = momentLocalizer(moment);
*/

const TimeslotCalendar = () => {
  // Temporarily disabled react-big-calendar to fix build errors
  /*
  const [date, setDate] = React.useState(new Date(currentYear, 1, 15));
  const [viewOption, setViewOption] = React.useState<View>(Views.WEEK);
  return (
    <Calendar
      localizer={localizer}
      events={events}
      step={60}
      timeslots={8}
      culture={"en"}
      defaultView={Views.WEEK}
      defaultDate={new Date(currentYear, 3, 1)}
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
      Calendar component temporarily disabled
    </Div>
  );
};

export { TimeslotCalendar };
