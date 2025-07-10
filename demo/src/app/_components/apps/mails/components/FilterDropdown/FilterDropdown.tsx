import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { filtersOptions } from "../../fake-data";

const FilterDropdown = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = React.useState("");
  return (
    <FormControl size="small" sx={{ width: 120 }}>
      <InputLabel>Filter</InputLabel>
      <Select
        value={filter}
        label="Filter"
        onChange={(event) => setFilter(event.target.value)}
      >
        <MenuItem value="">
          <em>Select Filter</em>
        </MenuItem>
        {filtersOptions.map((item, index) => (
          <MenuItem
            value={item.name}
            key={index}
            onClick={() => {
              navigate(`/apps/mail/${item.slug}`);
            }}
          >
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export { FilterDropdown };
