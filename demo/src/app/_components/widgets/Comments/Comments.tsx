import { JumboCard, JumboScrollbar } from '@jumbo/components';
import { Chip } from '@mui/material';
import { CommentsList } from './components';

interface CommentsProps {
  title: React.ReactNode;
  scrollHeight: number;
}
const Comments = ({ title, scrollHeight }: CommentsProps) => {
  return (
    <JumboCard
      title={title}
      action={
        <Chip label={'8 New Comments'} color={'primary'} size={'small'} />
      }
      headerSx={{ borderBottom: 1, borderBottomColor: 'divider' }}
      contentWrapper
      contentSx={{ p: 0 }}
    >
      <JumboScrollbar
        autoHeight
        autoHeightMin={scrollHeight ? scrollHeight : 460}
      >
        <CommentsList />
      </JumboScrollbar>
    </JumboCard>
  );
};

export { Comments };
