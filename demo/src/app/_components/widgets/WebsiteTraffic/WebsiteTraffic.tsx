import { JumboCard } from '@jumbo/components';
import { Typography } from '@mui/material';
import { ChartWebsiteTraffic } from './components';
import React from 'react';

const WebsiteTraffic = ({title}:{title:React.ReactNode}) => {
  return (
    <JumboCard
      title={
        <Typography variant={'h4'} mb={0}>
          {title}
        </Typography>
      }
      sx={{ textAlign: 'center' }}
    >
      <ChartWebsiteTraffic />
    </JumboCard>
  );
};

export { WebsiteTraffic };
