import { JumboCard, JumboScrollbar } from '@jumbo/components';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import React from 'react';
import { CategoryDropdown } from './components/CategoryDropdown';
import { TaskList } from './components/TasksList';
import { tasksList } from './data';

interface TaskListExpandableProps {
  title: React.ReactNode;
  subheader: React.ReactNode;
  scrollHeight?: number;
}
const TaskListExpandable = ({
  title,
  subheader,
  scrollHeight,
}: TaskListExpandableProps) => {
  const [activeCategory, setActiveCategory] = React.useState('all');
  const [filteredTasks, setFilteredTasks] = React.useState(tasksList);

  React.useEffect(() => {
    if (activeCategory && activeCategory !== 'all')
      setFilteredTasks(
        tasksList.filter((task) => task.category === activeCategory)
      );
    else setFilteredTasks(tasksList);
  }, [activeCategory]);

  return (
    <JumboCard
      title={title}
      subheader={subheader}
      action={
        <Stack direction={'row'} spacing={1} alignItems={'center'}>
          <CategoryDropdown
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          <Fab size='small' color='primary' aria-label='add'>
            <AddIcon />
          </Fab>
        </Stack>
      }
      headerSx={{
        borderBottom: 1,
        borderBottomColor: 'divider',
      }}
      contentWrapper
      contentSx={{ p: 0 }}
    >
      <JumboScrollbar
        autoHeight
        autoHeightMin={scrollHeight ? scrollHeight : 392}
      >
        <TaskList tasks={filteredTasks} />
      </JumboScrollbar>
    </JumboCard>
  );
};

export { TaskListExpandable };
