import { alpha, Button, Stack } from "@mui/material";

import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { JumboCard } from "@jumbo/components";
import { Div } from "@jumbo/shared";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

const OrganizationCard = () => {
  return (
    <JumboCard
      contentWrapper
      sx={{
        background: (theme) => alpha(theme.palette.primary.main, 0.25),
        boxShadow: "none",
        mb: 4,
      }}
    >
      <Stack spacing={3} direction={{ xs: "column", md: "row" }}>
        {/* Your central icon can go here */}
        <Div sx={{ flexShrink: 0 }}>
          <img
            src={`${ASSET_IMAGES}/organizations.png`}
            style={{ borderRadius: "32px" }}
          />
        </Div>
        <Div>
          <Typography variant="h2">
            Onboard your team with an organization account
          </Typography>
          <Typography variant="h4">
            With an organization account, you get the benefits of
          </Typography>
          <List
            disablePadding
            sx={{ mb: 2, ".MuiListItemIcon-root": { minWidth: 30 } }}
          >
            {[
              "Create Private Projects",
              "Billing and Payroll Solution",
              "Customer Support Module Access",
            ].map((text, index) => (
              <ListItem key={index} disablePadding>
                <ListItemIcon>
                  <CheckCircleIcon sx={{ fontSize: 20 }} color="success" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body1" fontSize={16}>
                      {text}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
          <Button variant="outlined" sx={{ textTransform: "none" }}>
            Create Organization
          </Button>
        </Div>
      </Stack>
    </JumboCard>
  );
};
export { OrganizationCard };
