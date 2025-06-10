import { JumboCard } from '@jumbo/components';
import { Typography } from '@mui/material';
import { OrdersReportChart } from './components';

type OrdersReportProps = {
  chartHeight?: number;
  subTitle?: string | null;
  title:React.ReactNode;
  subheader:React.ReactNode;
};
const OrdersReport = ({ title,subheader,chartHeight, subTitle }: OrdersReportProps) => {
  return (
    <JumboCard
      title={
        <Typography variant={'h4'} mb={0}>
          {title}
        </Typography>
      }
      subheader={
        subTitle === null ? subTitle : subheader
      }
      sx={{ textAlign: 'center' }}
      contentWrapper
      contentSx={{ pt: 0 }}
    >
      <OrdersReportChart height={chartHeight} />
    </JumboCard>
  );
};

export { OrdersReport };
