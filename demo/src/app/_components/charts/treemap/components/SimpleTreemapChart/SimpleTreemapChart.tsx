import { ResponsiveContainer, Treemap } from 'recharts';
import { treemapData } from '../..';
import { JumboCard } from '@jumbo/components';

const SimpleTreemapChart = () => (
  <JumboCard
    title={'Simple Treemap Chart'}
    contentWrapper
    contentSx={{ pt: 0 }}
  >
    <ResponsiveContainer width='100%' height={200}>
      <Treemap
        data={treemapData}
        dataKey='size'
        stroke={'#fff'}
        fill={'#1e88e5'}
      />
    </ResponsiveContainer>
  </JumboCard>
);

export { SimpleTreemapChart };
