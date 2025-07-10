import { Div } from '@jumbo/shared';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { IconButton, Stack, Typography } from '@mui/material';

const items = [
  {
    slug: 'facebook',
    background: 'linear-gradient(135deg, #91a9f1, #575fd8)',
    hoverBg: 'linear-gradient(135deg, #575fd8, #91a9f1)',
    icon: <FacebookIcon />,
  },
  {
    slug: 'Twitter',
    background: 'linear-gradient(135deg, #36bae0, #5a80e8)',
    hoverBg: 'linear-gradient(135deg, #5a80e8, #36bae0)',
    icon: <TwitterIcon />,
  },
  {
    slug: 'Instagram',
    background: 'linear-gradient(135deg, #a436af, #cc4d82)',
    hoverBg: 'linear-gradient(135deg, #cc4d82, #a436af)',
    icon: <InstagramIcon />,
  },
  {
    slug: 'LinkedIn',
    background: 'linear-gradient(135deg, #485596, #24B4CF)',
    hoverBg: 'linear-gradient(135deg, #24B4CF, #485596)',
    icon: <LinkedInIcon />,
  },
  {
    slug: 'Pinterest',
    background: 'linear-gradient(135deg, #D66060, #AF0707)',
    hoverBg: 'linear-gradient(135deg, #AF0707, #D66060)',
    icon: <PinterestIcon />,
  },
  {
    slug: 'YouTube',
    background: 'linear-gradient(135deg, #F187E5, #E843D6)',
    hoverBg: 'linear-gradient(135deg, #E843D6, #F187E5)',
    icon: <YouTubeIcon />,
  },
];
const SocialIcons = () => {
  return (
    <Div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 5,
      }}
    >
      <Typography variant='h1' mb={2}>
        Follow Us
      </Typography>
      <Stack direction={'row'} spacing={1} mb={1}>
        {items?.map((item, index) => (
          <IconButton
            key={index}
            sx={{
              borderRadius: 1,
              color: 'common.white',
              background: item?.background,

              '&:hover': {
                background: item?.hoverBg,
              },
            }}
            aria-label={item?.slug}
          >
            {item?.icon}
          </IconButton>
        ))}
      </Stack>
    </Div>
  );
};

export { SocialIcons };
