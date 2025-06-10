import { currentYear } from "@app/_utilities/constants/data";
import { Div } from "@jumbo/shared";
import { Button, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Div
      sx={{
        py: 2,
        px: { lg: 6, sm: 4, xs: 2.5 },
        borderTop: 2,
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Div
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant={"body1"} color={"text.primary"}>
          {`Copyright Company Name © ${currentYear}`}
        </Typography>
        <Div sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h5"
            sx={{
              display: { xs: "none", sm: "block" },
              mb: 0,
              mr: 2,
              color: "primary.main",
            }}
          >
            $24 Only
          </Typography>
          <Button
            variant="contained"
            target="_blank"
            href="https://codecanyon.net/checkout/from_item/20978545?license=regular&size=source&support=bundle_6month"
          >
            Buy Now
          </Button>
        </Div>
      </Div>
    </Div>
  );
};

export { Footer };
