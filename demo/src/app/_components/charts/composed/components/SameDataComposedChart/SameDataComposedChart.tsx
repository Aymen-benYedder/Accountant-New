import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { composedData } from '../..';
import { JumboCard } from '@jumbo/components';

const SameDataComposedChart = () => (
  <JumboCard
    title={'Same Data Composed Chart'}
    contentWrapper
    contentSx={{ backgroundColor: 'background.paper' }}
  >
    <ResponsiveContainer width='100%' height={200}>
      <ComposedChart
        data={composedData}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip
          labelStyle={{ color: 'black' }}
          itemStyle={{ color: 'black' }}
          cursor={false}
        />
        <Legend />
        <CartesianGrid stroke='#f5f5f5' />
        <Bar dataKey='uv' barSize={20} fill={'#1e88e5'} />
        <Line type='monotone' dataKey='uv' stroke='#59AA2B' />
      </ComposedChart>
    </ResponsiveContainer>
  </JumboCard>
);

export { SameDataComposedChart };
