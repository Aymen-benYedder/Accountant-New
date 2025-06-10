import { Button } from '@mui/material';
import { ConnectionsList } from './components';
import { JumboCard, JumboScrollbar } from '@jumbo/components';

interface NewConnectionsProps {
  title: React.ReactNode;
  scrollHeight?: number;
}
function NewConnections({ title, scrollHeight }: NewConnectionsProps) {
  return (
    <JumboCard
      title={title}
      subheader={title}
      action={
        <Button variant={'contained'} size={'small'}>
          See all
        </Button>
      }
      contentWrapper
      contentSx={{ p: 0 }}
    >
      <JumboScrollbar
        autoHeight
        autoHeightMin={scrollHeight ? scrollHeight : 278}
      >
        <ConnectionsList />
      </JumboScrollbar>
    </JumboCard>
  );
}

export { NewConnections };
