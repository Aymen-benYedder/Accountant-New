import {
  FeedInvitation,
  FeedPhotoUpload,
  FeedSharedPost,
} from '@app/_components/feedItems';
import { Feed } from '@app/_types/feedData';

const FeedComponents = {
  PROJECT_INVITATION: FeedInvitation,
  PHOTOS_UPLOADED: FeedPhotoUpload,
  SHARED_POST: FeedSharedPost,
};

interface FeedItemProps {
  feed: Feed;
}
const FeedItem = ({ feed }: FeedItemProps) => {
  const FeedComponent = FeedComponents[feed.type];
  return <FeedComponent feed={feed} />;
};

export { FeedItem };
