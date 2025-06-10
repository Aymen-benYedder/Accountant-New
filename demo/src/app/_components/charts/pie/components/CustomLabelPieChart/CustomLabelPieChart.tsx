import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { pieData1 } from "../..";
import { JumboCard } from "@jumbo/components";
const COLORS = ["#1e88e5", "#e91e63", "#FF8C00", "#F44336"];

type CustomizedLabelType = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
};
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: CustomizedLabelType) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomizedLabelPieChart = () => {
  return (
    <JumboCard
      title={"Pie Chart with Customized Label"}
      contentWrapper
      contentSx={{ backgroundColor: "background.paper" }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            dataKey="value"
            data={pieData1}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill={"#1e88e5"}
          >
            {pieData1.map(({}, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </JumboCard>
  );
};

export { CustomizedLabelPieChart };
