import { JumboCard } from '@jumbo/components';
import {
  DrawingManagerF,
  GoogleMap,
} from '@react-google-maps/api';
const DrawingViewMap = () => {
  
  return (
    <JumboCard
      contentWrapper
      contentSx={{ pt: 3, backgroundColor: 'background.paper' }}
    >
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={new window.google.maps.LatLng(47.646935, -122.303763)}
        zoom={15}
      >
        <DrawingManagerF />
      </GoogleMap>
    </JumboCard>
  );
};
export { DrawingViewMap };
