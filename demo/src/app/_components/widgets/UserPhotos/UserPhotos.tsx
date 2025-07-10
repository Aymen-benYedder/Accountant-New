import { JumboCard, JumboScrollbar } from '@jumbo/components';
import { Div } from '@jumbo/shared';
import ImageList from '@mui/material/ImageList';
import React from 'react';
import { PictureItem } from './components/PictureItem';
import { userPhotos } from './data';

const UserPhotos = ({ title }: { title: React.ReactNode }) => {
  return (
    <JumboCard title={title} contentWrapper contentSx={{ p: 0 }}>
      <JumboScrollbar autoHeight autoHeightMin={358}>
        <Div sx={{ px: 3 }}>
          <ImageList
            cols={3}
            gap={16}
            sx={{ width: '100%', height: 'auto', my: 0 }}
          >
            {userPhotos.map((item, index) => (
              <PictureItem item={item} key={index} />
            ))}
          </ImageList>
        </Div>
      </JumboScrollbar>
    </JumboCard>
  );
};

export { UserPhotos };
