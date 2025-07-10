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
import { dimensionalData1, dimensionalData2 } from '../..';
import { JumboCard } from '@jumbo/components';

const ThreeDimensionalScatterChart = () => (
  <JumboCard
    title={'3D Scatter Chart'}
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
        <ZAxis
          type='number'
          dataKey='z'
          range={[60, 400]}
          name='score'
          unit='km'
        />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        <Scatter
          name='A Star'
          data={dimensionalData1}
          fill='#8884d8'
          shape='star'
        />
        <Scatter
          name='B Star'
          data={dimensionalData2}
          fill='#82ca9d'
          shape='triangle'
        />
      </ScatterChart>
    </ResponsiveContainer>
  </JumboCard>
);

export { ThreeDimensionalScatterChart };
