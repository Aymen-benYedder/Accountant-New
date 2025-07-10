import {
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { composedData1 } from '../..';
import { JumboCard } from '@jumbo/components';

const LineBarAreaComposedChart = () => (
  <JumboCard
    title={'Different Composed Chart'}
    contentWrapper
    contentSx={{ backgroundColor: 'background.paper' }}
  >
    <ResponsiveContainer width='100%' height={300}>
      <ComposedChart
        width={500}
        height={400}
        data={composedData1}
        margin={{
          top: 20,
          right: 80,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke='#f5f5f5' />
        <Tooltip />
        <Legend />

        <XAxis
          dataKey='index'
          type='number'
          label={{ value: '', position: 'insideBottomRight', offset: 0 }}
        />
        <YAxis
          unit='ms'
          type='number'
          label={{ value: '', angle: -90, position: 'insideLeft' }}
        />
        <Scatter name='red' dataKey='red' fill='red' />
        <Scatter name='blue' dataKey='blue' fill='blue' />
        <Line
          dataKey='blueLine'
          stroke='blue'
          dot={false}
          activeDot={false}
          legendType='none'
        />
        <Line
          dataKey='redLine'
          stroke='red'
          dot={false}
          activeDot={false}
          legendType='none'
        />
      </ComposedChart>
    </ResponsiveContainer>
  </JumboCard>
);

export { LineBarAreaComposedChart };
