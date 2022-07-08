import React, { Fragment } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import Create from './create/Create';
import Dashboard from './dashboard/Dashboard';
import Login from './login/Login';
import Projects from './project/Projects';
import Signup from './signup/Signup';

const Pages = () => {
  const { user } = useAuthContext();

  return (
    <Fragment>
      <Routes>
        <Route
          path="/"
          element={user ? <Dashboard /> : <Navigate to="login" />}
        />
        <Route
          path="create"
          element={user ? <Create /> : <Navigate to="/login" />}
        />
        <Route
          path="projects/:id"
          element={user ? <Projects /> : <Navigate to="/login" />}
        />
        <Route
          path="signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        <Route path="login" element={!user ? <Login /> : <Navigate to="/" />} />
      </Routes>
    </Fragment>
  );
};

export default Pages;
