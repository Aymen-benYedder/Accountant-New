import { Div } from "@jumbo/shared";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { membershipsChartData } from "../../data";
const MembershipPlanChart = () => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart
        data={membershipsChartData}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        barSize={10}
      >
        <Tooltip
          animationEasing={"ease-in-out"}
          content={({ active, payload }) => {
            return active ? (
              <Div sx={{ color: "common.white" }}>
                {payload?.map((row, index) => {
                  return (
                    <div
                      key={index}
                      className={index !== payload.length - 1 ? "mb-1" : ""}
                    >
                      <div
                        style={{
                          color: row.color,
                          fontSize: 10,
                          letterSpacing: 2,
                          textTransform: "uppercase",
                        }}
                      >
                        {row.name}
                      </div>
                      <div
                        style={{
                          color: row.color,
                        }}
                      >
                        {row.value}
                      </div>
                    </div>
                  );
                })}
              </Div>
            ) : null;
          }}
          wrapperStyle={{
            background: "rgba(255,255,255,0.9)",
            borderRadius: 4,
            padding: "5px 8px",
            fontWeight: 500,
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        />
        <XAxis dataKey="name" axisLine={false} />
        <Bar dataKey="Projects" stackId="a" fill="#003f5c" />
        <Bar dataKey="Downloads" stackId="a" fill="#00bfb3" />
        <Bar dataKey="Requests" stackId="a" fill="#ffa600" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export { MembershipPlanChart };
