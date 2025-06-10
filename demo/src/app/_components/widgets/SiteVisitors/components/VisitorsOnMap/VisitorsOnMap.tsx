import { Div } from "@jumbo/shared";

import { worldMill } from "@react-jvectormap/world";
import { countriesMarkers } from "../../data";
import { VectorMap } from "@react-jvectormap/core";

// TODO: fix the self is not defined error
const VisitorsOnMap = () => {
  return (
    <Div
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "200px",
        overflow: "hidden",

        "& .jvectormap-container": {
          height: "100%",
          width: "100%",
        },
        m: 3,
      }}
    >
      <VectorMap
        backgroundColor={"common.white"}
        map={worldMill}
        regionStyle={{
          initial: {
            fill: "#DEE4E8",
          },
        }}
        markerStyle={{
          initial: {
            fill: "#FFC542",
            stroke: "rgba(50, 88, 239, 0.2)",
          },
        }}
        zoomOnScroll={false}
        markers={countriesMarkers}
      />
    </Div>
  );
};

export { VisitorsOnMap };
