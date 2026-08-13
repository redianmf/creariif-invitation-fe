import { Navigate, Outlet } from 'react-router-dom';
import { selectIsAuthenticated, useAuthStore } from '../shared/auth/auth-store';

export function ProtectedRoute() {
  const isAuthenticated = useAuthStore(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}
