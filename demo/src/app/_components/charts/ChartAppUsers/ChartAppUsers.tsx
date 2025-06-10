import styled from "@emotion/styled";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import List from "@mui/material/List";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
  { name: "Android", value: 400 },
  { name: "iOS", value: 300 },
  { name: "Web", value: 300 },
];
const COLORS = ["#7352C7", "#E73145", "#3BD2A2"];

const ListItemInline = styled(ListItem)(() => ({
  width: "auto",
  display: "inline-flex",
  padding: "0 5px",
}));

const ChartAppUsers = () => {
  return (
    <React.Fragment>
      <ResponsiveContainer width="100%" height={140}>
        <PieChart>
          <Pie
            data={data}
            cx={"50%"}
            cy={"50%"}
            innerRadius={40}
            outerRadius={60}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map(({}, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <List
        disablePadding
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
          minWidth: 0,
          mt: 1,
        }}
      >
        <ListItemInline>
          <ListItemIcon sx={{ minWidth: 16 }}>
            <FiberManualRecordIcon
              sx={{ color: COLORS[0], fontSize: "14px" }}
            />
          </ListItemIcon>
          <ListItemText primary="Android" />
        </ListItemInline>
        <ListItemInline>
          <ListItemIcon sx={{ minWidth: 16 }}>
            <FiberManualRecordIcon
              sx={{ color: COLORS[1], fontSize: "14px" }}
            />
          </ListItemIcon>
          <ListItemText primary="iOS" />
        </ListItemInline>
        <ListItemInline>
          <ListItemIcon sx={{ minWidth: 16 }}>
            <FiberManualRecordIcon
              sx={{ color: COLORS[2], fontSize: "14px" }}
            />
          </ListItemIcon>
          <ListItemText primary="Web" />
        </ListItemInline>
      </List>
    </React.Fragment>
  );
};

export { ChartAppUsers };
