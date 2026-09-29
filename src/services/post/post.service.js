import { BehaviorSubject, from, throwError } from "rxjs";
import { switchMap, tap, catchError, finalize } from "rxjs/operators";

const POSTS = "posts";

// ================================
// Storage
// ================================

const getStoredPosts = () => {
  try {
    const posts = localStorage.getItem(POSTS);
    return posts ? JSON.parse(posts) : null;
  } catch {
    return null;
  }
};

const initialPosts = getStoredPosts();

// ================================
// RxJS State
// ================================

const postsSubject = new BehaviorSubject(initialPosts);
const loadingSubject = new BehaviorSubject(false);
const errorSubject = new BehaviorSubject("");

export const posts$ = postsSubject.asObservable();
export const loading$ = loadingSubject.asObservable();
export const error$ = errorSubject.asObservable();

// ================================
// Getters
// ================================

export const getPostsState = () => postsSubject.value;

// ================================
// Set Posts
// ================================

export const setPosts = (data) => {
  if (!data) return;

  const posts = data.posts ?? data;

  localStorage.setItem(POSTS, JSON.stringify(posts));

  postsSubject.next(posts);
};

// ================================
// POST Request
// ================================

const handleGetRequest = (url, defaultErrorMessage) => {
  loadingSubject.next(true);
  errorSubject.next("");

  return from(
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }),
  ).pipe(
    switchMap(async (response) => {
      const contentType = response.headers.get("content-type");

      let data = null;

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(data?.message || defaultErrorMessage);
      }

      return data;
    }),

    tap((data) => {
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
// Finish
// ================================

// ================================
// Get Camera Posts
// ================================

export const getPosts = () =>
  handleGetRequest(
    "http://localhost:5000/api/camera/get",
    "Failed to get posts",
  );

export const getPostsid = (id) => {
  console.log("getPostsid ID:", id);

  return handleGetRequest(
    `http://localhost:5000/api/camera/getfolder/${id}`,
    "Failed to get posts",
  );
};
/*
export const getPostsingle = (id) => {
  console.log("getPostsid ID:", id);

  return handleGetRequest(
    `http://localhost:5000/api/camera/getpostsingle/${id}`,
    "Failed to get posts",
  );
};
*/
// ================================
// Service
// ================================

const postsService = {
  posts$,
  loading$,
  error$,
  getPostsState,
  setPosts,
  getPosts,
  getPostsid,
  // getPostsingle,
};

export default postsService;
