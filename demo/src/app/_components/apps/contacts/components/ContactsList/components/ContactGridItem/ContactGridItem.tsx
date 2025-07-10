import {
  List,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import StarIcon from "@mui/icons-material/Star";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import BusinessIcon from "@mui/icons-material/Business";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhoneIcon from "@mui/icons-material/Phone";
import { Div } from "@jumbo/shared";
import { LabelChips } from "../../../../../common_components/LabelChips";
import { ContactProps } from "@app/_components/apps/_types/ContactTypes";
import Grid from "@mui/material/Grid2";

const ContactGridItem = ({ contact }: { contact: ContactProps }) => {
  return (
    <Grid size={{ xs: 12, lg: 6 }}>
      <Card variant="outlined" sx={{ boxShadow: "none" }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ width: 48, height: 48 }}
              alt={contact.name}
              src={contact.profile_pic}
            />
          }
          action={
            <React.Fragment>
              <StarIcon
                sx={{ color: "warning.main", verticalAlign: "middle", mr: 1 }}
              />
              <IconButton>
                <MoreHorizIcon />
              </IconButton>
            </React.Fragment>
          }
          title={
            <Typography variant={"h6"} color={"text.primary"} mb={0.25}>
              {contact.name}
            </Typography>
          }
          subheader={
            <Typography variant={"body1"} color={"text.secondary"}>
              {contact.designation}
            </Typography>
          }
        />
        <CardContent sx={{ pt: 0 }}>
          <Divider sx={{ mb: 2 }} />
          <List disablePadding>
            <ListItem sx={{ p: (theme) => theme.spacing(0.75, 1.5) }}>
              <ListItemIcon sx={{ minWidth: 50 }}>
                <BusinessIcon />
              </ListItemIcon>
              <ListItemText primary={contact.company} />
            </ListItem>
            <ListItem sx={{ px: 1.5 }}>
              <ListItemIcon sx={{ minWidth: 50 }}>
                <AlternateEmailIcon />
              </ListItemIcon>
              <ListItemText primary={contact.email} />
            </ListItem>
            <ListItem sx={{ px: 1.5 }}>
              <ListItemIcon sx={{ minWidth: 50 }}>
                <PhoneIcon />
              </ListItemIcon>
              <ListItemText primary={contact.phone} />
            </ListItem>
          </List>
          <Divider sx={{ my: 2 }} />
          <Div
            sx={{
              display: "flex",
              minWidth: 0,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Checkbox sx={{ my: -0.5 }} />
            {contact?.labels?.length == 0 ? null : (
              <LabelChips
                labelsArray={contact?.labels}
                mapKeys={{ label: "name" }}
                spacing={1}
                size={"small"}
                max={3}
              />
            )}
          </Div>
        </CardContent>
      </Card>
    </Grid>
  );
};

export { ContactGridItem };
