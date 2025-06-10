import { currentYear } from "@app/_utilities/constants/data";
import moment from "moment";
import "moment/locale/ar";
import "moment/locale/en-gb";
import "moment/locale/en-in";
import "moment/locale/es";
import "moment/locale/fr";
import React from "react";
import {
  Calendar,
  Views,
  momentLocalizer,
  type View,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { events } from "../../data";
const localizer = momentLocalizer(moment);

// interface ViewType {
//   [key: string]: boolean;
// }
const BasicCalendar = () => {
  const [date, setDate] = React.useState(new Date(currentYear, 1, 15));
  const [viewOption, setViewOption] = React.useState<View>(Views.MONTH);
  const { views } = React.useMemo(
    () => ({
      views: {
        month: true,
        week: true,
      },
    }),
    []
  );
  return (
    <Calendar
      date={date}
      localizer={localizer}
      events={events}
      style={{ height: 600 }}
      culture={"en"}
      view={viewOption}
      views={views}
      onView={(option: any) => setViewOption(option)}
      onNavigate={(newDate: Date) => setDate(newDate)}
    />
  );
};

export { BasicCalendar };
