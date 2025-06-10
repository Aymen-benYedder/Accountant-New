import { Span } from '@jumbo/shared';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {
  Avatar,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import Fab from '@mui/material/Fab';
import ListItemButton from '@mui/material/ListItemButton';
import { CommentType } from '../../data';

const CommentItem = ({ item }: { item: CommentType }) => {
  return (
    <ListItemButton
      component={'li'}
      alignItems={'flex-start'}
      sx={{
        borderBottom: 1,
        borderBottomColor: 'divider',
        px: 3,

        '&:hover .ListItemIcons': {
          opacity: 1,
        },
      }}
    >
      <ListItemAvatar sx={{ minWidth: 68 }}>
        <Avatar
          sx={{ width: 48, height: 48 }}
          alt={item.user.name}
          src={item.user.profile_pic}
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography component={'div'}>
            <Typography variant={'body1'} mb={1}>
              <Span sx={{ color: 'primary.main' }}>{item.user.name}</Span>
              {' commented on '}
              <Span sx={{ color: 'primary.main' }}>{item.postTitle}</Span>
            </Typography>
          </Typography>
        }
        secondary={item.comment}
        sx={{ flex: 1 }}
      />
      <ListItemText sx={{ ml: 2, flex: '0 0 auto', mt: 1 }}>
        <Typography variant={'body1'} color={'text.secondary'} fontSize={12}>
          {item.date}
        </Typography>
      </ListItemText>
      <ListItemIcon
        className={'ListItemIcons'}
        sx={{
          position: 'absolute',
          right: 24,
          top: '50%',
          transition: 'all 0.2s',
          opacity: 0,
          transform: 'translateY(-50%)',
          mt: 0,
        }}
      >
        <Fab size='small' color={'primary'}>
          <CheckIcon />
        </Fab>
        <Fab size='small' sx={{ ml: 2 }}>
          <CloseIcon />
        </Fab>
      </ListItemIcon>
    </ListItemButton>
  );
};

export { CommentItem };
