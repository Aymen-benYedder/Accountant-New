import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { lineData } from '../..';
import { JumboCard } from '@jumbo/components';

const ReferenceLineChart = () => (
  <JumboCard
    title={'Line Chart With Reference Lines'}
    contentWrapper
    contentSx={{ backgroundColor: 'background.paper' }}
  >
    <ResponsiveContainer width='100%' height={200}>
      <LineChart data={lineData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <XAxis dataKey='name' />
        <YAxis />
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip
          labelStyle={{ color: 'black' }}
          itemStyle={{ color: 'black' }}
          cursor={false}
        />
        <Legend />
        <ReferenceLine x='Page C' stroke='red' label='Max PV PAGE' />
        <ReferenceLine y={9800} label='Max' stroke='red' />
        <Line type='monotone' dataKey='pv' stroke={'#1e88e5'} />
        <Line type='monotone' dataKey='uv' stroke={'#e91e63'} />
      </LineChart>
    </ResponsiveContainer>
  </JumboCard>
);

export { ReferenceLineChart };
