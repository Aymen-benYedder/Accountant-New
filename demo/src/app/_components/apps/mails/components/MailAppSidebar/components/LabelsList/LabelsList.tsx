import React from "react";
import { Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import { StyledMenu } from "@app/_components/_core";
import { LabelForm, LabelItem } from "./components";
import { labelsList } from "@app/_components/apps/mails/fake-data";

const LabelsList = () => {
  const { showDialog } = useJumboDialog();

  const showAddLabelDialog = () => {
    showDialog({
      title: "Add new label",
      content: <LabelForm />,
    });
  };

  return (
    <React.Fragment>
      <Typography
        variant={"h6"}
        color={"text.secondary"}
        sx={{
          textTransform: "uppercase",
          letterSpacing: "1px",
          fontSize: "11px",
        }}
      >
        Labels
      </Typography>

      <StyledMenu disablePadding sx={{ mb: 3 }}>
        {labelsList.map((item, index) => (
          <LabelItem label={item} key={index} />
        ))}
      </StyledMenu>

      <Button
        variant="outlined"
        color={"inherit"}
        startIcon={<AddIcon />}
        sx={{
          alignSelf: "flex-start",
          borderColor: "transparent",
          bgcolor: "common.white",
          color: "grey.800",

          "&:hover": {
            borderColor: "divider",
            bgcolor: "common.white",
          },
          "& .MuiSvgIcon-root": {
            fontSize: "1.5rem",
          },
        }}
        onClick={showAddLabelDialog}
      >
        Add Label
      </Button>
    </React.Fragment>
  );
};

export { LabelsList };
