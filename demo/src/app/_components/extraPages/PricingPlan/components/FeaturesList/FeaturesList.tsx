import EmailIcon from '@mui/icons-material/Email';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import HotelIcon from '@mui/icons-material/Hotel';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TranslateIcon from '@mui/icons-material/Translate';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

const features = [
  { label: 'Easy Translation', icon: <TranslateIcon fontSize={'small'} /> },
  {
    label: 'Awesome Google Fonts',
    icon: <FormatColorTextIcon fontSize={'small'} />,
  },
  { label: 'Hotel Booking System', icon: <HotelIcon fontSize={'small'} /> },
  { label: 'Email Compose Interface', icon: <EmailIcon fontSize={'small'} /> },
  { label: 'Location Finder App', icon: <LocationOnIcon fontSize={'small'} /> },
];
const FeaturesList = () => {
  return (
    <List disablePadding sx={{ mb: 4 }}>
      {features?.map((feature, index) => (
        <ListItem key={index}>
          <ListItemIcon sx={{ minWidth: 32, color: 'inherit' }}>
            {feature?.icon}
          </ListItemIcon>
          <ListItemText primary={feature?.label} />
        </ListItem>
      ))}
    </List>
  );
};
export { FeaturesList };
