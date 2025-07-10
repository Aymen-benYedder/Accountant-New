import { Div } from '@jumbo/shared';
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts';
import { statisticsData } from './data';

const PropertiesChart = ({ color }: { color?: string }) => {
  return (
    <ResponsiveContainer width='100%' height={95}>
      <AreaChart
        data={statisticsData}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <Tooltip
          labelStyle={{ color: 'black' }}
          cursor={false}
          content={(data) =>
            data?.payload && data?.payload[0] ? (
              <Div sx={{ color: 'common.white' }}>
                {`price: ${data.payload[0].value}`}
              </Div>
            ) : null
          }
          wrapperStyle={{
            background: color ? color : 'rgba(0,0,0,.8)',
            padding: '5px 8px',
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
          }}
        />
        <Area
          dataKey='price'
          strokeWidth={2}
          stroke='#c7a4ff'
          fill='#7e57c2'
          fillOpacity={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export { PropertiesChart };
