import { EmailCampaignChart } from '@app/_components/charts';
import { JumboCard } from '@jumbo/components';
import { Div } from '@jumbo/shared';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const NewVisitorsThisMonth = ({subheader}:{subheader:React.ReactNode}) => {
  return (
    <JumboCard
      title={'24,569'}
      subheader={subheader}
      action={<TrendingUpIcon fontSize={'small'} />}
      textColor='common.white'
      bgcolor={['#f9cc8a', '#f39711']}
      reverse
      sx={{
        borderTop: '4px solid #F39711',
        '.MuiCardHeader-title': {
          color: 'inherit',
          fontSize: '1.25rem',
        },
        '.MuiCardHeader-subheader': {
          color: 'inherit',
        },
      }}
    >
      <Div sx={{ p: 3, pb: 0 }}>
        <EmailCampaignChart />
      </Div>
    </JumboCard>
  );
};

export { NewVisitorsThisMonth };
