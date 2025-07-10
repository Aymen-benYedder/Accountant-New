import { SortedWithFilter } from "@app/_components/common";
import { Box, Stack, Tab, Tabs } from "@mui/material";
import React from "react";

const Profile4FilterTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = ({}, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        mb={2}
        alignItems={"center"}
        flexWrap={"wrap"}
        gap={2}
      >
        <Tabs value={value} onChange={handleChange}>
          <Tab disableRipple label="Work" />
          <Tab disableRipple label="About" />
          <Tab disableRipple label="Membership" />
          <Tab disableRipple label="My Account" />
        </Tabs>
        <SortedWithFilter data={[{ label: "Owner" }, { label: "Admin" }]} />
      </Stack>
    </Box>
  );
};

export { Profile4FilterTabs };
