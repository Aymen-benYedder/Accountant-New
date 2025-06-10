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

const XAxisPaddingLineChart = () => (
  <JumboCard
    title={'Line Chart With X-Axis Padding'}
    contentWrapper
    contentSx={{backgroundColor: 'background.paper' }}
  >
    <ResponsiveContainer width='100%' height={200}>
      <LineChart data={lineData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <XAxis dataKey='name' padding={{ left: 30, right: 30 }} />
        <YAxis />
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip
          labelStyle={{ color: 'black' }}
          itemStyle={{ color: 'black' }}
          cursor={false}
        />
        <Legend />
        <Line
          type='monotone'
          dataKey='pv'
          stroke={'#1e88e5'}
          activeDot={{ r: 8 }}
        />
        <Line type='monotone' dataKey='uv' stroke={'#e91e63'} />
      </LineChart>
    </ResponsiveContainer>
  </JumboCard>
);

export { XAxisPaddingLineChart };
