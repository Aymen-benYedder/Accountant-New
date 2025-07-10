import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { getAssetPath } from "@app/_utilities/helpers";
import { JumboCard } from "@jumbo/components/JumboCard";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import Button from "@mui/material/Button";

const ImageWithMessage = () => {
  const Swal = useSwalWrapper();
  const sweetAlerts = () => {
    Swal.fire({
      title: "Sweet!",
      text: "Modal with a custom image.",
      imageUrl: getAssetPath(
        `${ASSET_IMAGES}/dashboard/crypto/crypto2.jpg`,
        "400x255"
      ),
      imageWidth: 400,
      imageHeight: 255,
      imageAlt: "Custom image",
    });
  };
  return (
    <JumboCard
      title={"Image with message"}
      contentWrapper
      contentSx={{ backgroundColor: "background.paper", pt: 0 }}
    >
      <Button variant={"outlined"} onClick={sweetAlerts}>
        Click me
      </Button>
    </JumboCard>
  );
};

export { ImageWithMessage };
