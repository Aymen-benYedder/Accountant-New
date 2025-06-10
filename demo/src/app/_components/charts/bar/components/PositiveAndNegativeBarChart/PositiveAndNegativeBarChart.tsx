import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { posNegData } from '../..';
import { JumboCard } from '@jumbo/components';

const PositiveAndNegativeBarChart = () => (
  <JumboCard
    title={'Positive and Negative Bar Chart'}
    contentWrapper
    contentSx={{ backgroundColor: 'background.paper' }}
  >
    <ResponsiveContainer width='100%' height={200}>
      <BarChart
        width={500}
        height={300}
        data={posNegData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <ReferenceLine y={0} stroke='#000' />
        <Bar dataKey='pv' fill='#1e88e5' />
        <Bar dataKey='uv' fill='#e91e63' />
      </BarChart>
    </ResponsiveContainer>
  </JumboCard>
);

export { PositiveAndNegativeBarChart };
