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
import { NotificationAccordion } from "./NotificationAccordion";

const NotificationSettings = () => {
  return (
    <Div sx={{ mb: 2 }}>
      <SettingHeader
        title={"Notification Preferences"}
        divider
        sx={{ mb: 3 }}
      />
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
          Notification Settings
        </AlertTitle>
        <Typography variant="body1" color={"text.primary"}>
          ABC Company may still send you important notifications about your
          account and content outside of your preferred notification settings.
        </Typography>
      </Alert>
      <Div sx={{ mb: 3.75 }}>
        <NotificationAccordion />
      </Div>

      <Typography variant="h3" fontSize={18} ml={1} mb={3}>
        Hiring Someone
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
                  {"Job Post Update"}
                </Typography>
                <Typography variant="body1">{"SMS, In-App"}</Typography>
              </Div>
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
                  {"Candidate Interviews"}
                </Typography>
                <Typography variant="body1">{"SMS, Email"}</Typography>
              </Div>
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
export { NotificationSettings };
