import { Pie, PieChart, ResponsiveContainer } from 'recharts';
import { pieData2, pieData3 } from '../..';
import { JumboCard } from '@jumbo/components';

const TwoLevelPieChart = () => (
  <JumboCard
    title={'Two Level Pie Chart'}
    contentWrapper
    contentSx={{ backgroundColor: 'background.paper' }}
  >
    <ResponsiveContainer width='100%' height={300}>
      <PieChart>
        <Pie
          dataKey='value'
          data={pieData2}
          outerRadius={60}
          fill={'#1e88e5'}
        />
        <Pie
          dataKey='value'
          data={pieData3}
          innerRadius={70}
          outerRadius={90}
          fill={'#e91e63'}
          label
        />
      </PieChart>
    </ResponsiveContainer>
  </JumboCard>
);
export { TwoLevelPieChart };
