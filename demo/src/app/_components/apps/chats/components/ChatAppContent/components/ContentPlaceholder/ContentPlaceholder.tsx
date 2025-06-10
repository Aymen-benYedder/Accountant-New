import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { getAssetPath } from "@app/_utilities/helpers";
import { Div } from "@jumbo/shared";
import { Typography } from "@mui/material";

const ContentPlaceholder = () => {
  return (
    <Div
      sx={{
        textAlign: "center",
        margin: "auto",
        p: 3,
      }}
    >
      <img
        src={getAssetPath(
          `${ASSET_IMAGES}/apps/undraw_development.svg`,
          "800x600"
        )}
        alt="Welcome to Jumbo Chat App"
        width={350}
      />
      <Typography variant={"h2"} mt={2} color={"text.primary"}>
        Welcome to Jumbo chat app
      </Typography>
    </Div>
  );
};

export { ContentPlaceholder };
