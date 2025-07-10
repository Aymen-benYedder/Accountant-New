import { List } from '@mui/material';

import { ProjectType } from '../../data';
import { ProjectItem } from '../ProjectItem';

const ProjectList = ({ data }: { data: ProjectType[] }) => {
  return (
    <List disablePadding>
      {data.map((project, index) => (
        <ProjectItem key={index} project={project} />
      ))}
    </List>
  );
};

export default ProjectList;
