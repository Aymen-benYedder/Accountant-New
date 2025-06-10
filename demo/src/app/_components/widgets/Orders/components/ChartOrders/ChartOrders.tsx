import { Div } from "@jumbo/shared";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

function ChartOrders({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer height={76}>
      <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <XAxis dataKey="month" hide />
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
                          fontSize: 8,
                          letterSpacing: 2,
                          textTransform: "uppercase",
                        }}
                      >
                        {row?.name}
                      </div>
                      <div>{row.value} USD</div>
                    </div>
                  );
                })}
              </Div>
            ) : null;
          }}
          wrapperStyle={{
            background: "rgba(56,126,76,0.8)",
            borderRadius: 4,
            padding: "5px 8px",
            fontWeight: 500,
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
          cursor={false}
        />
        <defs>
          <linearGradient id="color4" x1="0" y1="0" x2="0" y2="1">
            <stop offset="3%" stopColor="#D1FFEC" />
            <stop offset="97%" stopColor="#ffffff" />
          </linearGradient>
        </defs>
        <Area
          dataKey="orders"
          type="monotone"
          stackId="1"
          strokeWidth={2}
          fillOpacity={0.7}
          stroke={"#159F65"}
          fill="url(#color4)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export { ChartOrders };
