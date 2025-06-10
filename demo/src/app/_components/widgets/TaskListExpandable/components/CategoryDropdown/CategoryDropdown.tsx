import { Select, SelectChangeEvent } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { taskCategories } from '../../data';

type CategoryDropdownProps = {
  activeCategory: string;
  onCategoryChange: (value: string) => void;
};
const CategoryDropdown = ({
  activeCategory,
  onCategoryChange,
}: CategoryDropdownProps) => {
  const handleChange = (e: SelectChangeEvent) => {
    onCategoryChange(e.target.value);
  };
  return (
    <Select value={activeCategory} onChange={handleChange} size={'small'}>
      <MenuItem value={'all'}>All Tasks</MenuItem>
      {taskCategories.map((category, index) => (
        <MenuItem key={index} value={category.slug}>
          {category.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export { CategoryDropdown };
