import { BehaviorSubject, from, throwError } from "rxjs";
import { switchMap, tap, catchError, finalize } from "rxjs/operators";

const FOLDER = "folders";

// ================================
// Storage
// ================================

const getStoredFolders = () => {
  try {
    const folders = localStorage.getItem(FOLDER);
    return folders ? JSON.parse(folders) : null;
  } catch {
    return null;
  }
};

const initialFolders = getStoredFolders() || [];

// ================================
// RxJS State
// ================================

const foldersSubject = new BehaviorSubject(initialFolders);
const loadingSubject = new BehaviorSubject(false);
const errorSubject = new BehaviorSubject("");

export const folders$ = foldersSubject.asObservable();
export const loading$ = loadingSubject.asObservable();
export const error$ = errorSubject.asObservable();

// ================================
// Getters
// ================================

export const getFoldersState = () => foldersSubject.value;

// ================================
// Set Folders
// ================================

export const setFolders = (data) => {
  if (!data) return;

  const folders = data.folders ?? data;

  console.log("DATA:", data);
  console.log("FOLDERS:", folders);
  console.log("COUNT:", folders.length);

  localStorage.setItem(FOLDER, JSON.stringify(folders));

  foldersSubject.next(folders);

  console.log("SUBJECT:", foldersSubject.value);
  console.log("SUBJECT COUNT:", foldersSubject.value.length);
};

// ================================
// GET Request
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

      if (contentType?.includes("application/json")) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(data?.message || defaultErrorMessage);
      }

      return data;
    }),

    tap((data) => {
      setFolders(data);
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
// Get Folders
// ================================

export const getFolders = () =>
  handleGetRequest(
    "http://localhost:5000/api/camera/getfolder",
    "Failed to get folders",
  );

// ================================
// Service
// ================================

const folderService = {
  folders$,
  loading$,
  error$,
  getFoldersState,
  setFolders,
  getFolders,
};

export default folderService;
