import { Div } from "@jumbo/shared";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";

import {
  RiMailUnreadLine,
  RiNotificationLine,
  RiSmartphoneLine,
} from "react-icons/ri";

import { AccordionsItem } from "@app/_components/common";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";

const NotificationAccordion = () => {
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
                {"Comments"}
              </Typography>
              <Typography variant="body1">{"Push, SMS"}</Typography>
            </Div>
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
              {"Job Alerts"}
            </Typography>
            <Typography variant="body1">{"Push, Email, SMS"}</Typography>
          </Div>
        </AccordionSummary>
        <AccordionDetails>
          <List
            disablePadding
            sx={{
              ".MuiListItemIcon-root": {
                border: 1,
                borderColor: "divider",
                width: 42,
                height: 42,
                borderRadius: 2,
                alignItems: "center",
                justifyContent: "center",
                minWidth: 42,
                mr: 2.5,
              },
              ".MuiListItem-root": {
                paddingBlock: 0.5,
              },
            }}
          >
            <ListItem disableGutters>
              <ListItemIcon>
                <RiNotificationLine fontSize={22} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="h5" mb={0.5}>
                    In-app Notifications
                  </Typography>
                }
                secondary="Notifications delivered inside the app"
              />
              <Switch defaultChecked />
            </ListItem>

            {/* SMS Notifications */}
            <ListItem disableGutters>
              <ListItemIcon>
                <RiSmartphoneLine fontSize={22} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="h5" mb={0.5}>
                    SMS Notifications
                  </Typography>
                }
                secondary="Notifications delivered to the phone via SMS"
              />
              <Switch defaultChecked />
            </ListItem>

            {/* Email Notifications */}
            <ListItem disableGutters>
              <ListItemIcon>
                <RiMailUnreadLine fontSize={22} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="h5" mb={0.5}>
                    Email Notifications
                  </Typography>
                }
                secondary="Notifications delivered to your primary email address abc@example.com"
              />
              <Switch defaultChecked />
            </ListItem>
          </List>
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
                {"Skill Assessment Recommendations"}
              </Typography>
              <Typography variant="body1">{"SMS, Email, In-App"}</Typography>
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
                {"Career Advice"}
              </Typography>
              <Typography variant="body1">{"SMS, In-App"}</Typography>
            </Div>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <AccordionsItem />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
export { NotificationAccordion };
