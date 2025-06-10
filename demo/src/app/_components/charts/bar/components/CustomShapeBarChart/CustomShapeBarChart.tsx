import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { barData } from '../..';
import { JumboCard } from '@jumbo/components';

const getPath = (x: number, y: number, width: number, height: number) => {
  return `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
          Z`;
};

const TriangleBar = (props: any) => {
  const { fill, x, y, width, height } = props;
  return <path d={getPath(x, y, width, height)} stroke='none' fill={fill} />;
};
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const CustomShapeBarChart = () => (
  <JumboCard
    title={'Custom Shape Bar Chart'}
    contentWrapper
    contentSx={{ backgroundColor: 'background.paper' }}
  >
    <ResponsiveContainer width='100%' height={200}>
      <BarChart data={barData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <XAxis dataKey='name' />
        <YAxis />
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip />
        <Bar
          dataKey='uv'
          fill='#1e88e5'
          shape={<TriangleBar />}
          label={{ position: 'top' }}
        >
          {barData.map(({ name }, index) => (
            <Cell key={`cell-${name}`} fill={colors[index % 20]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </JumboCard>
);

export { CustomShapeBarChart };
