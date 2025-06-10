import {
  Box,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  FormGroup,
  Link,
  List,
  Stack,
} from "@mui/material";
import React from "react";

import {
  Button,
  Checkbox,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import { Div, Span } from "@jumbo/shared";
import { ListItem, ListItemText } from "@mui/material";

import { RiDeleteBin3Line } from "react-icons/ri";
import { SettingHeader } from "../../SettingHeader";

const EmailAccessSettings = () => {
  return (
    <>
      <SettingHeader title={"Email Access"} divider sx={{ mb: 3 }} />
      <Card sx={{ mb: 3.75 }}>
        <CardContent>
          <Div sx={{ display: "flex", minWidth: 0, alignItems: "flex-start" }}>
            <Div sx={{ flex: 1, mr: 2 }}>
              <Typography variant="h4">
                smith.chris@example.com - {""}
                <Span sx={{ color: "success.main" }}>Primary</Span>
              </Typography>
              <Typography variant="body1">
                This email will be used for account-related notifications and
                can also be used for password resets.
              </Typography>
            </Div>
            <Stack
              spacing={1}
              direction={"row"}
              alignItems={"center"}
              flexShrink={0}
            >
              <IconButton aria-label="delete">
                <RiDeleteBin3Line />
              </IconButton>
            </Stack>
          </Div>
          <List
            sx={{
              listStyle: "disc",
              pl: 2,
              ".MuiListItem-root": {
                display: "list-item",
                py: 0.5,
              },
            }}
          >
            <ListItem disableGutters>
              <ListItemText
                primary={
                  <Typography variant="h5" fontSize={15} mb={0.5}>
                    Visible in emails
                  </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: "text.primary", display: "inline" }}
                    >
                      This email may be used as the ‘author’ address for
                      web-based operations
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primary={
                  <Typography variant="h5" fontSize={15} mb={0.5}>
                    Receives notifications
                  </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: "text.primary", display: "inline" }}
                    >
                      This email address is the default used for notifications
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        </CardContent>
        <Divider />
        <CardContent>
          <Div sx={{ display: "flex", minWidth: 0, alignItems: "flex-start" }}>
            <Div sx={{ flex: 1, mr: 2 }}>
              <Typography variant="h4">c.smith@example.com</Typography>
              <Typography variant="body1">
                This email will be used for account-related notifications and
                can also be used for password resets.
              </Typography>
            </Div>
            <Stack
              spacing={1}
              direction={"row"}
              alignItems={"center"}
              flexShrink={0}
            >
              <Button
                size="small"
                variant="outlined"
                sx={{ textTransform: "none" }}
              >
                make primary
              </Button>
              <IconButton aria-label="delete" color="error">
                <RiDeleteBin3Line />
              </IconButton>
            </Stack>
          </Div>
          <List
            sx={{
              listStyle: "disc",
              pl: 2,
              pb: 0,
              ".MuiListItem-root": {
                display: "list-item",
                py: 0.5,
              },
            }}
          >
            <ListItem disableGutters>
              <ListItemText
                primary={
                  <Typography variant="h5" fontSize={15} mb={0.5}>
                    <Typography
                      component={"span"}
                      fontSize={"inherit"}
                      color={"warning.main"}
                    >
                      Unverified
                    </Typography>{" "}
                    -{" "}
                    <Link href="#" underline="none">
                      Resend Verification Email
                    </Link>
                  </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: "text.primary", display: "inline" }}
                    >
                      Unverified email addresses cannot receive notifications or
                      be used to reset your password.
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primary={
                  <Typography variant="h5" fontSize={15} mb={0.5}>
                    Not visible in Emails
                  </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: "text.primary", display: "inline" }}
                    >
                      This email address is not going to be used anywhere in the
                      app.
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3.75 }}>
        <CardContent>
          <Typography variant="h4" mb={0.5}>
            Add Email
          </Typography>
          <Typography variant="body1" mb={2}>
            This email can be used to recover password or to get notified along
            with the primary email
          </Typography>
          <Box display="flex" alignItems="center" mt={1}>
            <TextField
              label="Email"
              variant="outlined"
              size="small"
              sx={{ mr: 2, width: 360, maxWidth: "100%" }}
            />
            <Button
              variant="contained"
              size="medium"
              sx={{ flexShrink: 0, boxShadow: "none" }}
            >
              Add
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3.75 }}>
        <CardContent>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={
                <Typography variant="body1" fontSize={15}>
                  Keep my email addresses private
                </Typography>
              }
            />
          </FormGroup>
          <Typography variant={"body1"}>
            We’ll remove your public profile email and use
            abc-org@users.noreply.example.com for communication.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export { EmailAccessSettings };
