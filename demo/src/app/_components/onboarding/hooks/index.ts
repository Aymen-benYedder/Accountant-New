import { useContext } from "react";
import { OnboardingContext } from "../OnboardingProvider";

function useOnboarding() {
  return useContext(OnboardingContext);
}

export { useOnboarding };
