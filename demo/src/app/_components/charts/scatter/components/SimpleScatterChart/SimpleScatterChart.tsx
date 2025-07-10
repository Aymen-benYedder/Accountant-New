import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { scatterData1 } from '../..';
import { JumboCard } from '@jumbo/components';

const SimpleScatterChart = () => (
  <JumboCard
    title={'Simple Scatter Chart'}
    contentWrapper
    contentSx={{ backgroundColor: 'background.paper' }}
  >
    <ResponsiveContainer width='100%' height={400}>
      <ScatterChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <XAxis dataKey={'x'} name='stature' unit='cm' />
        <YAxis dataKey={'y'} name='weight' unit='kg' />
        <Scatter name='A school' data={scatterData1} fill={'#1e88e5'} />
        <CartesianGrid />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      </ScatterChart>
    </ResponsiveContainer>
  </JumboCard>
);

export { SimpleScatterChart };
