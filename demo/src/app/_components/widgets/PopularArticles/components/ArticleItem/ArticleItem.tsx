import { Span } from '@jumbo/shared';
import {
  Chip,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import { ArticleType } from '../../data';

type ArticleItemProps = {
  data: ArticleType;
};
const ArticleItem = ({ data }: ArticleItemProps) => {
  return (
    <ListItem alignItems='flex-start' sx={{ px: 3 }}>
      <ListItemAvatar sx={{ mr: 2, overflow: 'hidden', borderRadius: 2 }}>
        <img
          width={140}
          height={105}
          style={{ verticalAlign: 'middle' }}
          alt={data.category}
          src={data.thumb}
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography component={'div'} mt={1}>
            <Chip
              label={data.category}
              sx={{ color: 'text.secondary', mb: 1.25 }}
              size={'small'}
            />
            <Typography variant='h5' sx={{ lineHeight: 1.5 }}>
              {data.title}
            </Typography>
          </Typography>
        }
        secondary={
          <Stack component={'span'} direction='row' spacing={1}>
            <Span sx={{ color: 'text.secondary', fontSize: 12 }}>
              {data.date}
            </Span>
            <Span sx={{ fontSize: 12 }}>
              {data.views} <Span sx={{ color: 'text.secondary' }}>views</Span>
            </Span>
          </Stack>
        }
      />
    </ListItem>
  );
};

export { ArticleItem };
