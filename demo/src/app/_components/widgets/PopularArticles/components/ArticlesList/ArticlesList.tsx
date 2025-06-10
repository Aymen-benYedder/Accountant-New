import List from '@mui/material/List';
import { popularArticles } from '../../data';
import { ArticleItem } from '../ArticleItem';

const ArticlesList = () => {
  return (
    <List disablePadding>
      {popularArticles.map((item, index) => (
        <ArticleItem data={item} key={index} />
      ))}
    </List>
  );
};

export { ArticlesList };
