import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React from "react";

const InvoiceDropdown = () => {
  const [value, setValue] = React.useState("");
  return (
    <FormControl sx={{ minWidth: 90 }}>
      <Select
        size="small"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        displayEmpty
        sx={{
          borderRadius: 4,
          ".MuiSelect-select": {
            paddingBlock: 0.75,
          },
        }}
      >
        <MenuItem value="">Newest First</MenuItem>
        <MenuItem value={"all"}>All</MenuItem>
        <MenuItem value={"due"}>Due</MenuItem>
        <MenuItem value={"paid"}>Paid</MenuItem>
      </Select>
    </FormControl>
  );
};

export { InvoiceDropdown };
