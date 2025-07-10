import TrendingDownSharpIcon from '@mui/icons-material/TrendingDownSharp';
import TrendingUpSharpIcon from '@mui/icons-material/TrendingUpSharp';
import { Typography } from '@mui/material';

type BalanceSumamryProps = {
  amount: React.ReactNode;
  label?: React.ReactNode;
  trend?: {
    percentage?: number;
    direction?: 'up' | 'down';
  };
};

function BalanceSummary({ amount, label, trend }: BalanceSumamryProps) {
  const TrendingIcon =
    trend?.direction === 'down' ? TrendingDownSharpIcon : TrendingUpSharpIcon;
  const color = trend?.direction === 'down' ? '#E73145' : '#3BD2A2';

  return (
    <>
      <Typography variant={'h2'}>
        {amount}
        {trend && (
          <Typography
            component={'span'}
            sx={{
              display: 'inline-flex',
              ml: 1,
              color,
            }}
          >
            {trend?.percentage ?? 0}%{' '}
            <TrendingIcon fontSize={'small'} sx={{ ml: '2px' }} />
          </Typography>
        )}
      </Typography>
      <Typography variant={'body1'} sx={{ mb: 3 }}>
        {label}
      </Typography>
    </>
  );
}

export { BalanceSummary };
