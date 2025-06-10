import { OnlineSignupChart1 } from '@app/_components/charts/OnlineSignupChart1';
import { JumboCard } from '@jumbo/components';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Typography from '@mui/material/Typography';
import React from 'react';

const RevenueThisYear = ({ subheader }: { subheader: React.ReactNode }) => {
  return (
    <JumboCard
      title={
        <Typography fontWeight={'500'} variant={'h3'} color={'common.white'}>
          $15,366
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
          <TrendingUpIcon
            sx={{ verticalAlign: 'middle', fontSize: '1rem', ml: 0.5 }}
          />
        </Typography>
      }
      reverse
      sx={{ color: 'common.white', borderTop: '4px solid #3BD2A2' }}
      bgcolor={['#a3ead3', '#3bd2a2']}
      contentWrapper
      contentSx={{ pb: 0 }}
    >
      <OnlineSignupChart1 />
    </JumboCard>
  );
};

export {RevenueThisYear};
