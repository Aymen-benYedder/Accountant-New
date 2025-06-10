import { JumboCard } from '@jumbo/components';
import { Span } from '@jumbo/shared';
import { TrendingDown } from '@mui/icons-material';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { Chip } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';

const PageViews = ({title}:{title:React.ReactNode}) => {
  return (
    <JumboCard
      title={
        <Typography variant={'h5'} mb={0}>
          {title}
        </Typography>
      }
      action={
        <Stack direction={'row'} spacing={1}>
          <Chip label={'Monthly'} color={'success'} size={'small'} />
          <ShowChartIcon fontSize={'small'} />
        </Stack>
      }
      contentSx={{ textAlign: 'center' }}
      contentWrapper={true}
      headerSx={{ borderBottom: 1, borderBottomColor: 'divider' }}
    >
      <Typography variant={'h2'}>386,290</Typography>
      <Typography variant={'body1'}>
        Avg. daily views:
        <Span sx={{ color: 'error.main', ml: 1 }}>
          7,829
          <TrendingDown
            fontSize={'small'}
            sx={{ verticalAlign: 'middle', ml: 1 }}
          />
        </Span>
      </Typography>
    </JumboCard>
  );
};

export { PageViews };
