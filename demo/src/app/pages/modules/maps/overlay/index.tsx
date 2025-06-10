import { MapProvider, OverlayMap } from "@app/_components/maps";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

export default function OverlayMapPage() {
  const { t } = useTranslation();
  return (
    <MapProvider>
      <Container
        maxWidth={false}
        sx={{
          maxWidth: CONTAINER_MAX_WIDTH,
          display: "flex",
          minWidth: 0,
          flex: 1,
          flexDirection: "column",
        }}
        disableGutters
      >
        <Typography variant={"h1"} mb={3}>
          {t("modules.title.overlayMap")}
        </Typography>
        <OverlayMap />
      </Container>
    </MapProvider>
  );
}
