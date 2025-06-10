import { JumboCard } from "@jumbo/components";
import { Div, Link, Span } from "@jumbo/shared";
import { FiberManualRecord } from "@mui/icons-material";
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import { RiArrowRightUpLine } from "react-icons/ri";
import { MembershipPlanChart } from "../MembershipPlanChart";
import { MembershipPlansList } from "../MembershipPlansList";

const PlansUsage = () => {
  return (
    <React.Fragment>
      <Grid container spacing={3.75} mb={3.75}>
        <Grid size={{ xs: 12, md: 6, lg: 12, xl: 4 }}>
          <JumboCard
            title={"Current Plan"}
            subheader={"Monthly"}
            contentWrapper
            contentSx={{ pt: 0 }}
          >
            <Stack
              direction={"row"}
              spacing={2}
              justifyContent={"space-between"}
            >
              <Stack spacing={1}>
                <Typography variant="h3" component={"div"}>
                  $19
                  <Span sx={{ color: "text.secondary", fontSize: 13 }}>
                    /Month
                  </Span>
                </Typography>
                <Typography color={"error"} component={"span"}>
                  Expires in 23 days
                </Typography>
                <Link href="" underline="none">
                  Features
                </Link>
              </Stack>
              <Stack spacing={1}>
                <Button variant="contained" disableElevation size="small">
                  Renew
                </Button>
                <Button
                  variant="contained"
                  color="inherit"
                  size="small"
                  disableElevation
                >
                  Upgrade
                </Button>
              </Stack>
            </Stack>
          </JumboCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 12, xl: 4 }}>
          <JumboCard
            title={"Payment Due"}
            subheader={"Due on 05/09/2025"}
            contentWrapper
            contentSx={{ pt: 0 }}
          >
            <Stack
              direction={"row"}
              spacing={2}
              alignItems={"flex-start"}
              justifyContent={"space-between"}
            >
              <Div>
                <Typography variant="h3" component={"div"}>
                  $38.00
                </Typography>
                <Link href="" underline="none" style={{ display: "block" }}>
                  Bill Summary{" "}
                  <Span sx={{ display: "block", ml: -0.25, mt: 0.6 }}>
                    <RiArrowRightUpLine fontSize={18} />
                  </Span>
                </Link>
              </Div>

              <Button variant="contained" size="small" disableElevation>
                Pay
              </Button>
            </Stack>
          </JumboCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 12, xl: 4 }}>
          <JumboCard title={"Quick Links"} contentWrapper contentSx={{ pt: 2 }}>
            <Stack spacing={1} mb={1.5}>
              <Link href={"#"} underline="none">
                Payment Methods <RiArrowRightUpLine />
              </Link>

              <Link href={"#"} underline="none">
                Manage Spending Limits <RiArrowRightUpLine />
              </Link>

              <Link href={"#"} underline="none">
                View Payment History <RiArrowRightUpLine />
              </Link>
            </Stack>
          </JumboCard>
        </Grid>
      </Grid>

      <JumboCard
        title={"Cost & Usage"}
        subheader={"This year"}
        headerSx={{ alignContent: "center" }}
        action={
          <List disablePadding>
            <ListItem
              sx={{
                width: "auto",
                display: "inline-flex",
                padding: (theme) => theme.spacing(0, 0.5),
              }}
            >
              <ListItemIcon sx={{ minWidth: 16 }}>
                <FiberManualRecord
                  sx={{ fontSize: "14px", color: "#033DAE" }}
                />
              </ListItemIcon>
              <ListItemText secondary="Projects" />
            </ListItem>
            <ListItem
              sx={{
                width: "auto",
                display: "inline-flex",
                padding: (theme) => theme.spacing(0, 0.5),
              }}
            >
              <ListItemIcon sx={{ minWidth: 16 }}>
                <FiberManualRecord
                  sx={{ color: "#00bfb3", fontSize: "14px" }}
                />
              </ListItemIcon>
              <ListItemText secondary="Downloads" />
            </ListItem>
            <ListItem
              sx={{
                width: "auto",
                display: "inline-flex",
                padding: (theme) => theme.spacing(0, 0.5),
              }}
            >
              <ListItemIcon sx={{ minWidth: 16 }}>
                <FiberManualRecord
                  sx={{ color: "#FF9D57", fontSize: "14px" }}
                />
              </ListItemIcon>
              <ListItemText secondary="Requests" />
            </ListItem>
          </List>
        }
        sx={{
          "& .MuiCardHeader-action": {
            alignSelf: "flex-end",
          },
          mb: 3.75,
        }}
        contentWrapper={true}
      >
        <MembershipPlanChart />
      </JumboCard>
      <Typography variant="h3" fontSize={18} mb={3} ml={0.5}>
        Cost Description
      </Typography>
      <MembershipPlansList />
    </React.Fragment>
  );
};

export { PlansUsage };
