import { useParams } from 'react-router-dom';
import { useDocument } from '../.././hooks/useDocument';

// Styles
import './Project.scss';
import ProjectComments from './ProjectComments';
import ProjectSummary from './ProjectSummary';

const Projects = () => {
  /* Getting the id from the url. */
  const { id } = useParams();
  /* A custom hook that is used to get the document from the database. */
  const { document, error } = useDocument('projects', id);

  if (error) {
    return <div className="error">{error}</div>;
  }
  if (!document) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="project-details">
      <ProjectSummary project={document} />
      <ProjectComments project={document} />
    </div>
  );
};

export default Projects;
