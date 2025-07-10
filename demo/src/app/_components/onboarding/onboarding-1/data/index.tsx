import { paymentCardData, PaymentMethods } from "@app/_components/common";
import { JumboCard } from "@jumbo/components";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import {
  RiCheckDoubleLine,
  RiHotelLine,
  RiMapPinUserFill,
  RiMastercardFill,
  RiSlideshow2Line,
} from "react-icons/ri";
import { Onboarding1Action } from "../components";

const PersonalDetail = () => {
  return (
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
      sx={{
        display: "flex",
        minWidth: 0,
        flexDirection: "column",
        minHeight: "100%",
      }}
      contentSx={{ flex: 1, pt: 0 }}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        height={"100%"}
      >
        <PaymentMethods data={paymentCardData} />
        <Onboarding1Action />
      </Box>
    </JumboCard>
  );
};

interface StepProps {
  label: string;
  description: string;
  icon: React.ReactNode;
  key: string;
  component: any;
}

const steps: StepProps[] = [
  {
    label: "Your Detail",
    description: "Provide your general detail",
    icon: <RiSlideshow2Line />,
    key: "personal-detail",
    component: PersonalDetail,
  },
  {
    label: "About Organisation",
    description: "Tell us about your company",
    icon: <RiHotelLine />,
    key: "about-organisation",
    component: PersonalDetail,
  },
  {
    label: "Payment Detail",
    description: "Add Payment Method",
    icon: <RiMastercardFill />,
    key: "payment-detail",
    component: PersonalDetail,
  },
  {
    label: "Billing Address",
    description: "Tell us where to deliver",
    icon: <RiMapPinUserFill />,
    key: "billing-address",
    component: PersonalDetail,
  },
  {
    label: "Submit & Done",
    description: "All done!",
    icon: <RiCheckDoubleLine />,
    key: "final-onboarding",
    component: PersonalDetail,
  },
];

export { steps, type StepProps };
