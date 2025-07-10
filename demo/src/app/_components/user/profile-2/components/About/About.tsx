import { Div } from "@jumbo/shared";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import {
  RiBuildingLine,
  RiCalendar2Line,
  RiCommunityLine,
  RiGraduationCapLine,
  RiMapPinLine,
} from "react-icons/ri";

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  fontSize: 24,
  height: 48,
  width: 48,
  borderRadius: 12,
  minWidth: 42,
  marginRight: 16,
  padding: theme.spacing(1),
  alignItems: "center",
  justifyContent: "center",
  border: `solid 1px ${theme.palette.divider}`,
}));

const About = () => {
  return (
    <React.Fragment>
      <Div sx={{ mb: 2 }}>
        <Typography
          variant="subtitle2"
          color={"text.secondary"}
          fontSize={12}
          fontWeight={400}
          letterSpacing={1.5}
          textTransform={"uppercase"}
        >
          WORK DETAIL
        </Typography>
        <List
          disablePadding
          sx={{
            display: "flex",
            flexWrap: "wrap",
            margin: (theme) => theme.spacing(0, -2),
          }}
        >
          <ListItem
            sx={{
              width: { xs: "100%", sm: "50%", xl: "33.33%" },
            }}
          >
            <StyledListItemIcon>
              <RiBuildingLine fontSize={"inherit"} />
            </StyledListItemIcon>
            <ListItemText
              primary={
                <Typography
                  fontSize={"12px"}
                  variant="h6"
                  color="text.secondary"
                  mb={0.5}
                >
                  company
                </Typography>
              }
              secondary={
                <Typography variant="body1" color="text.primary">
                  Example ABC Inc.
                </Typography>
              }
            />
          </ListItem>

          <ListItem
            sx={{
              width: { xs: "100%", sm: "50%", xl: "33.33%" },
            }}
          >
            <StyledListItemIcon>
              <RiMapPinLine fontSize={"inherit"} />
            </StyledListItemIcon>
            <ListItemText
              primary={
                <Typography
                  fontSize={"12px"}
                  variant="h6"
                  color="text.secondary"
                  mb={0.5}
                >
                  work location
                </Typography>
              }
              secondary={
                <Typography variant="body1" color="text.primary">
                  California, USA
                </Typography>
              }
            />
          </ListItem>

          <ListItem
            sx={{
              width: { xs: "100%", sm: "50%", xl: "33.33%" },
            }}
          >
            <StyledListItemIcon>
              <RiCalendar2Line fontSize={"inherit"} />
            </StyledListItemIcon>
            <ListItemText
              primary={
                <Typography
                  fontSize={"12px"}
                  variant="h6"
                  color="text.secondary"
                  mb={0.5}
                >
                  work period
                </Typography>
              }
              secondary={
                <Typography variant="body1" color="text.primary">
                  2021 - Present
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Div>
      <Div>
        <Typography
          variant="subtitle2"
          color={"text.secondary"}
          fontSize={12}
          fontWeight={400}
          letterSpacing={1.5}
          textTransform={"uppercase"}
        >
          EDUCATION DETAIL
        </Typography>
        <List
          disablePadding
          sx={{
            display: "flex",
            flexWrap: "wrap",
            margin: (theme) => theme.spacing(0, -2),
          }}
        >
          <ListItem
            sx={{
              width: { xs: "100%", sm: "50%", xl: "33.33%" },
            }}
          >
            <StyledListItemIcon>
              <RiCommunityLine fontSize={"inherit"} />
            </StyledListItemIcon>
            <ListItemText
              primary={
                <Typography
                  fontSize={"12px"}
                  variant="h6"
                  color="text.secondary"
                  mb={0.5}
                >
                  insititution
                </Typography>
              }
              secondary={
                <Typography variant="body1" color="text.primary">
                  Oxford, London
                </Typography>
              }
            />
          </ListItem>
          <ListItem
            sx={{
              width: { xs: "100%", sm: "50%", xl: "33.33%" },
            }}
          >
            <StyledListItemIcon>
              <RiGraduationCapLine fontSize={"inherit"} />
            </StyledListItemIcon>
            <ListItemText
              primary={
                <Typography
                  fontSize={"12px"}
                  variant="h6"
                  color="text.secondary"
                  mb={0.5}
                >
                  qualification
                </Typography>
              }
              secondary={
                <Typography variant="body1" color="text.primary">
                  B.Tech Computer Science
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Div>
    </React.Fragment>
  );
};

export { About };
