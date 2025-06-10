import moment from "moment";
import React from "react";
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

const TimeslotCalendar = () => {
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
      onView={(option) => setViewOption(option)}
      onNavigate={(newDate: Date) => setDate(newDate)}
      date={date}
    />
  );
};

export { TimeslotCalendar };
