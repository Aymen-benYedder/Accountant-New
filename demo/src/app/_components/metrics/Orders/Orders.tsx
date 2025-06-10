import { JumboCard } from '@jumbo/components';
import { Span } from '@jumbo/shared';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';

const Orders = ({title}:{title:React.ReactNode}) => {
  return (
    <JumboCard
      title={
        <Typography variant={'h5'} mb={0}>
          {title}
        </Typography>
      }
      action={
        <Stack direction={'row'} spacing={1}>
          <Chip label={'Annual'} color={'warning'} size={'small'} />
          <ShowChartIcon fontSize={'small'} />
        </Stack>
      }
      contentSx={{ textAlign: 'center' }}
      contentWrapper
      headerSx={{ borderBottom: 1, borderBottomColor: 'divider' }}
    >
      <Typography variant={'h2'}>80,790</Typography>
      <Typography variant={'body1'}>
        Past week:
        <Span sx={{ color: 'success.main', ml: 1 }}>
          4,626
          <TrendingUpIcon
            fontSize={'small'}
            sx={{ verticalAlign: 'middle', ml: 1 }}
          />
        </Span>
      </Typography>
    </JumboCard>
  );
};

export { Orders };
