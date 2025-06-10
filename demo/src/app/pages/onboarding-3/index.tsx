import { OnboardingProvider, useOnboarding } from "@app/_components/onboarding";
import {
  Onboarding3Sidebar,
  sidebarSteps,
  steps,
} from "@app/_components/onboarding/onboarding-3";
import { ContentLayout } from "@app/_layouts";
import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";
import { darken, Theme } from "@mui/material";
import React from "react";

const useOnboardingLayout = () => {
  const { theme } = useJumboTheme();

  return React.useMemo(
    () => ({
      sidebarOptions: {
        sx: {
          display: "flex",
          minWidth: 0,
          flexShrink: 0,
          flexDirection: "column",
          width: { lg: 330 },
          minHeight: { lg: "100%" },
          p: (theme: any) => theme.spacing(2, 4),
          color: "common.white",
        },
      },
      wrapperOptions: {
        sx: {
          [theme.breakpoints.down("lg")]: {
            flexDirection: "column",
          },
          background: (theme: Theme) => darken(theme.palette.primary.main, 0.5),
          borderRadius: 6,
          padding: 0.75,
        },
        container: true,
      },
      contentOptions: {
        sx: {
          p: { lg: 0, sm: 0, xs: 0 },
        },
      },
      mainOptions: {
        sx: {
          minHeight: { xs: "auto", lg: "100%" },
        },
      },
    }),
    [theme]
  );
};

const OnboardingComponent = () => {
  const onboardingLayoutOptions = useOnboardingLayout();

  const { activeStep } = useOnboarding();

  const ContentComponent = React.useMemo(
    () => activeStep?.component,
    [activeStep]
  );

  return (
    <ContentLayout
      sidebar={<Onboarding3Sidebar />}
      {...onboardingLayoutOptions}
    >
      <ContentComponent value={activeStep} />
    </ContentLayout>
  );
};

const OnboardingPage3 = () => {
  return (
    <OnboardingProvider initSteps={steps} initSidebarSteps={sidebarSteps}>
      <OnboardingComponent />
    </OnboardingProvider>
  );
};
export default OnboardingPage3;
