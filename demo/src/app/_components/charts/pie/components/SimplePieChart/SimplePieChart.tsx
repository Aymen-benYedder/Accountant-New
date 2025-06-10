import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { pieData2 } from '../..';
import { JumboCard } from '@jumbo/components';

const SimplePieChart = () => (
  <JumboCard
    title={'Simple Pie Chart'}
    contentWrapper
    contentSx={{ backgroundColor: 'background.paper' }}
  >
    <ResponsiveContainer width='100%' height={300}>
      <PieChart>
        <Pie
          dataKey='value'
          isAnimationActive={false}
          data={pieData2}
          cx='35%'
          cy='50%'
          outerRadius={80}
          fill={'#1e88e5'}
          label
        />
        <Pie
          dataKey='value'
          data={pieData2}
          cx='70%'
          cy='50%'
          innerRadius={40}
          outerRadius={80}
          fill={'#e91e63'}
        />
        <Tooltip
          labelStyle={{ color: 'black' }}
          itemStyle={{ color: 'black' }}
          cursor={false}
        />
      </PieChart>
    </ResponsiveContainer>
  </JumboCard>
);

export { SimplePieChart };
