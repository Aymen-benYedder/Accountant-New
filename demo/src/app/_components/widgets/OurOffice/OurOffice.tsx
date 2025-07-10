import React, { useState } from "react";
import {
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Fab from "@mui/material/Fab";
import { BranchesProps, branches } from "./data";
import { JumboCard } from "@jumbo/components";
import { Div } from "@jumbo/shared";
//t('widgets.title.ourOffice')
const OurOffice = ({ title }: { title: React.ReactNode }) => {
  const [activeBranch, setActiveBranch] = useState(branches[0]);
  const [branchCategory, setBranchCategory] = useState(null);
  const openBranch = Boolean(branchCategory);

  const handleClick = (item: BranchesProps) => {
    setBranchCategory(null);
    setActiveBranch(item);
  };

  return (
    <JumboCard title={title} contentWrapper contentSx={{p:0}}>
      <CardContent sx={{ py: 0 }}>
        <Typography variant={"h6"}>Find our branch locations</Typography>
        <Div>
          <Button
            sx={{ px: 0, textTransform: "none" }}
            disableRipple
            variant={"text"}
            endIcon={<ArrowDropDownOutlinedIcon />}
            onClick={(e: any) => setBranchCategory(e.currentTarget)}
          >
            {activeBranch.title}
          </Button>
          <Menu
            open={openBranch}
            anchorEl={branchCategory}
            onClose={() => setBranchCategory(null)}
          >
            {branches.map((item, index) => (
              <MenuItem onClick={() => handleClick(item)} key={index}>
                {item.title}
              </MenuItem>
            ))}
          </Menu>
        </Div>
      </CardContent>
      <List disablePadding>
        <ListItem
          alignItems="flex-start"
          sx={{ p: (theme) => theme.spacing(1.25, 3) }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: "text.primary" }}>
            <LocationOnIcon />
          </ListItemIcon>
          <ListItemText primary={activeBranch.address} />
        </ListItem>
        <Divider component="li" />
        <ListItem sx={{ p: (theme) => theme.spacing(1.25, 3) }}>
          <ListItemIcon sx={{ minWidth: 36, color: "text.primary" }}>
            <PhoneIcon />
          </ListItemIcon>
          <ListItemText primary={activeBranch.phone} />
        </ListItem>
        <Divider component="li" />
        <ListItem sx={{ p: (theme) => theme.spacing(1.25, 3) }}>
          <ListItemIcon sx={{ minWidth: 36, color: "text.primary" }}>
            <MailOutlineIcon />
          </ListItemIcon>
          <ListItemText primary={activeBranch.email} />
        </ListItem>
      </List>
      <Stack
        direction="row"
        spacing={1}
        sx={{ p: (theme) => theme.spacing(2, 3, 3) }}
      >
        <Fab
          size="small"
          aria-label="Twitter"
          sx={{
            color: "common.white",
            bgcolor: "#2196f3",

            "&:hover": {
              bgcolor: "#2196f3",
            },
          }}
        >
          <Twitter />
        </Fab>
        <Fab
          size="small"
          aria-label="Facebook"
          sx={{
            color: "common.white",
            bgcolor: "#3f51b5",

            "&:hover": {
              bgcolor: "#3f51b5",
            },
          }}
        >
          <Facebook />
        </Fab>
        <Fab
          size="small"
          aria-label="Instagram"
          sx={{
            color: "common.white",
            bgcolor: "#e91e63",

            "&:hover": {
              bgcolor: "#e91e63",
            },
          }}
        >
          <Instagram />
        </Fab>
        <Fab
          size="small"
          aria-label="LinkedIn"
          sx={{
            color: "common.white",
            bgcolor: "#2196f3",

            "&:hover": {
              bgcolor: "#2196f3",
            },
          }}
        >
          <LinkedIn />
        </Fab>
      </Stack>
    </JumboCard>
  );
};

export { OurOffice };
