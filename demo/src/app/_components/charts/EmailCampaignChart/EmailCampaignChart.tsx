import { Div } from "@jumbo/shared";
import { Box } from "@mui/material";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { totalEmails } from "./data";

type EmailCampaignChartProps = {
  color?: string;
  shadowColor?: string;
};

const EmailCampaignChart = ({
  color,
  shadowColor,
}: EmailCampaignChartProps) => {
  return (
    <ResponsiveContainer height={80}>
      <LineChart data={totalEmails} className={"mx-auto"}>
        <defs>
          <filter id="shadowMailSent" height="300%">
            <feDropShadow
              dx="0"
              dy="3"
              stdDeviation="8"
              floodColor={shadowColor ? shadowColor : "#666666"}
            />
          </filter>
        </defs>
        <Tooltip
          labelStyle={{ color: "black" }}
          cursor={false}
          content={({ active, label, payload }) => {
            return active ? (
              <Div sx={{ color: "common.white" }}>
                <div>Month: {label}</div>
                {payload?.map((row, index) => (
                  <Box key={index} mt={1}>
                    {row?.name} - {row.value}
                  </Box>
                ))}
              </Div>
            ) : null;
          }}
          wrapperStyle={{
            background: color ? color : "rgba(0,0,0,.8)",
            padding: "5px 8px",
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        />
        <XAxis dataKey="month" hide />
        <Line
          dataKey="sent"
          filter={"url(#shadowMailSent)"}
          type="monotone"
          dot={false}
          strokeWidth={3}
          stroke={color ? color : "#FFFFFF"}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
export { EmailCampaignChart };
