import { useOnboarding } from "@app/_components/onboarding/hooks";
import { Button, Stack } from "@mui/material";
const OnboardingAction = () => {
  const { prevStep, nextStep, steps, activeIndex } = useOnboarding();
  return (
    <Stack direction={"row"} spacing={2}>
      <Button
        variant="outlined"
        sx={{ borderRadius: 5, px: 3 }}
        onClick={() => prevStep()}
        disabled={activeIndex === 0}
      >
        Back
      </Button>
      <Button
        disableElevation
        variant="contained"
        sx={{ borderRadius: 5, px: 3 }}
        onClick={() => nextStep()}
        disabled={activeIndex === steps?.length - 1}
      >
        Continue
      </Button>
    </Stack>
  );
};

export { OnboardingAction };
