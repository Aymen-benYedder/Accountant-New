import { FeaturedCard2 } from '@app/_components/cards/FeaturedCard2/FeaturedCard2';
import { Avatar } from '@mui/material';
interface UserSummaryProps {
  title: React.ReactNode;
  subheader: React.ReactNode;
}
function UserSummary({ title, subheader }: UserSummaryProps) {
  return (
    <FeaturedCard2
      avatar={
        <Avatar
          sx={{
            width: 60,
            height: 60,
            boxShadow: 2,
            position: 'relative',
          }}
          src={`/assets/images/avatar/avatar7.jpg`}
          alt={''}
        />
      }
      title={title}
      subheader={subheader}
      bgcolor={['#00C4B4']}
    />
  );
}

export { UserSummary };
