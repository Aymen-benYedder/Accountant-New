import { currentYear } from "@app/_utilities/constants/data";
import moment from "moment";
import "moment/locale/ar";
import "moment/locale/en-gb";
import "moment/locale/en-in";
import "moment/locale/es";
import "moment/locale/fr";
import React from "react";
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
      style: {
        border: "solid 3px " + (date.getDate() === 7 ? "#faa" : "#afa"),
      },
    };
  else return {};
};

const RenderingCalendar = () => {
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
};

export { RenderingCalendar };
