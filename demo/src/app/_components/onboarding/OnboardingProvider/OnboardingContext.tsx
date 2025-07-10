import React from "react";

export interface OnboardingProps {
  steps: any;
  activeStep: any;
  sidebarSteps: any;
  sidebarActiveStep?: any;
  activeIndex: number;
  nextStep: () => void;
  prevStep: () => void;
}

const onboardingValue = {
  steps: {},
  activeStep: {},
  sidebarSteps: {},
  activeIndex: 0,
  sidebarActiveStep: {},
  nextStep: () => {},
  prevStep: () => {},
};
const OnboardingContext = React.createContext<OnboardingProps>(onboardingValue);

export { OnboardingContext };
