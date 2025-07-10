import { FeedMessage } from '@app/_components/feedItems';
import { List } from '@mui/material';
import React from 'react';
import { ListHeader } from '../ListHeader';

type MessagesListProps = {
  title?: React.ReactNode;
  count?: number | string;
  action?: React.ReactNode;
  notifications?: any[];
};
function MessagesList({
  title,
  count,
  action,
  notifications = [],
}: MessagesListProps) {
  return (
    <React.Fragment>
      {title && <ListHeader title={title} count={count} action={action} />}
      <List disablePadding>
        {notifications.map((item) => {
          return <FeedMessage key={`message-${item.id}`} feed={item} />;
        })}
      </List>
    </React.Fragment>
  );
}

export { MessagesList };
