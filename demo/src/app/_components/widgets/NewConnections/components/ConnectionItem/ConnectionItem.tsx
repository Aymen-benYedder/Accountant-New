import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import { ConnectionDataObject } from '../../data';

type ConnectionItemProps = {
  item: ConnectionDataObject;
  handleFollowToggle: (record: ConnectionDataObject) => void;
};
const ConnectionItem = ({ item, handleFollowToggle }: ConnectionItemProps) => {
  return (
    <ListItem sx={{ p: (theme) => theme.spacing(1, 3) }}>
      <ListItemAvatar>
        <Avatar alt={item.user.name} src={item.user.profile_pic} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant='h5' mb={0.5}>
            {item.user.name}
          </Typography>
        }
        secondary={'@' + item.user.username}
      />
      <Button
        size={'small'}
        variant={'contained'}
        disableElevation
        onClick={() => handleFollowToggle(item)}
        {...(item.follow ? { color: 'inherit' } : { color: 'success' })}
        sx={{
          minWidth: 78,
          textTransform: 'none',
          p: (theme) => theme.spacing(0.5, 1.5),
        }}
      >
        {item.follow ? 'Unfollow' : 'Follow'}
      </Button>
    </ListItem>
  );
};
/* Todo item, handleFollowToggle prop define */
export { ConnectionItem };
