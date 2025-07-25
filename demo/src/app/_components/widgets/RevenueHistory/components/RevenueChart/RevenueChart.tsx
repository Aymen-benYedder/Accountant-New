import { Div } from '@jumbo/shared';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { revenueHistory } from '../../data';

const RevenueChart = () => {
  return (
    <ResponsiveContainer width='100%' height={56}>
      <BarChart
        data={revenueHistory}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <Tooltip
          animationEasing={'ease-in-out'}
          content={({ active, payload }) => {
            return active ? (
              <Div sx={{ color: 'common.white' }}>
                {payload?.map((row, index) => {
                  return (
                    <div
                      key={index}
                      className={index !== payload.length - 1 ? 'mb-1' : ''}
                    >
                      <div
                        style={{
                          color: row.color,
                          fontSize: 8,
                          letterSpacing: 2,
                          textTransform: 'uppercase',
                        }}
                      >
                        {row.name}
                      </div>
                      <div
                        style={{
                          color: row.color,
                        }}
                      >
                        {row.value} USD
                      </div>
                    </div>
                  );
                })}
              </Div>
            ) : null;
          }}
          wrapperStyle={{
            background: 'rgba(255,255,255,0.9)',
            borderRadius: 4,
            padding: '5px 8px',
            fontWeight: 500,
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
          }}
        />
        <XAxis dataKey='month' hide />
        <Bar dataKey='revenue' stackId='a' fill='#6200EE' barSize={6} />
        <Bar dataKey='profit' stackId='a' fill='#00B3A6' barSize={6} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export { RevenueChart };
