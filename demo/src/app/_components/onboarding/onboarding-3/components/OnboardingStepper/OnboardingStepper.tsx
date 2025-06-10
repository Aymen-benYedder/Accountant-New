import { useOnboarding } from "@app/_components/onboarding/hooks";
import { Div } from "@jumbo/shared";
import { Typography } from "@mui/material";

const OnboardingStepper = () => {
  const { steps, activeIndex } = useOnboarding();

  return (
    <Div>
      {/* Step Progress */}
      <Typography variant="body2" sx={{ mb: 1 }}>
        {activeIndex + 1} of {steps?.length}
      </Typography>
      <Div
        sx={{
          display: "flex",
          mb: 2,
          gap: 1,
        }}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <Div
            key={index}
            sx={{
              width: "30px",
              height: "4px",
              backgroundColor:
                index <= activeIndex
                  ? index === activeIndex
                    ? "#00bcd4"
                    : "#4caf50"
                  : "#d3d3d3",
              borderRadius: "2px",
            }}
          />
        ))}
      </Div>
    </Div>
  );
};

export { OnboardingStepper };
