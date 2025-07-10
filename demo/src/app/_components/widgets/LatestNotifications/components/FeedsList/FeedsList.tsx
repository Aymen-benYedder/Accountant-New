import {
  FeedInvitation,
  FeedPhotoUpload,
  FeedSharedPost,
} from "@app/_components/feedItems";
import List from "@mui/material/List";
import React from "react";
import { ListHeader } from "../ListHeader";
import { Link } from "@jumbo/shared";

const feedTypes = {
  PROJECT_INVITATION: FeedInvitation,
  PHOTOS_UPLOADED: FeedPhotoUpload,
  SHARED_POST: FeedSharedPost,
};

interface NotificationItem {
  type: "PROJECT_INVITATION" | "PHOTOS_UPLOADED" | "SHARED_POST";
  id: number;
  user: {
    id: number;
    name: string;
    profile_pic: string;
  };
  metaData: any;
  timeRange: string;
  createdAt: string;
}

type FeedsListProps = {
  count?: number;
  notifications: NotificationItem[];
  noHeader?: boolean;
};

const FeedsList = ({
  count,
  notifications,
  noHeader = true,
}: FeedsListProps) => {
  return (
    <React.Fragment>
      {!noHeader && (
        <ListHeader title="FEEDS" count={count} action={<Link>SEE ALL</Link>} />
      )}
      <List disablePadding>
        {notifications.map((item) => {
          const FeedItemComponent = feedTypes[item.type];
          return <FeedItemComponent key={`feed-${item.id}`} feed={item} />;
        })}
      </List>
    </React.Fragment>
  );
};

export { FeedsList };
