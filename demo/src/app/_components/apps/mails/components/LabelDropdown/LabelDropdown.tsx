import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { labelsList } from "../../fake-data";

const LabelDropdown = () => {
  const navigate = useNavigate();
  const [label, setLabel] = React.useState("");
  return (
    <React.Fragment>
      <FormControl sx={{ width: 120 }} size={"small"}>
        <InputLabel>Label</InputLabel>
        <Select
          value={label}
          label="Label"
          onChange={(event) => setLabel(event.target.value)}
        >
          <MenuItem value="">
            <em>Select Label</em>
          </MenuItem>
          {labelsList?.map((label, index) => (
            <MenuItem
              key={index}
              value={label?.name}
              onClick={() => navigate(`/apps/mail/label/${label?.id}`)}
            >
              {label?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </React.Fragment>
  );
};
export { LabelDropdown };
