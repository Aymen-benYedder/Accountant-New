import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { barData } from '../..';
import { JumboCard } from '@jumbo/components';

const TinyBarChart = () => (
  <JumboCard
    title={'Tiny Bar Chart'}
    contentWrapper
    contentSx={{ backgroundColor: 'background.paper' }}
  >
    <ResponsiveContainer width='100%' height={200}>
      <BarChart
        data={barData}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <XAxis dataKey='name' />
        <YAxis />
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip
          labelStyle={{ color: 'black' }}
          itemStyle={{ color: 'black' }}
          cursor={false}
        />
        <Legend />

        <Bar dataKey='pv' fill={'#1e88e5'} />
        <Bar dataKey='uv' fill={'#e91e63'} />
      </BarChart>
    </ResponsiveContainer>
  </JumboCard>
);

export { TinyBarChart };
