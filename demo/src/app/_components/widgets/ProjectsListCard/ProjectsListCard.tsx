import { JumboCard, JumboScrollbar } from "@jumbo/components";
import ProjectList from "./components/ProjectsList/ProjectsList";
import { projects } from "./data";

interface ProjectListCardProps {
  title: React.ReactNode;
  scrollHeight?: number;
}
const ProjectsListCard = ({ title }: ProjectListCardProps) => {
  return (
    <JumboCard title={title} contentSx={{ p: 0 }} contentWrapper>
      <JumboScrollbar autoHeight autoHeightMin={392}>
        <ProjectList data={projects} />
      </JumboScrollbar>
    </JumboCard>
  );
};

export { ProjectsListCard };
