import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';
import { radarData } from '../..';
import { JumboCard } from '@jumbo/components';

const SimpleRadarChart = () => (
  <JumboCard
    title={'Simple Radar Chart'}
    contentWrapper
    contentSx={{ backgroundColor: 'background.paper' }}
  >
    <ResponsiveContainer width='100%' height={400}>
      <RadarChart outerRadius={150} data={radarData}>
        <Radar
          name='Mike'
          dataKey='A'
          stroke={'#1e88e5'}
          fill={'#1e88e5'}
          fillOpacity={0.6}
        />
        <PolarGrid />
        <PolarAngleAxis dataKey='subject' />
        <PolarRadiusAxis />
      </RadarChart>
    </ResponsiveContainer>
  </JumboCard>
);

export { SimpleRadarChart };
