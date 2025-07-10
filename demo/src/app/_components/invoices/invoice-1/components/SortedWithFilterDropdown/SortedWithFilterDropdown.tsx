import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React from "react";

const SortedWithFilterDropdown = () => {
  const [value, setValue] = React.useState("");
  return (
    <FormControl sx={{ minWidth: 90 }}>
      <Select
        size="small"
        value={value}
        onChange={(event) => setValue(event?.target.value)}
        displayEmpty
        sx={{
          borderRadius: 4,
          ".MuiSelect-select": {
            paddingBlock: 0.75,
          },
        }}
      >
        <MenuItem value="">Sort By</MenuItem>
        <MenuItem value={"all"}>Pay</MenuItem>
        <MenuItem value={"due"}>Print</MenuItem>
        <MenuItem value={"paid"}>Other</MenuItem>
      </Select>
    </FormControl>
  );
};

export { SortedWithFilterDropdown };
