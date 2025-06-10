import { NoDataPlaceholder } from "@app/_components/_core";
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { WeeklyProductType } from "../../data";

function customizedLabel(props: any): React.ReactNode {
  const { x, y, value } = props;
  return (
    <text x={x + 5} y={y} dy={-20} textAnchor="middle">
      {value}
    </text>
  );
}

const ChartReport = ({ data }: { data: WeeklyProductType[] }) => {
  const chartData = data.map((product) => {
    return {
      name: product.name,
      color: product.colorCode,
      ...product.sales_data,
    };
  });
  if (data?.length === 0) {
    return <NoDataPlaceholder height={200} />;
  }
  return (
    <ResponsiveContainer width="100%" height={234}>
      <BarChart
        barSize={10}
        data={chartData}
        margin={{ top: 35, right: 0, left: 0, bottom: -8 }}
      >
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis hide />
        <Bar dataKey="sold_qty">
          <LabelList
            dataKey="sold_qty"
            content={(props) => customizedLabel(props)}
          />
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export { ChartReport };
