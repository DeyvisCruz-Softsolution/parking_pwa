import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../modules/auth/hooks';

interface PrivateRouteProps {
  children: React.ReactNode;
  roles?: string[];
}

export const PrivateRoute = ({ children, roles }: PrivateRouteProps) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (roles && !roles.includes(user.role)) return <Navigate to="/login" />;

  return <>{children}</>;
};
