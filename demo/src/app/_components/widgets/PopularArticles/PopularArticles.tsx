import { JumboCard, JumboScrollbar } from '@jumbo/components';
import { JumboDdMenu } from '@jumbo/components/JumboDdMenu';
import { ArticlesList } from './components/ArticlesList';
import { menuItems } from './data';
interface PopularArticlesProps {
  title: React.ReactNode;
  scrollHeight?: number;
}
const PopularArticles = ({ title, scrollHeight }: PopularArticlesProps) => {
  return (
    <JumboCard
      title={title}
      action={<JumboDdMenu menuItems={menuItems} />}
      contentWrapper
      contentSx={{ p: 0 }}
      headerSx={{ pb: 1 }}
      sx={{
        '.MuiCardHeader-action': {
          my: -0.75,
          mr: -1,
        },
      }}
    >
      <JumboScrollbar
        autoHeight
        autoHeightMin={scrollHeight ? scrollHeight : 395}
      >
        <ArticlesList />
      </JumboScrollbar>
    </JumboCard>
  );
};

export { PopularArticles };
