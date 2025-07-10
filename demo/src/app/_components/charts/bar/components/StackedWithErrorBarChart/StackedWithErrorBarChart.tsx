import {
  Bar,
  BarChart,
  CartesianGrid,
  ErrorBar,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { barData } from '../..';
import { JumboCard } from '@jumbo/components';

const StackedWithErrorBarChart = () => (
  <JumboCard
    title={'Stacked With Error Bar Chart'}
    contentWrapper
    contentSx={{ backgroundColor: 'background.paper' }}
  >
    <ResponsiveContainer width='100%' height={200}>
      <BarChart
        data={barData}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        layout='vertical'
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis type='number' />
        <YAxis dataKey='name' type='category' />
        <Tooltip
          labelStyle={{ color: 'black' }}
          itemStyle={{ color: 'black' }}
        />
        <Legend />
        <Bar dataKey='pv' stackId='a' fill='#e91e63' />
        <Bar dataKey='uv' stackId='a' fill='#1e88e5'>
          <ErrorBar dataKey='pvError' width={5} stroke='red' direction='x' />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </JumboCard>
);

export { StackedWithErrorBarChart };
