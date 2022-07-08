import { useNavigate } from 'react-router-dom';
import Avatar from '../.././components/avatar/Avatar';
import { useFirestore } from '../.././hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';

const ProjectSummary = ({ project }) => {
  const navigator = useNavigate();
  const { deleteDocument } = useFirestore('projects');
  const { user } = useAuthContext();
  const handleClick = e => {
    deleteDocument(project.id);
    navigator('/');
  };

  return (
    <div>
      <div className="project-summary">
        <h2 className="project-title">{project.name}</h2>
        <p>By {project.createdBy.displayName}</p>
        <p className="dua-date">
          Project due by {project.dueDate.toDate().toDateString()}
        </p>
        <p className="details">{project.details}</p>
        <h4>Project is assigned to:</h4>
        <div className="assigned-users">
          {project.assignedUsersList.map(user => (
            <div key={user.id}>
              <Avatar src={user.photoURL} alt="user-avatar" />
            </div>
          ))}
        </div>
      </div>
      {/* {user.uid === project.createdBy.id && ( */}
      <button className="btn" onClick={handleClick}>
        Mark as complete
      </button>
      {/* )} */}
    </div>
  );
};

export default ProjectSummary;
