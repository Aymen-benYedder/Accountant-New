import List from '@mui/material/List';
import { commentsList } from '../../data';
import { CommentItem } from '../CommentItem';

const CommentsList = () => {
  return (
    <List disablePadding>
      {commentsList.map((item, index) => (
        <CommentItem item={item} key={index} />
      ))}
    </List>
  );
};

export { CommentsList };
