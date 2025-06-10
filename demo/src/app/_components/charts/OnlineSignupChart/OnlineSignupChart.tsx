import { Div } from '@jumbo/shared';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { onlineSignups } from './data';

type OnlineSignupChartProps = {
  color?: string;
  shadowColor?: string;
};

const OnlineSignupChart = ({ color, shadowColor }: OnlineSignupChartProps) => {
  return (
    <ResponsiveContainer height={80}>
      <LineChart data={onlineSignups} className={'mx-auto'}>
        <defs>
          <filter id='shadow' height='200%'>
            <feDropShadow
              dx='0'
              dy='5'
              stdDeviation='8'
              floodColor={shadowColor ? shadowColor : '#6610f2'}
            />
          </filter>
        </defs>
        <Tooltip
          cursor={false}
          content={({ active, label, payload }) => {
            return active ? (
              <Div sx={{ color: 'common.white' }}>
                {payload?.map((row, index) => (
                  <div key={index}>{`${label}: ${row.value} Signups`}</div>
                ))}
              </Div>
            ) : null;
          }}
          wrapperStyle={{
            backgroundColor: color ? color : 'rgba(0,0,0,.8)',
            padding: '5px 8px',
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
          }}
        />
        <XAxis dataKey='month' hide />
        <Line
          dataKey='count'
          filter='url(#shadow)'
          type='monotone'
          dot={false}
          strokeWidth={3}
          stroke={color ? color : '#FFFFFF'}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export { OnlineSignupChart };
