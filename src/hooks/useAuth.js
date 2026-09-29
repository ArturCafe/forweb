import { useEffect, useState } from "react";
import authService from "../services/auth/auth.service";

export default function useAuth() {
  const [user, setUser] = useState(authService.getUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const userSubscription = authService.user$.subscribe(setUser);

    const loadingSubscription = authService.loading$.subscribe(setLoading);

    const errorSubscription = authService.error$.subscribe(setError);

    return () => {
      userSubscription.unsubscribe();
      loadingSubscription.unsubscribe();
      errorSubscription.unsubscribe();
    };
  }, []);

  return {
    user,
    loading,
    error,

    isAuthenticated: !!user,

    login: authService.login,
    register: authService.register,
    logout: authService.logout,

    getToken: authService.getToken,
  };
}
