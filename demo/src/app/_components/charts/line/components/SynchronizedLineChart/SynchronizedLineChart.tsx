import { Div } from '@jumbo/shared';
import { Typography } from '@mui/material';
import {
  Area,
  AreaChart,
  Brush,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { lineData } from '../..';
import { JumboCard } from '@jumbo/components';

const SynchronizedLineChart = () => (
  <JumboCard
    title={'Synchronized Line Chart'}
    contentWrapper
    contentSx={{
      flexDirection: 'column',
      pt: 2,
      backgroundColor: 'background.paper',
    }}
  >
    <Div sx={{ mb: 4, alignSelf: 'stretch' }}>
      <Typography variant={'h5'} mb={2}>
        A demo of synchronized AreaCharts
      </Typography>
      <ResponsiveContainer width='100%' height={200}>
        <LineChart
          data={lineData}
          syncId='anyId'
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
    <Div sx={{ mb: 4, alignSelf: 'stretch' }}>
      <Typography variant={'h5'} mb={2}>
        Maybe some other content
      </Typography>
      <ResponsiveContainer width='100%' height={200}>
        <LineChart
          data={lineData}
          syncId='anyId'
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
            dataKey='pv'
            stroke={'#1e88e5'}
            fill={'#1e88e5'}
          />
        </LineChart>
      </ResponsiveContainer>
    </Div>
    <Div sx={{ alignSelf: 'stretch' }}>
      <ResponsiveContainer width='100%' height={200}>
        <AreaChart
          data={lineData}
          syncId='anyId'
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
          <Area
            type='monotone'
            dataKey='pv'
            stroke={'#1e88e5'}
            fill={'#1e88e5'}
          />
          <Brush />
        </AreaChart>
      </ResponsiveContainer>
    </Div>
  </JumboCard>
);

export { SynchronizedLineChart };
