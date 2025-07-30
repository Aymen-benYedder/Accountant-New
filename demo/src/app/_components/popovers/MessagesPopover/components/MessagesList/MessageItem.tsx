import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
  Avatar,
  IconButton,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { MessagesDataProps } from './data';

import { useNavigate } from 'react-router-dom';

type MessageItemProps = {
  item: MessagesDataProps;
  isUnreadForCurrentUser?: boolean; // Use this prop instead
};
const MessageItem = ({ item, isUnreadForCurrentUser }: MessageItemProps) => {
  const navigate = useNavigate();
  // Route to /apps/chat/contact/[userId] as required by new routing
  const goToChat = () => {
    navigate(`/apps/chat/contact/${item.user.id}`);
  };
  return (
    <ListItemButton
      component={'li'}
      disableRipple
      onClick={goToChat}
      sx={{
        backgroundColor: isUnreadForCurrentUser ? 'action.hover' : 'transparent', // Darker background for unread received messages
        '&:hover': {
          backgroundColor: isUnreadForCurrentUser ? 'action.selected' : 'action.hover', // Adjust hover for unread
        },
      }}
    >
      <ListItemAvatar>
        <Avatar src={item.user.profile_pic} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant={'h6'} mb={0.25}>
            {item.user.name}
          </Typography>
        }
        secondary={
          <Typography noWrap color={'text.secondary'}>
            {item.message}
          </Typography>
        }
      />
      {/* todo : iconbutton prop elevation:1 */}
      <IconButton edge={'end'} size={'small'}>
        <MoreHorizIcon />
      </IconButton>
    </ListItemButton>
  );
};

export default MessageItem;
