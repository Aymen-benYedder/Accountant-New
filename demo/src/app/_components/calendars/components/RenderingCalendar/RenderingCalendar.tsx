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
import "react-big-calendar/lib/css/react-big-calendar.css";
import { EventProps, calendarData } from "../../data";
const { events } = calendarData;
const localizer = momentLocalizer(moment);

const Event = ({ event }: { event: EventProps }) => {
  return (
    <span>
      <strong>{event.title}</strong>
      {event.desc && ":  " + event.desc}
    </span>
  );
};

const EventAgenda = ({ event }: { event: EventProps }) => {
  return (
    <span>
      <em style={{ color: "magenta" }}>{event.title}</em>
      <p>{event.desc}</p>
    </span>
  );
};

const customDayPropGetter = (date: any) => {
  if (date.getDate() === 7 || date.getDate() === 15)
    return {
      className: "special-day",
      style: {
        border: "solid 3px " + (date.getDate() === 7 ? "#faa" : "#afa"),
      },
    };
  else return {};
};
*/

const RenderingCalendar = () => {
  // Temporarily disabled react-big-calendar to fix build errors
  /*
  const [date, setDate] = React.useState(new Date(currentYear, 1, 15));
  const [viewOption, setViewOption] = React.useState<View>(Views.MONTH);
  const { components, defaultDate } = React.useMemo(
    () => ({
      components: {
        agenda: {
          event: EventAgenda,
        },
        event: Event,
      },
      defaultDate: new Date(2015, 3, 7),
    }),
    []
  );
  return (
    <Calendar
      localizer={localizer}
      events={events}
      // defaultDate={new Date(currentYear, 3, 1)}
      style={{ height: 600 }}
      components={components}
      defaultDate={defaultDate}
      defaultView={Views.AGENDA}
      dayPropGetter={customDayPropGetter}
      culture={"en"}
      view={viewOption}
      onView={(option) => setViewOption(option)}
      onNavigate={(newDate: Date) => setDate(newDate)}
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
      Rendering Calendar component temporarily disabled
    </Div>
  );
};

export { RenderingCalendar };
