import { useJumboTheme } from '@jumbo/components/JumboTheme/hooks';
import { Div, Span } from '@jumbo/shared';
import { Schedule } from '@mui/icons-material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import {
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
  alpha,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import ListItemButton from '@mui/material/ListItemButton';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { PropertyType } from '../../data';

const PropertyItem = ({ item }: { item: PropertyType }) => {
  const { theme } = useJumboTheme();
  const images = item.images;

  const [currentSlide, setCurrentSlide] = React.useState<{
    currentSlide: number;
  }>({ currentSlide: 0 });

  const updateCurrentSlide = (index: number) => {
    if (currentSlide.currentSlide !== index) {
      setCurrentSlide({ currentSlide: index });
    }
  };
  return (
    <ListItemButton
      disableRipple
      alignItems='flex-start'
      sx={{
        p: 3,
        transition: 'all 0.2s',
        borderBottom: 1,
        borderBottomColor: 'divider',
        [theme.breakpoints.down('md')]: {
          flexWrap: 'wrap',
        },
        '&:hover': {
          boxShadow: `0 3px 10px 0 ${alpha('#000', 0.2)}`,
          transform: 'translateY(-4px)',
          borderBottomColor: 'transparent',
        },
      }}
    >
      <ListItemAvatar
        sx={{
          width: 184,
          mt: 0,
          mr: 3,

          [theme.breakpoints.down('md')]: {
            width: '100%',
            mr: 0,
            mb: 3,
          },
        }}
      >
        <Carousel
          width={'100%'}
          showArrows={false}
          showStatus={false}
          onChange={updateCurrentSlide}
          selectedItem={currentSlide.currentSlide}
          showThumbs={false}
          verticalSwipe={'natural'}
        >
          {images.map((item, index) => (
            <Avatar
              src={item.image}
              variant={'rounded'}
              key={index}
              sx={{
                width: '100%',
                height: 128,
                [theme.breakpoints.down('md')]: {
                  height: 320,
                },
              }}
            />
          ))}
        </Carousel>
      </ListItemAvatar>
      <ListItemText>
        <Typography component={'div'}>
          {item.availability === 'sale' ? (
            <Chip
              label={'For Sale'}
              size={'small'}
              color={'warning'}
              sx={{ mb: 1 }}
            />
          ) : (
            <Chip
              label={'For Rent'}
              size={'small'}
              color={'success'}
              sx={{ mb: 1 }}
            />
          )}
          <Typography variant={'h4'} mb={1.25}>
            {item.title}
          </Typography>
          <Typography variant={'h6'} color={'text.primary'} mb={0.5}>
            {item.address}
          </Typography>
          <Typography variant={'body1'} color={'text.secondary'} mb={0.5}>
            Bedrooms:{' '}
            <Span sx={{ color: 'text.primary', mr: 1 }}>{item.bedrooms}</Span>
            Baths:{' '}
            <Span sx={{ color: 'text.primary', mr: 1 }}>{item.bathrooms}</Span>
            Area: <Span sx={{ color: 'text.primary', mr: 1 }}>{item.area}</Span>
          </Typography>
          <Stack
            color={'text.secondary'}
            direction={'row'}
            spacing={2}
            alignItems={'center'}
          >
            <Span sx={{ display: 'inline-flex', fontSize: 13 }}>
              <PersonOutlineOutlinedIcon sx={{ fontSize: 16, mr: 1 }} />
              {item.owner.name}
            </Span>
            <Span sx={{ display: 'inline-flex', fontSize: 13 }}>
              <Schedule sx={{ fontSize: 16, mr: 1 }} />
              {item.publishedDate}
            </Span>
          </Stack>
        </Typography>
      </ListItemText>
      <Div sx={{ display: 'block', textAlign: 'right', mt: 1 }}>
        <Typography variant={'h4'} color={'primary'}>
          {item.price}
        </Typography>
        <Typography variant={'body1'} fontSize={13}>
          {item.pricePerSqFt}
        </Typography>
      </Div>
    </ListItemButton>
  );
};
/* Todo properties item prop */
export { PropertyItem };
