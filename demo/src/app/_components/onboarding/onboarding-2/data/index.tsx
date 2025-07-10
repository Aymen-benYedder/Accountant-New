import { paymentCardData, PaymentMethods } from "@app/_components/common";
import { JumboCard } from "@jumbo/components";
import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";
import { Div } from "@jumbo/shared";
import AddIcon from "@mui/icons-material/Add";
import { Button, IconButton, Link, Tooltip, Typography } from "@mui/material";
import React from "react";
import { OnboardingAction } from "../../common";
import Grid from "@mui/material/Grid2";

const PersonalDetail = () => {
  const { theme } = useJumboTheme();
  return (
    <React.Fragment>
      <JumboCard
        title={"Payment Methods"}
        subheader={"Add multiple payment methods you have"}
        action={
          <>
            <Tooltip
              title="Add Payment Method"
              placement="top"
              sx={{ display: { md: "none" } }}
            >
              <IconButton color="primary" size="small">
                <AddIcon />
              </IconButton>
            </Tooltip>
            <Button
              startIcon={<AddIcon />}
              sx={{
                display: { xs: "none", md: "inline-flex" },
                textTransform: "none",
                letterSpacing: 0,
                "&:hover": { background: "transparent" },
              }}
              disableRipple
            >
              Add Payment Method
            </Button>
          </>
        }
        contentWrapper
        sx={{ mb: 4 }}
        contentSx={{ pt: 0 }}
      >
        <Grid container spacing={{ xs: 2, lg: 3 }}>
          <Grid size={{ xs: 12, lg: 7 }}>
            <PaymentMethods data={paymentCardData} />
          </Grid>
          <Grid size={{ xs: 12, lg: 5 }}>
            <Div
              sx={{
                [theme.breakpoints.up("lg")]: {
                  borderLeft: 1,
                  borderColor: "divider",
                  minHeight: `calc(100% - 20px)`,
                  p: 3,
                  mt: 1.5,
                },
                mb: { xs: 3, lg: 0 },
              }}
            >
              <Typography variant="h4" mb={2}>
                Tips about payment methods
              </Typography>
              <Typography variant="body2" color={"text.secondary"} mb={2}>
                All of these payment methods will be available throughout the
                checkout process you use.
              </Typography>
              <Typography variant="body2" color={"text.secondary"}>
                To receive payments, you need to add payment methods under{" "}
                <Link href="#" underline="none">
                  Settings
                </Link>{" "}
                &gt;{" "}
                <Link href="#" underline="none">
                  Payment
                </Link>{" "}
                Methods.
              </Typography>
            </Div>
          </Grid>
        </Grid>
      </JumboCard>
      <OnboardingAction />
    </React.Fragment>
  );
};
export const steps: any = [
  {
    key: "personal-detail",
    component: PersonalDetail,
  },
  {
    key: "about-organisation",
    component: PersonalDetail,
  },
  {
    key: "payment-detail",
    component: PersonalDetail,
  },
  {
    key: "billing-address",
    component: PersonalDetail,
  },
  {
    key: "final-onboarding",
    component: PersonalDetail,
  },
];
