import { ChartNewVisitors } from '@app/_components/charts';
import { JumboCard } from '@jumbo/components';
import { TrendingDown } from '@mui/icons-material';
import Typography from '@mui/material/Typography';

const EthereumPrice = ({ subheader }: { subheader: React.ReactNode }) => {
  return (
    <JumboCard
      title={
        <Typography variant={'h2'} color={'common.white'}>
          $6,725
        </Typography>
      }
      subheader={
        <Typography variant={'h6'} color={'common.white'} mb={0}>
          {subheader}
        </Typography>
      }
      action={
        <Typography variant={'body1'}>
          -3.6%{' '}
          <TrendingDown
            sx={{ verticalAlign: 'middle', fontSize: '1rem', ml: 0.5 }}
          />
        </Typography>
      }
      headerSx={{ pb: 0 }}
      sx={{ color: 'common.white' }}
      bgcolor={['#E73145']}
    >
      <ChartNewVisitors />
    </JumboCard>
  );
};

export { EthereumPrice };
