import { List } from '@mui/material';
import { CryptoNewsType } from '../../data';
import { NewsItem } from '../NewsItem/NewsItem';

type CryptoNewsListProps = {
  items: CryptoNewsType[];
};
function CryptoNewsList({ items }: CryptoNewsListProps) {
  return (
    <List>
      {items.map((item) => (
        <NewsItem key={item.id} item={item} />
      ))}
    </List>
  );
}

export { CryptoNewsList };
