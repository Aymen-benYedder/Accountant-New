import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { pieData1 } from "../..";
import { JumboCard } from "@jumbo/components";

const COLORS: string[] = ["#1e88e5", "#e91e63", "#FF8C00", "#F44336"];

const PaddingAnglePieChart = () => {
  return (
    <JumboCard
      title={"Pie Chart With Padding Angle"}
      contentWrapper
      contentSx={{ backgroundColor: "background.paper" }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            dataKey="value"
            data={pieData1}
            cx="35%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#6200EE"
            paddingAngle={5}
          >
            {pieData1.map(({}, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Pie
            dataKey="value"
            data={pieData1}
            cx="70%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            fill={"#1e88e5"}
            paddingAngle={5}
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

export { PaddingAnglePieChart };
