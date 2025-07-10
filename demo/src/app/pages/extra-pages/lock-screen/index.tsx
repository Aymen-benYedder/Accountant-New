import { ASSET_AVATARS, ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { getAssetPath } from "@app/_utilities/helpers";
import { Div, Link } from "@jumbo/shared";
import { JumboForm, JumboOutlinedInput } from "@jumbo/vendors/react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Avatar,
  Button,
  IconButton,
  InputAdornment,
  Typography,
  alpha,
} from "@mui/material";
import shadows from "@mui/material/styles/shadows";
import React from "react";

const LockScreenPage = () => {
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  return (
    <Div
      sx={{
        flex: 1,
        flexWrap: "wrap",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        p: (theme) => theme.spacing(4),
        background: `url(${getAssetPath(
          `${ASSET_IMAGES}/elizeu-dias.jpg`,
          "2400x1600"
        )}) no-repeat center`,
        backgroundSize: "cover",

        "&::after": {
          display: "inline-block",
          position: "absolute",
          content: `''`,
          inset: 0,
          backgroundColor: (theme) => alpha(theme.palette.common.black, 0.75),
        },
      }}
    >
      <Div
        sx={{
          maxWidth: "100%",
          position: "relative",
          zIndex: 1,
          width: 360,
          textAlign: "center",
          mt: "auto",
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src={getAssetPath(`${ASSET_AVATARS}/avatar3.jpg`, "90x90")}
          sx={{
            width: 90,
            height: 90,
            mx: "auto",
            mb: 2,
            boxShadow: shadows[3],
          }}
        />
        <Typography variant={"h2"} mb={0.5} color={"common.white"}>
          Nnenna Jioke
        </Typography>
        <Typography variant={"body1"} mb={3} color={"common.white"}>
          Enter your password to unlock the screen!
        </Typography>
        <JumboForm>
          <JumboOutlinedInput
            fieldName={"password"}
            type={values.showPassword ? "text" : "password"}
            margin="none"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            sx={{
              bgcolor: (theme) => theme.palette.background.paper,
              width: "360px",
            }}
            defaultValue={"zab#723"}
          />
        </JumboForm>
        <Button
          fullWidth
          variant="contained"
          size="large"
          sx={{ mb: 3, mt: 2 }}
        >
          Unlock
        </Button>
        <Typography variant={"body1"} mb={1}>
          <Link underline="none" to="/auth/signup-1" color={"common.white"}>
            Sign in using different account
          </Link>
        </Typography>
      </Div>
      <Div sx={{ mt: "auto", position: "relative", zIndex: 1 }}>
        <Link to="/" underline="none" sx={{ display: "inline-flex" }}>
          <img src={`${ASSET_IMAGES}/logo-white.png`} alt="Jumbo React" />
        </Link>
      </Div>
    </Div>
  );
};

export default LockScreenPage;
