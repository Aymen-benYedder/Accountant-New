import { JumboCard } from '@jumbo/components';
import { Div } from '@jumbo/shared';
import { Theme, Typography } from '@mui/material';
import { ChartOnlineVisitors } from './components';
interface OnlineVisitorProps {
  title:React.ReactNode;
  subheader:React.ReactNode;
}
const OnlineVisitors = ({title,subheader} :OnlineVisitorProps) => {
  return (
    <JumboCard
      title={
        <Typography variant={'h3'}>
          {title}
        </Typography>
      }
      subheader={
        <Typography variant={'h6'} color={'text.secondary'} mb={0}>
          {subheader}
        </Typography>
      }
    >
      <Div sx={{ p: (theme: Theme) => theme.spacing(0, 3, 3) }}>
        <Typography variant={'h5'}>2,855 users online</Typography>
      </Div>
      <ChartOnlineVisitors />
    </JumboCard>
  );
};

export { OnlineVisitors };
