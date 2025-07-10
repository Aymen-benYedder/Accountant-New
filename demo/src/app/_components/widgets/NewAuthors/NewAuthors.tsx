import { JumboCard } from "@jumbo/components";
import { Div } from "@jumbo/shared";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { NewAuthorsChart } from "./components";

const NewAuthors = ({ subheader }: { subheader: React.ReactNode }) => {
  return (
    <JumboCard
      title={<SupervisorAccountIcon sx={{ color: "common.white" }} />}
      bgcolor={["#20c997"]}
      sx={{ color: "common.white" }}
      contentWrapper
      contentSx={{ px: 3, pt: 0 }}
    >
      <Grid container columnSpacing={2} alignItems={"flex-end"}>
        <Grid size={5}>
          <Typography variant={"h2"} color={"common.white"}>
            232
          </Typography>
          <Typography
            variant={"h6"}
            color={"common.white"}
            mb={0}
            sx={{ whiteSpace: "nowrap" }}
          >
            {subheader}
          </Typography>
        </Grid>
        <Grid size={7}>
          <Div sx={{ mt: -1.25 }}>
            <NewAuthorsChart />
          </Div>
        </Grid>
      </Grid>
    </JumboCard>
  );
};

export { NewAuthors };
