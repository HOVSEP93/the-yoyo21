import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useCollection } from '../../hooks/useCollection';
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../.././hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

// Styles
import './Create.scss';
import { useFirestore } from '../../hooks/useFirestore';

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
];

const Create = () => {
  const navigator = useNavigate();

  const { documents } = useCollection('users');
  const [users, setUsers] = useState([]);
  const { user } = useAuthContext();
  const { addDocument, response } = useFirestore('projects');

  // form field values
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);

  // create user values for react-select
  useEffect(() => {
    if (documents) {
      setUsers(
        documents.map(user => {
          return { value: { ...user, id: user.id }, label: user.displayName };
        })
      );
    }
  }, [documents]);
  // console.log(users)

  const handleSubmit = async e => {
    e.preventDefault();
    setFormError(null);

    if (!category) {
      setFormError('Please select a project category.');
      return;
    }
    if (assignedUsers.length < 1) {
      setFormError('Please assign the project to at least 1 user');
      return;
    }

    const assignedUsersList = assignedUsers.map(u => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id,
      };
    });
    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      assignedUsersList,
      createdBy,
      comments: [],
    };

    await addDocument(project);
    if (!response.er) {
      navigator('/');
    }
  };

  return (
    <div className="create-form">
      <h2 className="page-title">Create a new Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            required
            type="text"
            onChange={e => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea
            required
            onChange={e => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>
        <label>
          <span>Set due date:</span>
          <input
            required
            type="date"
            onChange={e => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Project category:</span>
          <Select
            onChange={option => setCategory(option)}
            options={categories}
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
            onChange={option => setAssignedUsers(option)}
            options={users}
            isMulti
          />
        </label>

        <button className="btn">Add Project</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Create;
