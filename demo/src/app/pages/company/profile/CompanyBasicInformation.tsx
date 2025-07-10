import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";

interface Owner {
  _id: string;
  name: string;
  email?: string;
}

interface CompanyInfo {
  _id: string;
  name: string;
  tin: string;
  address?: string;
  createdAt?: string;
  owners?: Owner[];
}

const CompanyBasicInformation: React.FC<{ company: CompanyInfo }> = ({
  company,
}) => {
  const rows = [
    {
      key: "TIN",
      value: company.tin ?? "--",
      icon: <BadgeOutlinedIcon />,
    },
    {
      key: "Company name",
      value: company.name ?? "--",
      icon: <BadgeOutlinedIcon />,
    },
    {
      key: "Since",
      value: company.createdAt
        ? new Date(company.createdAt).toLocaleDateString()
        : "--",
      icon: <CalendarTodayOutlinedIcon />,
    },
    {
      key: "Address",
      value: company.address ?? "--",
      icon: <LocationOnOutlinedIcon />,
    },
    {
      key: "Owners",
      value:
        company.owners && company.owners.length > 0
          ? company.owners
              .map((owner) =>
                `${owner.name}${owner.email ? " (" + owner.email + ")" : ""}`
              )
              .join(", ")
          : "--",
      icon: <SupervisorAccountOutlinedIcon />,
    },
  ];

  return (
    <List
      disablePadding
      sx={{
        display: "flex",
        minWidth: 0,
        flexWrap: "wrap",
        color: "text.secondary",
        borderBottom: 1,
        borderColor: "divider",
        mb: 3.75,
        pb: 2,
        ".MuiListItem-root": {
          pl: 0,
          py: 0.5,
          width: { xs: "100%", md: "50%" },
        },
        ".MuiListItemIcon-root": {
          color: "inherit",
          minWidth: 38,
        },
        ".MuiListItemText-root": {
          display: "flex",
          minWidth: 0,
        },
      }}
    >
      {rows.map((item, index) => (
        <ListItem key={index}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body1" width={"50%"}>
                {item.key}
              </Typography>
            }
            secondary={
              <Typography variant="body1" color="text.primary" width={"50%"}>
                {item.value}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default CompanyBasicInformation;