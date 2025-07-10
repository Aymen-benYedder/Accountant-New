import { Facebook, Instagram, LinkedIn, Twitter } from '@mui/icons-material';
import { Fab, Stack } from '@mui/material';

function SocialMediaButtons() {
  return (
    <Stack
      direction='row'
      spacing={1}
      sx={{ p: (theme) => theme.spacing(3), mb: 0.625 }}
    >
      <Fab
        size='small'
        aria-label='Twitter'
        sx={{
          color: 'common.white',
          bgcolor: '#2196f3',

          '&:hover': {
            bgcolor: '#2196f3',
          },
        }}
      >
        <Twitter />
      </Fab>
      <Fab
        size='small'
        aria-label='Facebook'
        sx={{
          color: 'common.white',
          bgcolor: '#3f51b5',

          '&:hover': {
            bgcolor: '#3f51b5',
          },
        }}
      >
        <Facebook />
      </Fab>
      <Fab
        size='small'
        aria-label='Instagram'
        sx={{
          color: 'common.white',
          bgcolor: '#e91e63',

          '&:hover': {
            bgcolor: '#e91e63',
          },
        }}
      >
        <Instagram />
      </Fab>
      <Fab
        size='small'
        aria-label='LinkedIn'
        sx={{
          color: 'common.white',
          bgcolor: '#2196f3',

          '&:hover': {
            bgcolor: '#2196f3',
          },
        }}
      >
        <LinkedIn />
      </Fab>
    </Stack>
  );
}

export { SocialMediaButtons };
