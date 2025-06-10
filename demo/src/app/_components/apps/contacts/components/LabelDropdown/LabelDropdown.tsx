import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { labels } from "@app/_components/apps/contacts/fake-datas";

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
          {labels?.map((label, index) => (
            <MenuItem
              key={index}
              value={label?.name}
              onClick={() => navigate(`/apps/contact/label/${label?.id}`)}
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
