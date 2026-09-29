/*import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../services/auth/auth.service";

export default function ProtectedRoute() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
}
*/
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import authService from "../services/auth/auth.service";

export default function ProtectedRoute() {
  const location = useLocation();
  const [authenticated, setAuthenticated] = useState(
    authService.isAuthenticated(),
  );

  useEffect(() => {
    const subscription = authService.user$.subscribe((user) => {
      setAuthenticated(!!user && !!authService.getToken());
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!authenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
