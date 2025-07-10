import { ActiveUsersChart } from '@app/_components/charts/ActiveUsersChart';
import { JumboCard } from '@jumbo/components';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Typography } from '@mui/material';
import React from 'react';

const ActiveUsers = ({ subheader }: { subheader: React.ReactNode }) => {
  return (
    <JumboCard
      title={<Typography variant={'h3'}>257</Typography>}
      subheader={subheader}
      action={
        <Typography variant={'body1'} color={'success.main'}>
          1.5%{' '}
          <TrendingUpIcon
            sx={{
              verticalAlign: 'middle',
              fontSize: '1rem',
              ml: 0.5,
              color: 'inherit',
            }}
          />
        </Typography>
      }
      contentWrapper
      contentSx={{ pt: 1 }}
    >
      <ActiveUsersChart />
    </JumboCard>
  );
};

export { ActiveUsers };
