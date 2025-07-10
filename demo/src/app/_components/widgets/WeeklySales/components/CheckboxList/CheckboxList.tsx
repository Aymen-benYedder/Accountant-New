import { List } from '@mui/material';
import { WeeklyProductType } from '../../data';
import { CheckboxItem } from '../CheckboxItem';

type CheckboxListProps = {
  items: WeeklyProductType[];
  selectedItems: WeeklyProductType[];
  onCheckboxChange: (checked: boolean, value: string) => void;
};

const CheckboxList = ({
  items,
  selectedItems,
  onCheckboxChange,
}: CheckboxListProps) => {
  return (
    <List sx={{ minWidth: 160 }}>
      {items.map((item, index) => {
        const itemSelected = selectedItems.filter(
          (product) => product.id === item.id
        );

        return (
          <CheckboxItem
            key={index}
            checked={!!itemSelected.length}
            item={item}
            onCheckboxChange={onCheckboxChange}
          />
        );
      })}
    </List>
  );
};

export { CheckboxList };
