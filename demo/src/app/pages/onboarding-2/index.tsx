import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import {
  OnboardingProvider,
  OnboardingStepper,
  useOnboarding,
} from "@app/_components/onboarding";
import { steps } from "@app/_components/onboarding/onboarding-2";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { Div } from "@jumbo/shared";
import { Container } from "@mui/material";
import React from "react";
const OnboardingComponent = () => {
  const { activeStep } = useOnboarding();

  const ContentComponent = React.useMemo(
    () => activeStep?.component,
    [activeStep]
  );
  return (
    <React.Fragment>
      <Div sx={{ mb: 3 }}>
        <img src={`${ASSET_IMAGES}/logo.png`} alt="Jumbo React" />
      </Div>
      <OnboardingStepper />
      <ContentComponent value={activeStep} />
    </React.Fragment>
  );
};

const OnboardingPage2 = () => {
  return (
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
      <OnboardingProvider initSteps={steps}>
        <OnboardingComponent />
      </OnboardingProvider>
    </Container>
  );
};

export default OnboardingPage2;
