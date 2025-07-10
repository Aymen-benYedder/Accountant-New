import { Div } from "@jumbo/shared";
import React from "react";

// Temporarily disabled react-big-calendar to fix build errors
const BasicCalendar = () => {
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

export { BasicCalendar };
