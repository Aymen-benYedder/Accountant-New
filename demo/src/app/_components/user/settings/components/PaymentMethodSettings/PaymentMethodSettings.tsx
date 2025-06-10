import { paymentCardData, PaymentMethods } from "@app/_components/common";
import { JumboCard } from "@jumbo/components";
import AddIcon from "@mui/icons-material/Add";
import { Button, IconButton, Tooltip } from "@mui/material";
import { SettingHeader } from "../../SettingHeader";

const PaymentMethodSettings = () => {
  return (
    <>
      <SettingHeader title={"Payment Methods"} divider sx={{ mb: 3 }} />
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
        <PaymentMethods data={paymentCardData} />
      </JumboCard>
    </>
  );
};

export { PaymentMethodSettings };
