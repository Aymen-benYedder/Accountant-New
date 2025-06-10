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
import { calendarData } from "../../data";
const { events } = calendarData;

const localizer = momentLocalizer(moment);

const PopupCalendar = () => {
  const [date, setDate] = React.useState(new Date(currentYear, 1, 15));
  const [viewOption, setViewOption] = React.useState<View>(Views.MONTH);

  return (
    <Calendar
      localizer={localizer}
      events={events}
      step={60}
      defaultDate={new Date(currentYear, 3, 1)}
      style={{ height: 600 }}
      popup
      culture={"en"}
      view={viewOption}
      onView={(option) => setViewOption(option)}
      onNavigate={(newDate: Date) => setDate(newDate)}
      date={date}
    />
  );
};

export { PopupCalendar };
