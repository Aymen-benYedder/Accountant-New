import { useTranslation } from "react-i18next";
import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import ReactCountryFlag from "react-country-flag";
import { Span } from "@jumbo/shared";
import { JumboIconButton } from "@jumbo/components/JumboIconButton";

const TranslationPopover = () => {
  const { i18n } = useTranslation();
  const supportedLngs: {
    [key: string]: { name: string; flag: string };
  } = {
    en: { name: "English", flag: "GB" },
    ar: { name: "Arabic (العربية)", flag: "SA" },
    fr: { name: "French", flag: "FR" },
    zh: { name: "Chinese", flag: "CN" },
    es: { name: "Spanish", flag: "ES" },
    it: { name: "Italian", flag: "IT" },
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    handleClose();
  };

  return (
    <Span sx={{ mr: { sm: 2.5 } }}>
      <JumboIconButton onClick={handleClick} elevation={23}>
        <ReactCountryFlag
          countryCode={supportedLngs[`${i18n?.resolvedLanguage}`]?.flag}
          svg
          style={{ width: 20, height: "auto" }}
        />
      </JumboIconButton>
      <Menu
        anchorEl={anchorEl}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        onClose={handleClose}
        sx={{
          mt: 2,
        }}
      >
        {Object.entries(supportedLngs).map(([code, { name, flag }]) => (
          <MenuItem key={code} onClick={() => handleLanguageChange(code)}>
            <ListItemIcon>
              <ReactCountryFlag
                countryCode={flag}
                svg
                style={{ width: 24, height: 16 }}
              />
            </ListItemIcon>
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Menu>
    </Span>
  );
};

export { TranslationPopover };
