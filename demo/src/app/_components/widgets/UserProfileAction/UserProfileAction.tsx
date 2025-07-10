import { ASSET_AVATARS, ASSET_IMAGES } from '@app/_utilities/constants/paths';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import { Card, CardMedia } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Stack from '@mui/material/Stack';

const UserProfileAction = ({ height }: { height?: number | string }) => {
  return (
    <Card sx={{ position: 'relative' }}>
      <CardMedia
        component='img'
        height={height ? height : 242}
        image={`${ASSET_IMAGES}/wall/ethan-robertson.jpg`}
        alt=''
      />

      <Stack direction={'row'}>
        <Avatar
          sx={{
            width: 60,
            height: 60,
            m: (theme) => theme.spacing(-3, 0, 0, 3),
          }}
          src={`${ASSET_AVATARS}/jonathan.jpg`}
          alt=''
        />
        <ButtonGroup
          fullWidth
          size='large'
          variant={'text'}
          sx={{
            height: 50,
            '& .MuiButtonGroup-grouped:not(:last-of-type)': {
              border: 'none',
            },
          }}
        >
          <Button>
            <FavoriteBorderOutlinedIcon />
          </Button>
          <Button>
            <ChatBubbleOutlineOutlinedIcon />
          </Button>
          <Button>
            <InsertLinkOutlinedIcon />
          </Button>
        </ButtonGroup>
      </Stack>
    </Card>
  );
};

export { UserProfileAction };
