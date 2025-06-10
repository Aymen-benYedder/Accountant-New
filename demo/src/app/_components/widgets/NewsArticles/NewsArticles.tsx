import { JumboCard } from '@jumbo/components';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Typography } from '@mui/material';
import React from 'react';
import { NewArticlesChart } from './components';

const NewArticles = ({ subheader }: { subheader: React.ReactNode }) => {
  return (
    <JumboCard
      title={<Typography variant={'h2'}>526+</Typography>}
      subheader={
        <Typography variant={'h6'} color={'text.secondary'}>
          {subheader}
        </Typography>
      }
      action={<BookmarkIcon />}
      headerSx={{ pb: 1.25 }}
    >
      <NewArticlesChart />
    </JumboCard>
  );
};

export { NewArticles };
