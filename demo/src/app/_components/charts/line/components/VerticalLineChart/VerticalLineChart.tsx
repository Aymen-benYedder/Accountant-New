import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { lineData } from '../..';
import { JumboCard } from '@jumbo/components';

const VerticalLineChart = () => {
  return (
    <JumboCard
      title={'Vertical Line Chart'}
      contentWrapper
      contentSx={{ backgroundColor: 'background.paper' }}
    >
      <ResponsiveContainer width='100%' height={200}>
        <LineChart
          layout='vertical'
          data={lineData}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <XAxis type='number' />
          <YAxis dataKey='name' type='category' />
          <CartesianGrid strokeDasharray='3 3' />
          <Tooltip
            labelStyle={{ color: 'black' }}
            itemStyle={{ color: 'black' }}
            cursor={false}
          />
          <Legend />
          <Line dataKey='pv' stroke={'#1e88e5'} />
          <Line dataKey='uv' stroke={'#e91e63'} />
        </LineChart>
      </ResponsiveContainer>
    </JumboCard>
  );
};

export { VerticalLineChart };
