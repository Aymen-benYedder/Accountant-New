import { Div } from '@jumbo/shared';
import { Typography } from '@mui/material';

type ListHeaderProps = {
  title: React.ReactNode;
  count?: number | string;
  action?: React.ReactNode;
};

const ListHeader = ({ title, count, action }: ListHeaderProps) => {
  return (
    <Div
      className={'d-flex align-items-center justify-content-between px-4 pt-4'}
    >
      <Typography variant={'h4'} color={'text.secondary'}>
        {count} {title}
      </Typography>
      {action}
    </Div>
  );
};

export { ListHeader };
