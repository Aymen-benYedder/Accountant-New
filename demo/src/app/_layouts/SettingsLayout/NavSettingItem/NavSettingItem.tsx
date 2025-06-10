import { Icon } from "@jumbo/components/Icon";
import { Link } from "@jumbo/shared";
import {
  alpha,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { NavItemProps } from "../setting-menus-items";

const NavSettingItem = ({ navItem }: { navItem: NavItemProps }) => {
  const location = useLocation();
  return (
    <ListItemButton
      component={"li"}
      sx={{
        p: 0,
        mb: 0.25,
        ".MuiLink-root": {
          borderLeft: 3,
          borderColor: "transparent",
          borderRadius: 2,
          p: (theme) => theme.spacing(1.25, 1.5),
          "&:hover": {
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.15),
            borderColor: (theme) => theme.palette.primary.main,
          },
          ...(navItem?.path === location?.pathname
            ? {
                backgroundColor: (theme) =>
                  alpha(theme.palette.primary.main, 0.15),
                borderColor: (theme) => theme.palette.primary.main,
              }
            : {}),
        },
        ".MuiListItemIcon-root": {
          minWidth: 32,
        },
        "&:hover": {
          background: "transparent",
        },
      }}
      disableRipple
    >
      <Link
        underline={"none"}
        to={navItem?.path}
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          position: "relative",
          color: "inherit",
          p: (theme: Theme) => theme.spacing(1, 2),
        }}
      >
        {navItem?.icon && (
          <ListItemIcon
            sx={{
              color: "inherit",
            }}
          >
            <Icon name={navItem?.icon} style={{ fontSize: 20 }} />
          </ListItemIcon>
        )}

        <ListItemText
          primary={navItem?.label}
          sx={{
            m: 0,
            "& .MuiTypography-root": {
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
          }}
        />
      </Link>
    </ListItemButton>
  );
};
export { NavSettingItem };
