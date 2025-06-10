import { Checkbox, ListItem, Typography } from '@mui/material';
import { WeeklyProductType } from '../../data';

type CheckboxItemProps = {
  checked: boolean;
  item: WeeklyProductType;
  onCheckboxChange: (checked: boolean, value: string) => void;
};
const CheckboxItem = ({
  checked,
  item,
  onCheckboxChange,
}: CheckboxItemProps) => {
  return (
    <ListItem>
      <Checkbox
        checked={checked}
        onChange={(event) =>
          onCheckboxChange(event.target.checked, event.target.value)
        }
        name={'products'}
        value={item.id}
        sx={{ my: -1, ml: -1 }}
      />
      <Typography variant={'body1'}>{item.name}</Typography>
    </ListItem>
  );
};

export { CheckboxItem };
