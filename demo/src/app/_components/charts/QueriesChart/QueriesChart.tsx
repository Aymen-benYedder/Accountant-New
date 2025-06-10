import { Div } from '@jumbo/shared';
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts';
import { queriesData } from './data';

const QueriesChart = ({ color }: { color?: string }) => {
  return (
    <ResponsiveContainer
      className='card-img-bottom overflow-hidden'
      width='100%'
      height={95}
    >
      <AreaChart
        data={queriesData}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <Tooltip
          labelStyle={{ color: 'black' }}
          cursor={false}
          content={(data) =>
            data?.payload && data.payload[0] ? (
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
          stroke='#6ec6ff'
          fill='#2196f3'
          fillOpacity={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export { QueriesChart };
