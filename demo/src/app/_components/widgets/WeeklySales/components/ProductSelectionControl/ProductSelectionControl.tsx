import { Div } from '@jumbo/shared';
import { Button, Popover } from '@mui/material';
import React from 'react';
import { WeeklyProductType } from '../../data';
import { CheckboxList } from '../CheckboxList';
import { ProductAvatars } from '../ProductAvatars';

type ProductSelectionControlProps = {
  items: WeeklyProductType[];
  selectedItems: WeeklyProductType[];
  onSelectedChanged: (checked: boolean, value: string) => void;
};

const ProductSelectionControl = ({
  items,
  selectedItems,
  onSelectedChanged,
}: ProductSelectionControlProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open = Boolean(anchorEl);
  return (
    <Div
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(1, 3),
      }}
    >
      {selectedItems.length > 0 && <ProductAvatars items={selectedItems} />}
      <Button
        variant={'contained'}
        color={'inherit'}
        disableElevation
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
          setAnchorEl(e.currentTarget)
        }
      >
        +ADD
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <CheckboxList
          items={items}
          selectedItems={selectedItems}
          onCheckboxChange={onSelectedChanged}
        />
      </Popover>
    </Div>
  );
};

export { ProductSelectionControl };
