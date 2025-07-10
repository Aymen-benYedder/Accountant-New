import { Div } from '@jumbo/shared';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { totalRevenue } from './data';

type RevenueChartProps = {
  color?: string;
  shadowColor?: string;
};
const RevenueChart = ({ color, shadowColor }: RevenueChartProps) => {
  return (
    <ResponsiveContainer height={80}>
      <LineChart data={totalRevenue} className={'mx-auto'}>
        <defs>
          <filter id='shadowRevenue' height='200%'>
            <feDropShadow
              dx='0'
              dy='5'
              stdDeviation='8'
              floodColor={shadowColor ? shadowColor : '#28a745'}
            />
          </filter>
        </defs>
        <Tooltip
          labelStyle={{ color: 'black' }}
          cursor={false}
          content={(data) =>
            data?.payload && data.payload[0] ? (
              <Div sx={{ color: 'common.white' }}>
                {`${data.label}: $${data.payload[0].value}`}
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
        <XAxis dataKey='month' hide />
        <Line
          dataKey='amount'
          filter={'url(#shadowRevenue)'}
          type='monotone'
          dot={false}
          strokeWidth={3}
          stroke={color ? color : '#fff'}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export { RevenueChart };
