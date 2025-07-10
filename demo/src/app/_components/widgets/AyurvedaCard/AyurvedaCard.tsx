import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { JumboCardFeatured } from "@jumbo/components";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function AyurvedaCard() {
  return (
    <JumboCardFeatured
      separatorSx={{ bgcolor: "success.main" }}
      direction={"column"}
      contentWrapperProps={{ textAlign: "center" }}
      fitToWidth={true}
      image={
        <img
          src={`${ASSET_IMAGES}/dashboard/ayurveda.jpg`}
          width={200}
          height={300}
          alt="Ayurveda"
        />
      }
    >
      <Typography variant={"h4"} mb={2}>
        Ayurveda
      </Typography>
      <Typography mb={3}>
        Learn with experts from around the world. Some description about the
        card can be found below.
      </Typography>
      <Button variant={"contained"}>Learn More</Button>
    </JumboCardFeatured>
  );
}

export { AyurvedaCard };
