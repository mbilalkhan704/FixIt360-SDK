/**
 * Common/shared type definitions used across the FixIt360 SDK.
 */

/** Standard response envelope returned by every SDK call. */
export interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data: T;
}

/** Django REST Framework-style paginated list envelope. */
export interface PaginatedResult<T = unknown> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

/** Field-level validation error map, as returned by DRF serializers. */
export type ValidationErrors = Record<string, string[] | Record<string, unknown>>;

/** Progress payload passed to `onProgress` during multipart/file-upload requests. */
export interface UploadProgress {
    progress: number;
    currentFile: number;
    totalFiles: number;
    loadedBytes: number;
    totalBytes: number;
}

export type OnUploadProgress = (progress: UploadProgress) => void;

/** Days of the week accepted by availability endpoints. */
export type Weekday =
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";

/** A single volunteer availability slot. */
export interface AvailabilitySlot {
    /** Present when returned from the server; omitted on input. */
    id?: number;
    day: Weekday;
    /** `"HH:mm"` on input, `"HH:mm:ss"` in responses. */
    start_time: string;
    /** `"HH:mm"` on input, `"HH:mm:ss"` in responses. */
    end_time: string;
}

/** SDK initialization config. */
export interface SDKConfig {
    baseURL: string;
    timeout: number;
    withCredentials: boolean;
}
