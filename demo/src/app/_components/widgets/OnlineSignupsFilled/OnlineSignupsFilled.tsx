import { RevenueChart } from '@app/_components/charts';
import { JumboCard } from '@jumbo/components';
import { Div } from '@jumbo/shared';
import { TrendingUp } from '@mui/icons-material';
import { Typography } from '@mui/material';

function OnlineSignupsFilled({subheader}:{subheader:React.ReactNode}) {
  return (
    <JumboCard
      title={'10,241'}
      subheader={subheader}
      action={
        <Typography variant={'body1'}>
          1.5%
          <TrendingUp
            sx={{ verticalAlign: 'middle', fontSize: '1rem', ml: 0.5 }}
          />
        </Typography>
      }
      textColor='common.white'
      bgcolor={['#a3ead3', '#3bd2a2']}
      reverse
      sx={{
        borderTop: '4px solid #3BD2A2',
        '.MuiCardHeader-title': {
          color: 'inherit',
          fontSize: '1.25rem',
        },
        '.MuiCardHeader-subheader': {
          color: 'inherit',
        },
      }}
    >
      <Div sx={{ p: 3, pb: 0 }}>
        <RevenueChart />
      </Div>
    </JumboCard>
  );
}

export { OnlineSignupsFilled };
