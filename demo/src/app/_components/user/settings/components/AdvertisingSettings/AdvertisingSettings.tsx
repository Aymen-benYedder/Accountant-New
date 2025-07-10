import { Div } from "@jumbo/shared";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AlertTitle,
  Box,
  Typography,
} from "@mui/material";

import { AccordionsItem } from "@app/_components/common";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SettingHeader } from "../../SettingHeader";
import { SampleAccordion } from "./SampleAccordion";

const AdvertisingSettings = () => {
  return (
    <Div sx={{ mb: 2 }}>
      <SettingHeader title={"Advertising Preferences"} divider sx={{ mb: 3 }} />

      <Alert
        severity="info"
        sx={{
          border: 1,
          borderColor: "info.main",
          alignItems: "center",
          borderRadius: 3,
          mb: 3,
          ".MuiAlert-icon": {
            fontSize: 26,
          },
        }}
      >
        <AlertTitle fontSize={18} mb={0}>
          Let us help you to get more tailored ads
        </AlertTitle>
        <Typography variant="body1" color={"text.primary"}>
          3 easy ways to configure 2 factor authentication for your account
        </Typography>
      </Alert>

      <Typography variant="h3" fontSize={18} ml={1} mb={3}>
        Profile Data
      </Typography>
      <Div sx={{ mb: 3.75 }}>
        <SampleAccordion />
      </Div>
      <Typography variant="h3" fontSize={18} ml={1} mb={3}>
        Activity and inferred data
      </Typography>

      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Div>
                <Typography variant="h4" fontSize={16}>
                  {"Inferred City Location"}
                </Typography>
                <Typography variant="body1">
                  We may infer your city from your IP address. Can we use that
                  data to show you personalised...
                </Typography>
              </Div>
              <Typography mr={2}>{"On"}</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <AccordionsItem />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Div>
                <Typography variant="h4" fontSize={16}>
                  {" "}
                  {"Interest and Traits"}
                </Typography>
                <Typography variant="body1">
                  Can we use interests and traits we derived from your LinkedIn
                  profile and activity to show you...
                </Typography>
              </Div>
              <Typography mr={2}>{"On"}</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <AccordionsItem />
          </AccordionDetails>
        </Accordion>
      </div>
    </Div>
  );
};
export { AdvertisingSettings };
