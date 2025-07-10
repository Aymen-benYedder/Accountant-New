import { ASSET_IMAGES } from '@app/_utilities/constants/paths';
import { JumboCard } from '@jumbo/components';
import { Button, Chip, Stack, Typography } from '@mui/material';

export function NewsPhotos() {
  return (
    <JumboCard
      action={<Chip label={'$20/month'} size={'small'} color={'secondary'} />}
      sx={{
        bgcolor: 'primary.main',
        color: 'common.white',
        '& .MuiCardHeader-root': {
          border: 'none',
          position: 'absolute',
          right: '-5px',
          top: '-5px',
        },
      }}
      contentWrapper
    >
      <Stack direction={'row'} spacing={1} alignItems={'center'} mb={2}>
        <img alt={''} src={`${ASSET_IMAGES}/dashboard/new-photo.png`} />
        <Typography variant={'h1'} color={'common.white'}>
          248
        </Typography>
      </Stack>

      <Typography variant={'h2'} color={'common.white'}>
        New photos added this week
      </Typography>
      <Typography variant={'body1'} mb={2}>
        Now kick-start with your next design. Subscribe today and save $20/month
      </Typography>
      <Button variant={'contained'} color={'warning'} className={'mb-1'}>
        Subscribe
      </Button>
    </JumboCard>
  );
}
