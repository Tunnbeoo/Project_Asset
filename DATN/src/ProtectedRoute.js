import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from 'react';

function ProtectedRoute() {
  const daDangNhap = useSelector(state => state.auth.daDangNhap);
  const location = useLocation();

  if (!daDangNhap) {
    return React.createElement(Navigate, { to: '/auth', state: { from: location } });
  }

  return React.createElement(Outlet, null);
}

export default ProtectedRoute;