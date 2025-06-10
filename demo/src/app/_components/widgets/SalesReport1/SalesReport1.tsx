import { SalesReportChart1 } from "@app/_components/charts";
import { JumboCard } from "@jumbo/components";
import { Chip, Typography } from "@mui/material";

const SalesReport1 = ({ title }: { title: React.ReactNode }) => {
  return (
    <JumboCard
      title={
        <Typography variant={"h4"} mb={0}>
          {title}
        </Typography>
      }
      action={<Chip label={"Today"} color={"primary"} size={"small"} />}
      contentWrapper
      contentSx={{ pt: 0 }}
    >
      <Typography variant={"h2"}>$685k+</Typography>
      <Typography variant={"body1"} color="text.secondary" mb={1.5}>
        Past 9 months data
      </Typography>
      <SalesReportChart1 />
    </JumboCard>
  );
};

export { SalesReport1 };
