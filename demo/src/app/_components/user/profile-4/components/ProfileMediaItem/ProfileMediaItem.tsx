import { ASSET_AVATARS } from '@app/_utilities/constants/paths';
import { getAssetPath } from '@app/_utilities/helpers';
import { useJumboDialog } from '@jumbo/components/JumboDialog/hooks/useJumboDialog';
import { Div } from '@jumbo/shared';
import { CloseOutlined } from '@mui/icons-material';
import {
  Avatar,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { ProfileMediaProps } from '../../data';
import { ProfileMediaPopover } from './ProfileMediaPopover';
import { SocialMediaDetail } from './SocialMediaDetail';

const ProfileMediaItem = ({ profile }: { profile: ProfileMediaProps }) => {
  const { showDialog, hideDialog } = useJumboDialog();
  const handleClick = (profile: ProfileMediaProps) => {
    showDialog({
      title: (
        <CardHeader
          avatar={
            <Avatar
              sx={{ height: 50, width: 50 }}
              alt='Brian Walsh'
              src={getAssetPath(`${ASSET_AVATARS}/avatar9.jpg`, '50x50')}
            />
          }
          title={
            <Typography variant={'h6'} mb={0.25}>
              Brian Walsh
            </Typography>
          }
          subheader={
            <Typography
              variant={'body1'}
              color={'text.secondary'}
              fontSize={'12px'}
            >
              10 Nov, 2024
            </Typography>
          }
          sx={{ p: 0 }}
        />
      ),
      content: <ProfileMediaPopover profile={profile} />,
      headerActions: (
        <IconButton onClick={hideDialog}>
          <CloseOutlined />
        </IconButton>
      ),
    });
  };

  return (
    <Grid size={{ xs: 12, md: 6, lg: 4 }}>
      <Div sx={{ borderRadius: 4, overflow: 'hidden', mb: 1.5 }}>
        <CardMedia
          component='img'
          image={profile?.mediaImage}
          alt=''
          sx={{ aspectRatio: '5/3.25', cursor: 'pointer' }}
          onClick={() => {
            handleClick(profile);
          }}
        />
      </Div>
      <SocialMediaDetail profile={profile} />
    </Grid>
  );
};

export { ProfileMediaItem };
