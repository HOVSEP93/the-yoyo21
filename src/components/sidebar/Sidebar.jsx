import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

// Styles
import './Sidebar.scss';

// Images
import DashboardIcon from '../.././assets/dashboard_icon.svg';
import AddIcon from '../.././assets/add_icon.svg';

import Avatar from '../avatar/Avatar';

const Sidebar = () => {
  const { user } = useAuthContext();
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <Avatar src={user.photoURL} />
          <p>Hey {user.displayName}</p>
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink exact to="/">
                <img src={DashboardIcon} alt="dashboard icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                <img src={AddIcon} alt="add project icon" />
                <span>New Project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
