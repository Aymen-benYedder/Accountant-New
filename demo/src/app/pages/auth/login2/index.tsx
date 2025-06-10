import React from "react";
import {
  Card,
  CardContent,
  IconButton,
  Typography,
  alpha,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { Facebook, Google, Twitter } from "@mui/icons-material";
import { Div, Link } from "@jumbo/shared";
import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { LoginForm } from "@app/_components/auth/login";
import { getAssetPath } from "@app/_utilities/helpers";
import { useTranslation } from "react-i18next";

const Login2 = () => {
  const { t } = useTranslation();
  return (
    <Div
      sx={{
        width: 720,
        maxWidth: "100%",
        margin: "auto",
        p: 4,
      }}
    >
      <Card
        sx={{
          display: "flex",
          minWidth: 0,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <CardContent
          sx={{
            flex: "0 1 300px",
            position: "relative",
            background: `#0267a0 url(${getAssetPath(
              `${ASSET_IMAGES}/widgets/keith-luke.jpg`,
              "640x428"
            )}) no-repeat center`,
            backgroundSize: "cover",

            "&::after": {
              display: "inline-block",
              position: "absolute",
              content: `''`,
              inset: 0,
              backgroundColor: alpha("#0267a0", 0.65),
            },
          }}
        >
          <Div
            sx={{
              display: "flex",
              minWidth: 0,
              flex: 1,
              flexDirection: "column",
              color: "common.white",
              position: "relative",
              zIndex: 1,
              height: "100%",
            }}
          >
            <Div sx={{ mb: 2 }}>
              <Typography
                variant={"h3"}
                color={"inherit"}
                fontWeight={500}
                mb={3}
              >
                {t("login.signIn")}
              </Typography>
              <Typography variant={"body1"} mb={2}>
                {t("login.content")}
              </Typography>
              <Typography variant={"body1"}>
                <Link
                  to={"/forgot-password"}
                  color={"inherit"}
                  underline={"none"}
                >
                  {t("login.forgot1")}
                </Link>
              </Typography>
            </Div>

            <Div sx={{ mt: "auto" }}>
              <Link to="/" underline="none" sx={{ display: "inline-flex" }}>
                <img src={`${ASSET_IMAGES}/logo-white.png`} alt="Jumbo React" />
              </Link>
            </Div>
          </Div>
        </CardContent>
        <CardContent sx={{ flex: 1, p: 4 }}>
          <LoginForm />
          <React.Fragment>
            <Typography variant={"body1"} mb={2}>
              {t("login.account")}{" "}
              <Link underline="none" to="/auth/signup-2">
                {t("login.recover")}
              </Link>
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1} mb={1}>
              <IconButton
                sx={{
                  bgcolor: "#385196",
                  color: "common.white",
                  p: (theme) => theme.spacing(1.25),

                  "&:hover": {
                    backgroundColor: "#385196",
                  },
                }}
                aria-label="Facebook"
              >
                <Facebook fontSize="small" />
              </IconButton>
              <IconButton
                sx={{
                  bgcolor: "#00a8ff",
                  color: "common.white",
                  p: (theme) => theme.spacing(1.25),

                  "&:hover": {
                    backgroundColor: "#00a8ff",
                  },
                }}
                aria-label="Twitter"
              >
                <Twitter fontSize="small" />
              </IconButton>
              <IconButton
                sx={{
                  bgcolor: "#23272b",
                  color: "common.white",
                  p: (theme) => theme.spacing(1.25),

                  "&:hover": {
                    backgroundColor: "#23272b",
                  },
                }}
                aria-label="Twitter"
              >
                <Google fontSize="small" />
              </IconButton>
            </Stack>
          </React.Fragment>
        </CardContent>
      </Card>
    </Div>
  );
};

export default Login2;
