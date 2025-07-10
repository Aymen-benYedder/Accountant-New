import { Div } from '@jumbo/shared';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { connectNullData } from '../..';
import { JumboCard } from '@jumbo/components';

const ConnectNullLineChart = () => (
  <JumboCard
    title={'Connect Nulls Chart'}
    contentWrapper
    contentSx={{ backgroundColor: 'background.paper' }}
  >
    <Div sx={{ mb: 4, flex: 1 }}>
      <ResponsiveContainer width='100%' height={200}>
        <LineChart
          data={connectNullData}
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
          <Line
            type='monotone'
            dataKey='uv'
            stroke={'#1e88e5'}
            fill={'#1e88e5'}
          />
        </LineChart>
      </ResponsiveContainer>
    </Div>
    <Div>
      <ResponsiveContainer width='100%' height={200}>
        <LineChart
          data={connectNullData}
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
          <Line
            connectNulls={true}
            type='monotone'
            dataKey='uv'
            stroke={'#1e88e5'}
            fill={'#1e88e5'}
          />
        </LineChart>
      </ResponsiveContainer>
    </Div>
  </JumboCard>
);

export { ConnectNullLineChart };
