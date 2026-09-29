import { BehaviorSubject, from, throwError } from "rxjs";
import { switchMap, tap, catchError, finalize } from "rxjs/operators";

// ================================
// RxJS State (Только оперативная память React)
// ================================
const postsSubject = new BehaviorSubject([]);
const paginationSubject = new BehaviorSubject({
  currentPage: 1,
  totalPages: 1,
  hasNextPage: false,
  hasPrevPage: false,
});
const loadingSubject = new BehaviorSubject(false);
const errorSubject = new BehaviorSubject("");

export const posts$ = postsSubject.asObservable();
export const pagination$ = paginationSubject.asObservable();
export const loading$ = loadingSubject.asObservable();
export const error$ = errorSubject.asObservable();

// ================================
// Обновление потока (Реактивный Set)
// ================================
export const setPosts = (data) => {
  if (!data) return;

  // Пушим в поток только массив постов
  const posts = data.posts ?? (Array.isArray(data) ? data : []);
  postsSubject.next(posts);

  // Пушим в поток данные пагинации
  if (data.pagination) {
    paginationSubject.next(data.pagination);
  }
};

// ================================
// Request Handler
// ================================
const handleGetRequest = (url, defaultErrorMessage) => {
  loadingSubject.next(true);
  errorSubject.next("");

  return from(
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),
  ).pipe(
    switchMap(async (response) => {
      const contentType = response.headers.get("content-type");
      let data = null;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      }
      if (!response.ok) throw new Error(data?.message || defaultErrorMessage);
      return data;
    }),
    tap((data) => {
      // РЕАКТИВНОСТЬ: Запись данных в поток.
      // Все компоненты, подписанные на posts\( и pagination\), мгновенно обновятся сами!
      setPosts(data);
    }),
    catchError((error) => {
      errorSubject.next(error.message || defaultErrorMessage);
      return throwError(() => error);
    }),
    finalize(() => {
      loadingSubject.next(false);
    }),
  );
};

// ================================
// API Methods (Принимают параметры со страницы)
// ================================
export const getPosts = (params = {}) => {
  const queryParams = new URLSearchParams(params).toString();
  const url = `http://localhost:5000/api/camera/get${queryParams ? `?${queryParams}` : ""}`;
  return handleGetRequest(url, "Failed to get posts");
};

const postsService = {
  posts$,
  pagination$,
  loading$,
  error$,
  getPosts,
};
export default postsService;
