import { JumboCard } from "@jumbo/components/JumboCard";
import { GoogleMap, InfoBoxF } from "@react-google-maps/api";

const StyledMap = () => {
  const center = {
    lat: 44.8799929,
    lng: 21.3190073,
  };
  const options = { closeBoxURL: "", enableEventPropagation: true };
  return (
    <JumboCard
      contentWrapper
      contentSx={{ pt: 3, backgroundColor: "background.paper" }}
    >
      <GoogleMap
        zoom={1}
        mapContainerStyle={{ width: "100%", height: "400px" }}
        center={center}
      >
        <InfoBoxF options={options} onLoad={() => {}}>
          <div
            style={{ backgroundColor: "yellow", opacity: 0.75, padding: 20 }}
          >
            <div style={{ fontSize: 16, color: `#08233B` }}>Taipei</div>
          </div>
        </InfoBoxF>
      </GoogleMap>
    </JumboCard>
  );
};

export { StyledMap };
