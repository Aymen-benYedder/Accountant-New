import { OnlineSignupChartFilled } from '@app/_components/charts';
import { JumboCard } from '@jumbo/components';
import { TrendingUp } from '@mui/icons-material';
import Typography from '@mui/material/Typography';

const RipplePrice = ({ subheader }: { subheader: React.ReactNode }) => {
  return (
    <JumboCard
      title={
        <Typography variant={'h2'} color={'common.white'}>
          $9,626
        </Typography>
      }
      subheader={
        <Typography variant={'h6'} color={'common.white'} mb={0}>
          {subheader}
        </Typography>
      }
      action={
        <Typography variant={'body1'}>
          6%{' '}
          <TrendingUp
            sx={{ verticalAlign: 'middle', fontSize: '1rem', ml: 0.5 }}
          />
        </Typography>
      }
      sx={{ color: 'common.white' }}
      bgcolor={['#E44A77']}
      contentWrapper={true}
      contentSx={{ pt: 0 }}
    >
      <OnlineSignupChartFilled color={'#fff'} shadowColor={'#000000'} />
    </JumboCard>
  );
};

export { RipplePrice };
