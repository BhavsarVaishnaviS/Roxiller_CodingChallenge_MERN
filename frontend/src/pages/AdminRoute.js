import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserRole } from '../util/index';

const AdminRoute = ({ children }) => {
  const role = getUserRole();

  if (role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
