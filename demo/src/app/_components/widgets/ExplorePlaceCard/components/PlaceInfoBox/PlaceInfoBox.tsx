import { Div } from '@jumbo/shared';
import { Message, RemoveRedEye } from '@mui/icons-material';
import { CardActions, Divider, Stack, Typography } from '@mui/material';
import React from 'react';

function PlaceInfoBox() {
  return (
    <React.Fragment>
      <Div sx={{ p: 3 }}>
        <Stack>
          <Typography variant={'h6'} color={'text.secondary'}>
            26 January, 03:00 PM
          </Typography>
          <Typography variant={'h2'}>
            Explore the best place of the world
          </Typography>
          <Typography variant={'body1'}>
            Plus more tips to keep your feet from stinking this summer
          </Typography>
        </Stack>
      </Div>
      <Divider />
      <CardActions>
        <Stack
          direction={'row'}
          spacing={1}
          color={'text.secondary'}
          flexGrow={1}
          justifyContent={'center'}
        >
          <Typography>
            <Message
              fontSize={'small'}
              sx={{ verticalAlign: 'middle', mr: 0.5 }}
            />{' '}
            34
          </Typography>
          <Typography>
            <RemoveRedEye
              fontSize={'small'}
              sx={{ verticalAlign: 'middle', mr: 0.5 }}
            />{' '}
            155
          </Typography>
        </Stack>
      </CardActions>
    </React.Fragment>
  );
}

export { PlaceInfoBox };
