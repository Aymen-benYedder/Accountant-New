import { JumboDdMenu } from '@jumbo/components/JumboDdMenu';
import {
  Avatar,
  Chip,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import { AuthorType } from '../../data';

type ColorType = 'primary' | 'secondary' | 'warning' | 'info';

const bgColors: ColorType[] = ['primary', 'secondary', 'warning', 'info'];

type AuthorItemProps = {
  author: AuthorType;
};

const AuthorItem = ({ author }: AuthorItemProps) => {
  return (
    <ListItemButton
      component={'li'}
      sx={{
        px: 3,
        borderBottom: 1,
        borderBottomColor: 'divider',
      }}
    >
      <ListItemAvatar sx={{ minWidth: 64 }}>
        <Avatar
          alt={author.name}
          src={author.profile_pic}
          sx={{ width: '52px', height: '52px' }}
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant='h5' mb={0.5}>
            {author.name}
          </Typography>
        }
        secondary={author.readers + 'readers'}
      />
      <ListItemText sx={{ flexGrow: 0 }}>
        <Chip
          label={`${author.articles} articles`}
          color={bgColors[Math.floor(Math.random() * 4)]}
          size={'small'}
        />
      </ListItemText>
      <ListItemIcon sx={{ minWidth: 32, ml: 2 }}>
        <JumboDdMenu
          menuItems={[
            { title: 'View Profile', slug: 'view-profile' },
            { title: 'Ignore', slug: 'ignore' },
          ]}
        />
      </ListItemIcon>
    </ListItemButton>
  );
};

export { AuthorItem };
