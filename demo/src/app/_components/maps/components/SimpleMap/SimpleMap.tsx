import { JumboCard } from '@jumbo/components/JumboCard';
import { GoogleMap } from '@react-google-maps/api';

const SimpleMap = () => {
  return (
    <JumboCard
      contentWrapper
      contentSx={{ pt: 3, backgroundColor: 'background.paper' }}
    >
      <GoogleMap
        zoom={15}
        center={{ lat: 47.646145, lng: -122.303763 }}
        mapContainerStyle={{ width: '100%', height: '400px' }}
      />
    </JumboCard>
  );
};

export {SimpleMap};
