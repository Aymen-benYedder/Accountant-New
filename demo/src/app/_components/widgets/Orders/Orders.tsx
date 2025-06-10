import { JumboCard } from '@jumbo/components/JumboCard';
import { Div } from '@jumbo/shared';
import { Typography } from '@mui/material';
import { ChartOrders } from './components';
import { orders } from './data';

function Orders({ title }: { title: React.ReactNode }) {
  return (
    <JumboCard
      title={
        <Typography variant={'h5'} mb={0.5}>
          {title}
        </Typography>
      }
      subheader={
        <Typography variant={'h6'} color={'text.secondary'} mb={0}>
          293
        </Typography>
      }
      headerSx={{ pb: 0 }}
    >
      <Div sx={{ mt: -2.5 }}>
        <ChartOrders data={orders} />
      </Div>
    </JumboCard>
  );
}

export { Orders };
