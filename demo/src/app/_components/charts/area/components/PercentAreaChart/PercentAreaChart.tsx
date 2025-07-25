import { Div } from '@jumbo/shared';
import { List, ListItem } from '@mui/material';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { percentAreaData } from '../../data';
import { JumboCard } from '@jumbo/components';

const getPercent = (value: number, total: number) => {
  const ratio = total > 0 ? value / total : 0;

  return toPercent(ratio, 2);
};
const toPercent = (decimal: number, fixed = 0) => {
  return `${(decimal * 100).toFixed(fixed)}%`;
};
const renderTooltipContent = (o: any) => {
  const { payload, label } = o;
  const total = payload.reduce(
    (result: any, entry: any) => result + entry.value,
    0
  );

  return (
    <Div>
      <p>{`${label} (Total: ${total})`}</p>
      <List disablePadding>
        {payload.map((entry: any, index: number) => (
          <ListItem key={`item-${index}`} sx={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}(${getPercent(entry.value, total)})`}
          </ListItem>
        ))}
      </List>
    </Div>
  );
};
const PercentAreaChart = () => (
  <JumboCard
    title={'Percent Area Chart'}
    contentWrapper
    contentSx={{ backgroundColor: 'background.paper' }}
  >
    <ResponsiveContainer width='100%' height={200}>
      <AreaChart
        data={percentAreaData}
        stackOffset='expand'
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <XAxis dataKey='month' />
        <YAxis tickFormatter={toPercent} />
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip content={renderTooltipContent} />
        <defs>
          <linearGradient id='color1' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#E59D1E' stopOpacity={1} />
            <stop offset='95%' stopColor='#E59D1E' stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <defs>
          <linearGradient id='color2' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#1ABBDE' stopOpacity={1} />
            <stop offset='95%' stopColor='#09BCA7' stopOpacity={1} />
          </linearGradient>
        </defs>
        <defs>
          <linearGradient id='color3' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#6200EE' stopOpacity={1} />
            <stop offset='95%' stopColor='#B819D2' stopOpacity={1} />
          </linearGradient>
        </defs>
        <Area
          type='monotone'
          dataKey='a'
          stackId='1'
          stroke=''
          fill={'#7e57c2'}
          fillOpacity={1}
        />
        <Area
          type='monotone'
          dataKey='b'
          stackId='1'
          stroke=''
          fill={'#e91e63'}
          fillOpacity={1}
        />
        <Area
          type='monotone'
          dataKey='c'
          stackId='1'
          stroke=''
          fill={'#1e88e5'}
          fillOpacity={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  </JumboCard>
);

export { PercentAreaChart };
