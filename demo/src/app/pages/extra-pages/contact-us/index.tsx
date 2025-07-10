import { ContactUsForm } from "@app/_components/extraPages/ContactUs/components/ContactUsForm";
import { ContactsDetail } from "@app/_components/extraPages/ContactUs/components/ContactsDetail";
import { SocialIcons } from "@app/_components/extraPages/ContactUs/components/SocialIcons";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { getAssetPath } from "@app/_utilities/helpers";
import { Card, CardMedia, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTranslation } from "react-i18next";
export default function ContactUsPage() {
  const { t } = useTranslation();
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: CONTAINER_MAX_WIDTH,
        display: "flex",
        minWidth: 0,
        flex: 1,
        flexDirection: "column",
      }}
      disableGutters
    >
      <Typography variant="h1" mb={3}>
        {t("extraPages.title.contactUs")}
      </Typography>
      <Card sx={{ display: "flex", mb: 3.5 }}>
        <ContactUsForm />
        <CardMedia
          component="img"
          sx={{
            flexShrink: 0,
            flexBasis: "40%",
            display: { xs: "none", md: "block" },
            aspectRatio: 1 / 1,
          }}
          image={getAssetPath(`${ASSET_IMAGES}/apps/contactus.jpg`, "640x920")}
          alt="Contact Us"
        />
      </Card>
      <Grid container spacing={3.75} mb={3.5}>
        <ContactsDetail />
      </Grid>
      <SocialIcons />
    </Container>
  );
}
