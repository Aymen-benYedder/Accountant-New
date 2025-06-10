import { Div } from "@jumbo/shared";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { dealsClosedData } from "./data";

const ChartDealsClosed = () => {
  return (
    <ResponsiveContainer width="100%" height={134}>
      <BarChart
        data={dealsClosedData}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
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
                          fontSize: 8,
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

        <XAxis dataKey="month" hide />
        <Bar dataKey="deals" stackId="a" fill="#1E88E5" barSize={8} />
        <Bar dataKey="queries" stackId="a" fill="#E91E63" barSize={8} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export { ChartDealsClosed };
