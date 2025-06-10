import { ChartIntranet } from "@app/_components/charts/ChartIntranet";
import { JumboCard } from "@jumbo/components";
import { Link } from "@jumbo/shared";
import { Breadcrumbs, Typography } from "@mui/material";

const HeaderChart = ({ title }: { title: React.ReactNode }) => {
  return (
    <JumboCard
      title={
        <Typography variant={"h2"} color={"common.white"} mb={0}>
          {title}
        </Typography>
      }
      action={
        <Breadcrumbs aria-label="breadcrumb" color={"common.white"}>
          <Link underline="hover" color="inherit" to="/">
            Home
          </Link>
          <Link underline="hover" color="inherit" to="/dashboards/intranet">
            Dashboard
          </Link>
          <Typography color="inherit">Intranet</Typography>
        </Breadcrumbs>
      }
      bgcolor={["#2B3361"]}
      sx={{
        color: "common.white",
        borderRadius: 0,
        m: (theme) => theme.spacing(-4, -4, 4),
        mx: { lg: -6 },
        "& .MuiCardHeader-root": {
          px: { xs: 4, lg: 6 },
        },
      }}
    >
      <ChartIntranet />
    </JumboCard>
  );
};

export { HeaderChart };
