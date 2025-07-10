import { JumboCard } from '@jumbo/components';
import { Div, Span } from '@jumbo/shared';
import { TrendingUp } from '@mui/icons-material';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { Chip, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';

const Visits = ({title}:{title:React.ReactNode}) => {
  return (
    <JumboCard
      title={
        <Typography variant={'h5'} mb={0}>
          {title}
        </Typography>
      }
      action={
        <Stack direction={'row'} spacing={1}>
          <Chip label={'Today'} color={'primary'} size={'small'} />
          <ShowChartIcon fontSize={'small'} />
        </Stack>
      }
      contentWrapper
      contentSx={{ textAlign: 'center' }}
      headerSx={{ borderBottom: 1, borderBottomColor: 'divider' }}
    >
      <Stack direction={'row'} sx={{ maxWidth: 600, mx: 'auto' }}>
        <Div sx={{ width: '50%', textAlign: 'center' }}>
          <Typography variant={'h2'}>406,42</Typography>
          <Typography variant={'body1'}>
            Rapid pace:
            <Span sx={{ color: 'success.main', ml: 1 }}>
              23%
              <TrendingUp
                fontSize={'small'}
                sx={{ verticalAlign: 'middle', ml: 1 }}
              />
            </Span>
          </Typography>
        </Div>
        <Div sx={{ width: '50%', textAlign: 'center' }}>
          <Typography variant={'h2'}>206,12</Typography>
          <Typography variant={'body1'}>
            Slow pace:
            <Span sx={{ color: 'error.main', ml: 1 }}>
              1.58%
              <TrendingUp
                fontSize={'small'}
                sx={{ verticalAlign: 'middle', ml: 1 }}
              />
            </Span>
          </Typography>
        </Div>
      </Stack>
    </JumboCard>
  );
};

export { Visits };
