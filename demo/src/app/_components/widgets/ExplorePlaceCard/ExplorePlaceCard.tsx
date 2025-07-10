import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { JumboCard, JumboOverlay } from "@jumbo/components";
import { Share } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { PlaceInfoBox } from "./components";

const ActionButton = () => {
  return (
    <IconButton sx={{ color: "common.white" }}>
      <Share />
    </IconButton>
  );
};

function ExplorePlaceCard({ height }: { height: number }) {
  return (
    <JumboCard
      action={<ActionButton />}
      bgimage={`${ASSET_IMAGES}/Explore_place.jpg`}
      sx={{ height: height ? height : 390 }}
    >
      <JumboOverlay
        opacity={1}
        color={(theme) => theme.palette.background.paper}
        margin={["auto", 20, 20, 20]}
        sx={{
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <PlaceInfoBox />
      </JumboOverlay>
    </JumboCard>
  );
}

export { ExplorePlaceCard };
