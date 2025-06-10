import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';
import { radarData } from '../..';
import { JumboCard } from '@jumbo/components';

const SpecificDomainRadarChart = () => (
  <JumboCard
    title={'Specific Domain Radar Chart'}
    contentWrapper
    contentSx={{ backgroundColor: 'background.paper' }}
  >
    <ResponsiveContainer width='100%' height={400}>
      <RadarChart outerRadius={150} data={radarData}>
        <Radar
          name='Lily'
          dataKey='B'
          stroke={'#e91e63'}
          fill={'#e91e63'}
          fillOpacity={0.6}
        />
        <Radar
          name='Mike'
          dataKey='A'
          stroke={'#1e88e5'}
          fill={'#1e88e5'}
          fillOpacity={0.6}
        />
        <PolarGrid />
        <Legend />
        <PolarAngleAxis dataKey='subject' />
        <PolarRadiusAxis angle={30} domain={[0, 150]} />
      </RadarChart>
    </ResponsiveContainer>
  </JumboCard>
);

export { SpecificDomainRadarChart };
