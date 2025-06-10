import { Div } from "@jumbo/shared";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from "@mui/material";

import { AccordionsItem } from "@app/_components/common";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Switch from "@mui/material/Switch";
const SampleAccordion = () => {
  return (
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
                Connections
              </Typography>
              <Typography variant="body1">
                Can we use information from your 1st-degree connections to show
                you more tailored ads?
              </Typography>
            </Div>
            <Typography mr={2}>{"On"}</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <AccordionsItem />
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Div>
            <Typography variant="h4" fontSize={16}>
              Companies you follow
            </Typography>
            <Typography variant="body1">
              Can we use the list of companies you follow to show you more
              tailored ads?
            </Typography>
          </Div>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Div>
              <Typography mb={2} variant="h4" fontSize={16}>
                Use followed company data
              </Typography>
              <Typography variant="body1" mb={1}>
                This setting also applies to Ads outside of Platform if that
                setting is turned on.
              </Typography>
              <Typography variant="body1">
                Turning this off may make your ads less tailored, but won’t
                reduce the number of ads you see. Changes typically take up to
                72 hours to take effect. Learn More
              </Typography>
            </Div>
            <Div sx={{ display: "flex", alignItems: "center" }}>
              <Typography mr={1}>On</Typography>
              <Switch checked={true} onChange={() => console.log("switch")} />
            </Div>
          </Stack>
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
                Groups
              </Typography>
              <Typography variant="body1">
                Can we use the groups you've joined to show you more tailored
                ads?
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
                Education
              </Typography>
              <Typography variant="body1">
                What educational information can we use to show you more
                tailored ads?
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
  );
};
export { SampleAccordion };
