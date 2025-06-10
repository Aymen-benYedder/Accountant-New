import { JumboCard, JumboScrollbar } from '@jumbo/components';
import { JumboDdMenu } from '@jumbo/components/JumboDdMenu';
import { Article, Refresh } from '@mui/icons-material';
import React from 'react';
import { PostsList } from './components';
interface LatestPostsProps {
  scrollHeight?:number;
  title:React.ReactNode;
  subheader:React.ReactNode;
}
const LatestPosts = ({
  scrollHeight,
  title,
  subheader,
}: LatestPostsProps) => {
  return (
    <JumboCard
      title={title}
      subheader={subheader}
      action={
        <JumboDdMenu
          menuItems={[
            {
              icon: <Refresh sx={{ fontSize: 20 }} />,
              title: 'Refresh',
              slug: 'refresh',
            },
            {
              icon: <Article sx={{ fontSize: 20 }} />,
              title: 'Articles',
              slug: 'article',
            },
          ]}
        />
      }
      contentWrapper={true}
      contentSx={{ p: 0 }}
    >
      <JumboScrollbar
        autoHeight
        autoHeightMin={scrollHeight ? scrollHeight : 334}
      >
        <PostsList />
      </JumboScrollbar>
    </JumboCard>
  );
};

export { LatestPosts };
