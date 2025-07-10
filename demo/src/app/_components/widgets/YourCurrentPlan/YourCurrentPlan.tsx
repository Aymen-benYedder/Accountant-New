import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { Div } from "@jumbo/shared";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Card, CardContent, ListItem, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid2";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";

const YourCurrentPlan = ({ title }: { title: React.ReactNode }) => {
  return (
    <Card>
      <CardHeader
        title={title}
        sx={{ borderBottom: 1, borderBottomColor: "divider" }}
      />
      <CardContent>
        <Stack direction={"row"} spacing={2}>
          <Grid size={7}>
            <Typography component={"div"} variant={"body1"} mb={1}>
              <Typography component={"span"} variant={"h1"}>
                $19
              </Typography>
              /month
            </Typography>
            <Typography variant={"h6"} color={"text.secondary"} mb={2}>
              Team Plan (4/5 Members)
            </Typography>
            <List>
              <ListItem disablePadding sx={{ mb: "5px" }}>
                <ArrowForwardIosIcon sx={{ fontSize: 14, mr: 1 }} /> 2k daily
                calls
              </ListItem>
              <ListItem disablePadding sx={{ mb: "5px" }}>
                <ArrowForwardIosIcon sx={{ fontSize: 14, mr: 1 }} /> 5k monthly
                SMS
              </ListItem>
              <ListItem disablePadding sx={{ mb: "5px" }}>
                <ArrowForwardIosIcon sx={{ fontSize: 14, mr: 1 }} /> 500
                connects
              </ListItem>
            </List>
          </Grid>
          <Grid size={5}>
            <Div sx={{ textAlign: "center" }}>
              <img
                src={`${ASSET_IMAGES}/icons/membership.png`}
                alt={"membership"}
                width={82}
                height={82}
              />
              <Typography variant={"h6"} color={"error"} my={1.5}>
                Expiring soon
              </Typography>
              <Button variant={"contained"}>Renew Now</Button>
            </Div>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
};

export { YourCurrentPlan };
