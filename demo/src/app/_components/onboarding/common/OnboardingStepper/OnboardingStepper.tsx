import { useOnboarding } from "@app/_components/onboarding/hooks";
import { Div } from "@jumbo/shared";
import { Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";

const OnboardingStepper = () => {
  const { steps, activeIndex } = useOnboarding();

  return (
    <Div>
      {/* Step Progress */}
      <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
        {activeIndex + 1} of {steps?.length}
      </Typography>
      <Div
        sx={{
          display: "flex",
          mb: 4,
          gap: "6px",
        }}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <Div
            key={index}
            sx={{
              width: index === activeIndex ? "54px" : "24px",
              height: "4px",
              backgroundColor:
                index <= activeIndex
                  ? index === activeIndex
                    ? deepOrange["800"]
                    : (theme) => theme.palette.success.main
                  : "#D9D9D9",
              borderRadius: "2px",
            }}
          />
        ))}
      </Div>
    </Div>
  );
};

export { OnboardingStepper };
