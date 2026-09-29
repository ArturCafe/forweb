import { BehaviorSubject, from, throwError } from "rxjs";
import { switchMap, tap, catchError, finalize } from "rxjs/operators";

// ================================
// Storage keys
// ================================
const TOKEN_KEY = "artcore_token";
const USER_KEY = "artcore_user";

// ================================
// Initial auth state
// ================================
const getStoredUser = () => {
  try {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

const initialUser = getStoredUser();

// ================================
// RxJS State
// ================================
const userSubject = new BehaviorSubject(initialUser);
const loadingSubject = new BehaviorSubject(false);
const errorSubject = new BehaviorSubject("");

export const user$ = userSubject.asObservable();
export const loading$ = loadingSubject.asObservable();
export const error$ = errorSubject.asObservable();

// ================================
// Getters
// ================================
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUser = () => userSubject.value;
export const isAuthenticated = () => !!getToken() && !!getUser();

// ================================
// SAVE AUTH & LOGOUT
// ================================
export const setAuth = (data) => {
  if (data && data.token) {
    localStorage.setItem(TOKEN_KEY, data.token);
  }
  if (data && data.user) {
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    userSubject.next(data.user);
  }
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  userSubject.next(null);
  errorSubject.next("");
};

// ================================
// REGISTER & LOGIN (Исправленные потоки)
// ================================
const handleAuthRequest = (url, bodyData, defaultErrorMessage) => {
  loadingSubject.next(true);
  errorSubject.next("");

  return from(
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    })
  ).pipe(
    switchMap(async (response) => {
      const contentType = response.headers.get("content-type");
      let data = null;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error((data && data.message) || defaultErrorMessage);
      }

      return data;
    }),
    // Ключевой шаг: передаем успешный JSON в стейт и хранилище
    tap((data) => {
      setAuth(data);
    }),
    catchError((error) => {
      errorSubject.next(error.message || defaultErrorMessage);
      return throwError(() => error);
    }),
    finalize(() => {
      loadingSubject.next(false);
    })
  );
};

export const register = (form) =>
  handleAuthRequest("/api/auth/register", form, "Registration failed");
export const login = (credentials) =>
  handleAuthRequest("/api/auth/login", credentials, "Login failed");

// ================================
// Export service
// ================================
const authService = {
  user$,
  loading$,
  error$,
  register,
  login,
  logout,
  setAuth,
  getToken,
  getUser,
  isAuthenticated,
};

export default authService;
