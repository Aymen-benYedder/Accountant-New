import { OnboardingStepper } from "@app/_components/onboarding/common";
import { useOnboarding } from "@app/_components/onboarding/hooks";
import { Div, Link } from "@jumbo/shared";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Button, Typography } from "@mui/material";
import React from "react";

const Onboarding3Sidebar = () => {
  const { sidebarActiveStep } = useOnboarding();

  const ContentComponent = React.useMemo(
    () => sidebarActiveStep?.component,
    [sidebarActiveStep]
  );
  return (
    <Div
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "space-between",
      }}
    >
      <Div>
        <Typography variant="h5" color={"common.white"} mb={2}>
          {"Setup your preferences"}
        </Typography>
        <Div sx={{ mb: 4 }}>
          <OnboardingStepper />
        </Div>
        <ContentComponent value={sidebarActiveStep} />
      </Div>
      <Link to={"/"}>
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          sx={{
            "&:hover": { background: "transparent" },
            textTransform: "none",
            fontSize: 15,
            letterSpacing: 0,
            color: "primary.light",
          }}
          disableRipple
        >
          Go back to home
        </Button>
      </Link>
    </Div>
  );
};

export { Onboarding3Sidebar };
