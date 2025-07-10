import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailIcon from "@mui/icons-material/Mail";
import {
  Avatar,
  Card,
  CardContent,
  Theme,
  Typography,
  alpha,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const items = [
  {
    title: "Address",
    description: "44 New Design Street <br/>Melbourne 005<br/>Australia 300",
    icon: <LocationOnIcon fontSize={"medium"} />,
    bgColor: (theme: Theme) => alpha(theme.palette.info.main, 0.35),
    color: "info.main",
  },
  {
    title: "Phone No.",
    description: "01 (800) 433 544 <br/>01 (800) 433 544",
    icon: <LocalPhoneIcon fontSize={"medium"} />,
    bgColor: (theme: Theme) => alpha(theme.palette.warning.main, 0.35),
    color: "warning.main",
  },
  {
    title: "Email",
    description: "info@Example.com",
    icon: <MailIcon fontSize={"medium"} />,
    bgColor: (theme: Theme) => alpha(theme.palette.primary.main, 0.35),
    color: "primary.main",
  },
];
const ContactsDetail = () => {
  return (
    <>
      {items?.map((item, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
          <Card sx={{ minHeight: "100%" }}>
            <CardContent
              sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{
                  bgcolor: item?.bgColor,
                  width: 52,
                  height: 52,
                  border: 1,
                  color: item?.color,
                  borderColor: item?.color,
                  boxShadow: 2,
                  mb: 3,
                }}
              >
                {item?.icon}
              </Avatar>
              <Typography variant={"h5"}>{item?.title}</Typography>
              <Typography
                variant={"body1"}
                color={"text.secondary"}
                dangerouslySetInnerHTML={{ __html: item?.description }}
              />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </>
  );
};

export { ContactsDetail };
