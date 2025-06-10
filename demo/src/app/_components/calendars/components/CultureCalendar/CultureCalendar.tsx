import React, { useState } from "react";
import {
  Calendar,
  Views,
  momentLocalizer,
  type View,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import moment from "moment";
import "moment/locale/ar";
import "moment/locale/en-gb";
import "moment/locale/en-in";
import "moment/locale/es";
import "moment/locale/fr";

import { currentYear } from "@app/_utilities/constants/data";
import { JumboCard } from "@jumbo/components";
import { MenuItem, Select } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { calendarData, cultures } from "../../data";
import { CalendarWrapper } from "../CalendarWrapper";

const { events } = calendarData;

const localizer = momentLocalizer(moment);

const CultureCalendar = () => {
  const [culture, setCulture] = useState("en");
  const [date, setDate] = React.useState(new Date(currentYear, 1, 15));
  const [viewOption, setViewOption] = React.useState<View>(Views.MONTH);
  return (
    <React.Fragment>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <Select
          size={"small"}
          onChange={(e) => setCulture(e.target.value)}
          value={culture}
        >
          {cultures.map((item, index) => {
            return (
              <MenuItem value={item.id} key={`${item.id}${index}`}>
                {item.title}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <JumboCard contentWrapper contentSx={{ bgcolor: "background.paper" }}>
        <CalendarWrapper>
          <Calendar
            localizer={localizer}
            events={events}
            step={60}
            culture={culture}
            defaultDate={new Date(currentYear, 3, 1)}
            style={{ height: 600 }}
            view={viewOption}
            onView={(option) => setViewOption(option)}
            onNavigate={(newDate: Date) => setDate(newDate)}
            date={date}
          />
        </CalendarWrapper>
      </JumboCard>
    </React.Fragment>
  );
};

export { CultureCalendar };
