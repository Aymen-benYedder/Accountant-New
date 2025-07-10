import { OnlineSignupChart1 } from '@app/_components/charts/OnlineSignupChart1';
import { JumboCard } from '@jumbo/components';
import { TrendingDown } from '@mui/icons-material';
import { Typography } from '@mui/material';
import React from 'react';

const EmailCampaign = ({ subheader }: { subheader: React.ReactNode }) => {
  return (
    <JumboCard
      title={
        <Typography fontWeight={'500'} variant={'h3'} color={'common.white'}>
          9,257
        </Typography>
      }
      subheader={
        <Typography variant={'h6'} color={'common.white'} mb={0}>
          {subheader}
        </Typography>
      }
      action={
        <Typography variant={'body1'}>
          3.6%{' '}
          <TrendingDown
            sx={{ verticalAlign: 'middle', fontSize: '1rem', ml: 0.5 }}
          />
        </Typography>
      }
      reverse
      sx={{ color: 'common.white', borderTop: '4px solid #F39711' }}
      bgcolor={['#f9cc8a', '#f39711']}
      contentWrapper
      contentSx={{ pb: 0 }}
    >
      <OnlineSignupChart1 />
    </JumboCard>
  );
};

export { EmailCampaign };
