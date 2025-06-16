import React, { useState } from "react";
// Temporarily disabled react-big-calendar to fix build errors
/*
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
import { calendarData, cultures } from "../../data";
*/

import { JumboCard } from "@jumbo/components";
import { MenuItem, Select } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { Div } from "@jumbo/shared";

// Temporarily disabled
// const { events } = calendarData;
// const localizer = momentLocalizer(moment);

const CultureCalendar = () => {
  const [culture, setCulture] = useState("en");
  // Temporarily disabled react-big-calendar to fix build errors
  /*
  const [viewOption, setViewOption] = React.useState<View>(Views.WEEK);
  */
  
  return (
    <JumboCard
      title={
        <FormControl
          variant="standard"
          sx={{ minWidth: 150, pb: 0, "& .MuiInput-underline:before": { border: 0 } }}
        >
          <Select
            value={culture}
            onChange={(e) => setCulture(e.target.value)}
            sx={{
              fontSize: "1.25rem",
              fontWeight: "500",
              color: "text.primary",
              "& > div": { py: 0 },
            }}
          >
            {/* Temporarily disabled cultures
            {cultures.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
            */}
            <MenuItem value="en">English</MenuItem>
          </Select>
        </FormControl>
      }
    >
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
        }}
      >
        Culture Calendar component temporarily disabled
      </Div>
    </JumboCard>
  );
};

export { CultureCalendar };
