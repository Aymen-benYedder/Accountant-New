import { JumboCard } from "@jumbo/components/JumboCard";
import {
  GoogleMap,
  OverlayView,
  OverlayViewF,
  StreetViewPanorama,
} from "@react-google-maps/api";

const STYLES = {
  overlayView: {
    background: `red`,
    color: `white`,
    padding: 5,
    borderRadius: `50%`,
  },
};
const getPixelPositionOffset = (width: number, height: number) => {
  return { x: -(width / 2), y: -(height / 2) };
};
const StreetViewPanoramaMap = () => {
  const center = {
    lat: 51.5320665,
    lng: -0.177203,
  };

  return (
    <JumboCard
      contentWrapper
      contentSx={{ pt: 3, backgroundColor: "background.paper" }}
    >
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        center={center}
        zoom={8}
      >
        <StreetViewPanorama options={{ position: center, visible: true }} />
        <OverlayViewF
          position={center}
          mapPaneName={OverlayView.OVERLAY_LAYER}
          getPixelPositionOffset={getPixelPositionOffset}
        >
          <div style={STYLES.overlayView} className="street-view">
            OverlayView
          </div>
        </OverlayViewF>
      </GoogleMap>
    </JumboCard>
  );
};

export { StreetViewPanoramaMap };
