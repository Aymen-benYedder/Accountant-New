import { List } from '@mui/material';
import { latestPosts } from '../../data';
import { PostItem } from '../PostItem';

const PostsList = () => {
  return (
    <List disablePadding>
      {latestPosts.map((post, index) => (
        <PostItem post={post} key={index} />
      ))}
    </List>
  );
};

export { PostsList };
