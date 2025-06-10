import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { scatterData1, scatterData2 } from '../..';
import { JumboCard } from '@jumbo/components';

const MultipleYAxesScatterChart = () => (
  <JumboCard
    title={'Multiple Y-Axes Scatter Chart'}
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
        <YAxis
          yAxisId='left'
          type='number'
          dataKey='y'
          name='weight'
          unit='kg'
          stroke='#8884d8'
        />
        <YAxis
          yAxisId='right'
          type='number'
          dataKey='y'
          name='weight'
          unit='kg'
          orientation='right'
          stroke='#82ca9d'
        />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter
          yAxisId='left'
          name='A school'
          data={scatterData1}
          fill='#8884d8'
        />
        <Scatter
          yAxisId='right'
          name='A school'
          data={scatterData2}
          fill='#82ca9d'
        />
      </ScatterChart>
    </ResponsiveContainer>
  </JumboCard>
);

export { MultipleYAxesScatterChart };
