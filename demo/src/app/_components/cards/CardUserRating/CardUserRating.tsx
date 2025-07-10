import StarIcon from '@mui/icons-material/Star';
import { Card, CardContent, Rating, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import React from 'react';

type CardUserRatingProps = {
  avatar: React.ReactNode;
  title: React.ReactNode;
  rating: number;
  stats?: string[];
};
const CardUserRating = ({
  avatar,
  title,
  rating,
  stats,
}: CardUserRatingProps) => {
  return (
    <Card sx={{ overflow: 'visible', mt: 4 }}>
      <CardContent>
        {avatar}
        <Typography variant={'h6'}>{title}</Typography>
        <Stack direction={'row'} spacing={1} alignItems={'center'}>
          <Rating
            name='feedback'
            value={1}
            max={1}
            readOnly
            precision={1}
            size={'small'}
            emptyIcon={<StarIcon />}
          />
          <Typography
            component={'div'}
            variant={'body1'}
            color={'text.secondary'}
            sx={{
              display: 'flex',
              fontSize: 12,
            }}
          >
            {rating}
            <Divider orientation='vertical' flexItem sx={{ mx: 1, my: 0.5 }} />
            {stats?.map((stat, index) => (
              <React.Fragment key={index}>
                {stat}
                <Divider
                  orientation='vertical'
                  flexItem
                  sx={{ mx: 1, my: 0.5 }}
                />
              </React.Fragment>
            ))}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export { CardUserRating };
