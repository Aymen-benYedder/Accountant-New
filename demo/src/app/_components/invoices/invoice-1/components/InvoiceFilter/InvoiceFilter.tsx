import { SortedWithFilter } from "@app/_components/common";
import {
  alpha,
  Avatar,
  Box,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { RiFilterLine } from "react-icons/ri";
import { invoiceFilterData } from "../../data";
import { InvoiceDropdown } from "../InvoiceDropdown";
import { SortedWithFilterDropdown } from "../SortedWithFilterDropdown";

const InvoiceFilter = () => {
  const [selectedFilter, setSelectedFilter] = React.useState("all");

  return (
    <>
      <Stack
        direction={"row"}
        spacing={1}
        alignItems={"center"}
        borderRadius={2}
        sx={{
          p: (theme) => theme.spacing(0.75, 1),
          backgroundColor: (theme) => alpha(theme.palette.common.black, 0.05),
          display: { lg: "none" },
        }}
      >
        <InvoiceDropdown />
        <SortedWithFilterDropdown />
      </Stack>

      <Stack
        direction={"row"}
        spacing={2}
        alignItems={"center"}
        sx={{ display: { xs: "none", lg: "flex" } }}
      >
        <Box
          display="flex"
          alignItems="center"
          borderRadius={2}
          sx={{
            p: (theme) => theme.spacing(0.75, 1, 0.75, 1.75),
            backgroundColor: (theme) => alpha(theme.palette.common.black, 0.05),
          }}
        >
          <Typography
            variant="body1"
            sx={{
              textTransform: "uppercase",
              fontSize: 12,
              letterSpacing: 1.5,
              mr: 1.25,
            }}
          >
            INVOICES
          </Typography>
          {invoiceFilterData.map((item, index) => (
            <Chip
              key={index}
              label={item.category}
              avatar={<Avatar>{item.count}</Avatar>}
              onClick={() => setSelectedFilter(item.slug)}
              variant={"outlined"}
              color={selectedFilter === item.slug ? "primary" : "default"}
              sx={{
                flexDirection: "row-reverse",
                borderRadius: "24px",
                mr: 1,
                ".MuiChip-label": {
                  paddingInline: 1.5,
                },
                ".MuiChip-avatar": {
                  mr: 0.75,
                  ml: -0.5,
                },
              }}
            />
          ))}
        </Box>
        <SortedWithFilter data={[{ label: "Owner" }, { label: "Admin" }]} />
        <IconButton
          sx={{
            border: 1,
            borderRadius: 1.5,
            fontSize: 18,
            display: { xs: "none", xl: "inline-flex" },
          }}
          color="primary"
        >
          <RiFilterLine />
        </IconButton>
      </Stack>
    </>
  );
};

export { InvoiceFilter };
