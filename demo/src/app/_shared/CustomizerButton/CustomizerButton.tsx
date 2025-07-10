import { useApp } from "@app/_components/AppProvider/_hooks";
import SettingsIcon from "@mui/icons-material/Settings";
import Fab from "@mui/material/Fab";
import React from "react";
import ReactDOM from "react-dom";

export const CustomizerButton = () => {
  const { customizerVisibility, setCustomizerVisibility } = useApp();
  const toggleCustomizerVisibility = React.useCallback(() => {
    setCustomizerVisibility!(!customizerVisibility);
  }, [setCustomizerVisibility, customizerVisibility]);
  return ReactDOM.createPortal(
    <Fab
      size={"medium"}
      color="primary"
      aria-label="add"
      onClick={toggleCustomizerVisibility}
      sx={{
        position: "fixed",
        top: 150,
        right: 0,
        zIndex: 101,
        width: 50,
        height: 44,
        p: (theme) => theme.spacing(1, 1, 1, 1.5),
        borderRadius: "24px 0 0 24px",
        backgroundImage: (theme) =>
          `linear-gradient(-135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,

        "&:hover": {
          backgroundImage: (theme) =>
            `linear-gradient(-135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
        },
      }}
    >
      <SettingsIcon
        sx={{
          animation: "move 2s infinite linear",

          "@keyframes move": {
            from: { transform: "rotate(0deg)" },
            to: { transform: "rotate(360deg)" },
          },
        }}
      />
    </Fab>,
    document.getElementsByTagName("body")[0]
  );
};
