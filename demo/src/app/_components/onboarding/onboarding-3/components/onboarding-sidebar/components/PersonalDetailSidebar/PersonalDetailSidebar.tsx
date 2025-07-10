import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { Div, Link } from "@jumbo/shared";
import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

const PersonalDetailSidebar = () => {
  return (
    <React.Fragment>
      <Div sx={{ mb: 2 }}>
        <Typography mb={3} variant="h2" color={"common.white"}>
          Create your toolbox 1
        </Typography>
        <Div>
          <img src={`${ASSET_IMAGES}/toolbox-1.png`} />
        </Div>
      </Div>
      <Typography variant="h5" color={"common.white"} mb={2}>
        Tips about payment methods
      </Typography>
      <Typography
        variant="body1"
        mb={2}
        sx={{
          color: grey["400"],
        }}
      >
        All of these payment methods will be available throughout the checkout
        process you use.
      </Typography>

      <Typography
        variant="body1"
        mb={2}
        sx={{
          color: grey["400"],
        }}
      >
        To receive payments, you need to add payment methods under{" "}
        <Link href="#" underline="none" color="primary.light">
          Settings
        </Link>{" "}
        &gt;{" "}
        <Link href="#" underline="none" color="primary.light">
          Payment
        </Link>{" "}
        Methods.
      </Typography>
    </React.Fragment>
  );
};

export { PersonalDetailSidebar };
