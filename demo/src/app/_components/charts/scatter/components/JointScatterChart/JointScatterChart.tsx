import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';
import { jointScatterData1, jointScatterData2 } from '../..';
import { JumboCard } from '@jumbo/components';

const JointScatterChart = () => (
  <JumboCard
    title={'Joint Scatter Chart'}
    contentWrapper
    contentSx={{ backgroundColor: 'background.paper' }}
  >
    <ResponsiveContainer width='100%' height={400}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis type='number' dataKey='x' name='stature' unit='cm' />
        <YAxis type='number' dataKey='y' name='weight' unit='kg' />
        <ZAxis type='number' range={[100]} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        <Scatter
          name='A school'
          data={jointScatterData1}
          fill='#8884d8'
          line
          shape='cross'
        />
        <Scatter
          name='B school'
          data={jointScatterData2}
          fill='#82ca9d'
          line
          shape='diamond'
        />
      </ScatterChart>
    </ResponsiveContainer>
  </JumboCard>
);

export { JointScatterChart };
