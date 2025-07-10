import { useOnboarding } from "@app/_components/onboarding/hooks";
import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { Div, Link } from "@jumbo/shared";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {
  Button,
  IconButton,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React from "react";
import { StepProps } from "../../data";

const Onboarding1Sidebar = () => {
  const { steps, activeIndex } = useOnboarding();
  return (
    <Div
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flex: 1,
      }}
    >
      <Div sx={{ mb: 2 }}>
        <Div sx={{ mb: 3 }}>
          <img src={`${ASSET_IMAGES}/logo.png`} alt="Jumbo React" />
        </Div>
        <Stepper
          activeStep={activeIndex}
          orientation="vertical"
          sx={{
            ".MuiStepLabel-root": {
              paddingBlock: 0,
              color: (theme) => theme.palette.text.secondary,
            },
            "& .MuiStepLabel-iconContainer": {
              pr: 2,
            },
            "& .MuiStepConnector-root": {
              ml: 2.5,
            },
            "& .MuiStepConnector-line": {
              minHeight: 32,
              borderColor: "inherit",
            },
            "& .Mui-active, & .MuiStepLabel-label.Mui-active": {
              color: (theme) => theme.palette.primary.main,
            },
            "& .Mui-completed, & .MuiStepLabel-label.Mui-completed": {
              color: (theme) => theme.palette.success.main,
            },
          }}
        >
          {steps.map((item: StepProps) => (
            <Step key={item.label}>
              <StepLabel
                StepIconComponent={() => (
                  <IconButton
                    sx={{
                      border: 1,
                      borderRadius: 2,
                      color: "inherit",
                    }}
                  >
                    {item.icon}
                  </IconButton>
                )}
              >
                <React.Fragment>
                  <Typography variant="h5" mb={0.25} color={"inherit"}>
                    {item.label}
                  </Typography>
                  <Typography color={"text.secondary"} variant="body2">
                    {item.description}
                  </Typography>
                </React.Fragment>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Div>
      <Link to={"/"}>
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          sx={{
            color: (theme) => theme.palette.text.primary,
            "&:hover": { background: "transparent" },
            textTransform: "none",
            fontSize: 15,
            letterSpacing: 0,
          }}
          disableRipple
        >
          Back to home
        </Button>
      </Link>
    </Div>
  );
};

export { Onboarding1Sidebar };
