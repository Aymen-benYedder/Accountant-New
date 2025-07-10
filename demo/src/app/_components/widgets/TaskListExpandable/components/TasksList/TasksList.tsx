import { List } from '@mui/material';
import { TaskType } from '../../data';
import { TaskItem } from '../TaskItem';

type TaskListProps = {
  tasks: TaskType[];
};
const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <List disablePadding>
      {tasks.map((task, index) => (
        <TaskItem task={task} key={index} />
      ))}
    </List>
  );
};

export { TaskList };
