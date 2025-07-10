import { Avatar, AvatarGroup } from '@mui/material';
import { WeeklyProductType } from '../../data';

type ProductAvatarsProps = {
  items: WeeklyProductType[];
};

const ProductAvatars = ({ items }: ProductAvatarsProps) => {
  return (
    <AvatarGroup max={4}>
      {items.map((item, index) => (
        <Avatar key={index} alt={item.name} src={item.logo} />
      ))}
    </AvatarGroup>
  );
};

export { ProductAvatars };
