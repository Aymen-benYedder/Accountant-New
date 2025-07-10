import { SignupForm } from "@app/_components/auth/signup";
import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { getAssetPath } from "@app/_utilities/helpers";
import { Div, Link } from "@jumbo/shared";
import { Card, CardContent, Typography, alpha } from "@mui/material";

export default function Signup2() {
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
                Sign Up
              </Typography>
              <Typography variant={"body1"} mb={2}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the.
              </Typography>
              <Typography variant={"body1"}>
                Already have an account?{" "}
                <Link to={"/auth/login-2"} color={"inherit"} underline={"none"}>
                  Sign in
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
        <CardContent
          sx={{
            flex: 1,
            p: 4,
          }}
        >
          <SignupForm />
        </CardContent>
      </Card>
    </Div>
  );
}
