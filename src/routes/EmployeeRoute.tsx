// src/routes/EmployeeRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../modules/auth/hooks';
import { useTurn } from '../modules/turns/useTurn';

interface EmployeeRouteProps {
  children: React.ReactNode;
}

export const EmployeeRoute = ({ children }: EmployeeRouteProps) => {
  const { user } = useAuth();
  const { activeTurn } = useTurn();

  // Si no hay usuario, redirige al login
  if (!user) return <Navigate to="/login" />;

  // Solo empleados pueden usar esta ruta
  if (user.role !== 'empleado') return <Navigate to="/login" />;

  // Si el empleado tiene turno activo, lo lleva a /my-turn
  if (activeTurn) return <Navigate to="/my-turn" />;

  // Si no tiene turno activo, deja que vea la ruta (ej: /activate-turn)
  return <>{children}</>;
};
