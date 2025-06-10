import { List } from '@mui/material';
import { popularAuthors } from '../../data';
import { AuthorItem } from '../AuthorItem';

const AuthorsList = () => {
  return (
    <List disablePadding>
      {popularAuthors.map((item, index) => (
        <AuthorItem author={item} key={index} />
      ))}
    </List>
  );
};

export default AuthorsList;
