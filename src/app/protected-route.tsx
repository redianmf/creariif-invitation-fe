import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../shared/auth/auth-context';

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}
