import { JumboCard, JumboScrollbar } from '@jumbo/components';
import AuthorsList from './components/AuthorsList/AuthorsList';

interface PopularAuthorsProps {
  title: React.ReactNode;
  subheader: React.ReactNode;
  scrollHeight?: number;
}
const PopularAuthors = ({
  title,
  subheader,
  scrollHeight,
}: PopularAuthorsProps) => {
  return (
    <JumboCard
      title={title}
      subheader={subheader}
      headerSx={{ borderBottom: 1, borderBottomColor: 'divider' }}
      contentWrapper
      contentSx={{ p: 0 }}
    >
      <JumboScrollbar
        autoHeight
        autoHeightMin={scrollHeight ? scrollHeight : 366}
      >
        <AuthorsList />
      </JumboScrollbar>
    </JumboCard>
  );
};

export { PopularAuthors };
