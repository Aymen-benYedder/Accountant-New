import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { Div, Link } from "@jumbo/shared";
import { Typography } from "@mui/material";
import React from "react";

const AboutOrganisationSidebar = () => {
  return (
    <React.Fragment>
      <Div sx={{ mb: 2 }}>
        <Typography mb={2} variant="h2">
          Create your toolbox 2
        </Typography>
        <img src={`${ASSET_IMAGES}/toolbox-1.png`} />
      </Div>
      <Typography variant="h6" mb={2}>
        Tips about payment methods
      </Typography>
      <Typography variant="body1" mb={2}>
        All of these payment methods will be available throughout the checkout
        process you use.
      </Typography>

      <Typography variant="body1" mb={2}>
        To receive payments, you need to add payment methods under{" "}
        <Link to={"#"}>{"Settings > Payment"}</Link> Methods.
      </Typography>
    </React.Fragment>
  );
};

export { AboutOrganisationSidebar };
