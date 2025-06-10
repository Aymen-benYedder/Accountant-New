import { OnlineSignupChart1 } from '@app/_components/charts/OnlineSignupChart1';
import { JumboCard } from '@jumbo/components';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Typography from '@mui/material/Typography';
import React from 'react';

const OnlineSignups = ({ subheader }: { subheader: React.ReactNode }) => {
  return (
    <JumboCard
      title={
        <Typography fontWeight={'500'} variant={'h3'} color={'common.white'}>
          10,241
        </Typography>
      }
      subheader={
        <Typography variant={'h6'} color={'common.white'} mb={0}>
          {subheader}
        </Typography>
      }
      action={
        <Typography variant={'body1'}>
          1.5%{' '}
          <TrendingUpIcon
            sx={{ verticalAlign: 'middle', fontSize: '1rem', ml: 0.5 }}
          />
        </Typography>
      }
      reverse
      sx={{ color: 'common.white', borderTop: '4px solid #7352C7' }}
      bgcolor={['#c1b2e6', '#7352c7']}
      contentWrapper
      contentSx={{ pb: 0 }}
    >
      <OnlineSignupChart1 />
    </JumboCard>
  );
};

export { OnlineSignups };
