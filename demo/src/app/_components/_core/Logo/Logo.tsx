import { isColorLight } from "@app/_utilities/helpers";
import { useJumboSidebarTheme } from "@jumbo/components/JumboTheme/hooks";
import { Div, Link } from "@jumbo/shared";
import { SxProps, Theme } from "@mui/material";

type LogoProps = {
  mini?: boolean;
  mode: "light" | "semi-dark" | "dark";
  sx?: SxProps<Theme>;
};
const Logo = ({ mini = false, mode = "light", sx }: LogoProps) => {
  const { sidebarTheme } = useJumboSidebarTheme();

  const isLightBackground = isColorLight(
    sidebarTheme?.sidebar?.overlay?.bgcolor,
    mode
  );
  return (
    <Div sx={{ display: "inline-flex", ...sx }}>
      <Link to={"/"}>
        {!mini ? (
          <img
            src={
              isLightBackground
                ? `/assets/images/logo.png`
                : `/assets/images/logo-white.png`
            }
            alt="Jumbo React"
            width={110}
            height={35}
            style={{ verticalAlign: "middle" }}
          />
        ) : (
          <img
            src={
              isLightBackground
                ? `/assets/images/logo-short.png`
                : `/assets/images/logo-short-white.png`
            }
            alt="Jumbo React"
            width={35}
            height={35}
            style={{ verticalAlign: "middle" }}
          />
        )}
      </Link>
    </Div>
  );
};

export { Logo };
