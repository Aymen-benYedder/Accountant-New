import { useOnboarding } from "@app/_components/onboarding/hooks";
import { Div } from "@jumbo/shared";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import EastIcon from "@mui/icons-material/East";
import { alpha, Button } from "@mui/material";
const Onboarding1Action = () => {
  const { prevStep, nextStep, steps, activeIndex } = useOnboarding();
  return (
    <Div
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mt: 2,
      }}
    >
      <Button
        startIcon={<KeyboardBackspaceIcon />}
        disabled={activeIndex === 0}
        onClick={() => prevStep()}
        sx={{
          color: (theme) => theme.palette.text.primary,
          "&:hover": { background: "transparent" },
          textTransform: "none",
          fontSize: 15,
          letterSpacing: 0,
        }}
      >
        Back
      </Button>
      <Div
        sx={{
          display: "flex",
          gap: "8px",
        }}
      >
        {Array.from({ length: steps?.length }).map((_, index) => (
          <Div
            key={index}
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: (theme) =>
                index === activeIndex
                  ? `${theme.palette.success.main}`
                  : `${alpha(theme.palette.text.disabled, 0.5)}`,
              transition: "background-color 0.3s ease",
            }}
          />
        ))}
      </Div>
      <Button
        endIcon={<EastIcon />}
        onClick={() => nextStep()}
        disabled={activeIndex === steps?.length - 1}
        variant={"contained"}
        sx={{
          borderRadius: 5,
          textTransform: "none",
          fontSize: 15,
          letterSpacing: 0,
        }}
        disableElevation
      >
        Continue
      </Button>
    </Div>
  );
};

export { Onboarding1Action };
