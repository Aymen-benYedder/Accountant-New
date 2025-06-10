import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import { List } from '@mui/material';

import { JumboCard } from '@jumbo/components';
import { Div } from '@jumbo/shared';
import React from 'react';
import { SocialMediaButtons } from './components';
import { branches } from './data';
import { IconLabelListItem } from '@app/_components/_core';

const OurOffice1 = ({ title }: { title: React.ReactNode }) => {
  const activeBranch = branches[0];
  return (
    <JumboCard title={title}>
      <Div>
        <List disablePadding>
          <IconLabelListItem
            alignItems='flex-start'
            icon={<LocationOnIcon />}
            text={activeBranch.address}
          />
          <IconLabelListItem icon={<PhoneIcon />} text={activeBranch.phone} />
          <IconLabelListItem
            icon={<MailOutlineIcon />}
            text={activeBranch.email}
          />
        </List>
        <SocialMediaButtons />
      </Div>
    </JumboCard>
  );
};

export { OurOffice1 };
