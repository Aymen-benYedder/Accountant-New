import { List } from '@mui/material';
import { PropertyType } from '../../data';
import { PropertyItem } from '../PropertyItem';

type PropertiesProps = {
  items: PropertyType[];
};
function Properties({ items }: PropertiesProps) {
  return (
    <List>
      {items.map((item) => (
        <PropertyItem key={item.id} item={item} />
      ))}
    </List>
  );
}

export { Properties };
