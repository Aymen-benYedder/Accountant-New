import React from "react";
import { OnboardingContext } from "./OnboardingContext";

const OnboardingProvider = ({ children, initSteps, initSidebarSteps }: any) => {
  const [steps] = React.useState(initSteps);

  const [sidebarSteps] = React.useState(initSidebarSteps);

  const [activeIndex, setActiveIndex] = React.useState(0);

  const activeStep = React.useMemo(() => {
    return steps[activeIndex];
  }, [activeIndex, steps]);

  const sidebarActiveStep = React.useMemo(() => {
    if (!sidebarSteps) return null;
    return sidebarSteps[activeIndex];
  }, [activeIndex, sidebarSteps]);

  const nextStep = React.useCallback(() => {
    setActiveIndex(activeIndex + 1);
  }, [activeIndex]);

  const prevStep = React.useCallback(() => {
    setActiveIndex(activeIndex - 1);
  }, [activeIndex]);

  const stepperContextValue = React.useMemo(
    () => ({
      steps,
      activeStep,
      sidebarSteps,
      sidebarActiveStep,
      activeIndex,
      nextStep,
      prevStep,
    }),
    [
      steps,
      activeStep,
      sidebarSteps,
      sidebarActiveStep,
      activeIndex,
      nextStep,
      prevStep,
    ]
  );

  return (
    <OnboardingContext.Provider value={stepperContextValue}>
      {children}
    </OnboardingContext.Provider>
  );
};

export { OnboardingProvider };
