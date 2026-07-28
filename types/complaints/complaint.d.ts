import type { ApiResponse, PaginatedResult, OnUploadProgress } from "../common";

export type ComplaintStatus = "pending review" | (string & {});

export interface ComplaintPhotoDetail {
    id: number;
    image_url: string;
    /** ISO 8601 timestamp. */
    uploaded_at: string;
}

/** Full complaint detail (returned by create/get/update). */
export interface ComplaintDetail {
    id: number;
    title: string;
    /** e.g. `"pothole"`, `"manhole"`. */
    category: string;
    description: string;
    status: ComplaintStatus;
    address: string;
    latitude?: number;
    longitude?: number;
    primary_photo_id?: number;
    photo_count?: number;
    photos_detail: ComplaintPhotoDetail[];
    /** ISO 8601 timestamp. */
    created_at: string;
    /** ISO 8601 timestamp. */
    updated_at?: string;
}

/** Summarized complaint as returned in list responses. */
export interface ComplaintSummary {
    id: number;
    title: string;
    category: string;
    description: string;
    status: ComplaintStatus;
    address: string;
    latitude: number;
    longitude: number;
    photo_count: number;
    primary_photo: string | null;
    /** ISO 8601 timestamp. */
    created_at: string;
}

export interface CreateComplaintParams {
    access_token: string;
    title: string;
    category: string;
    description: string;
    address: string;
    latitude: number;
    longitude: number;
    /** Complaint photos (jpg/png etc). */
    files: Blob[];
    onProgress?: OnUploadProgress;
}

export interface GetComplaintParams {
    access_token: string;
    complaint_id: number;
}

/** An existing photo to be swapped for a newly uploaded file. */
export interface ComplaintPhotoReplacement {
    /** ID of the existing photo to replace. */
    photo_id: number;
    /** New file to replace it with. */
    file: Blob;
}

export interface UpdateComplaintParams {
    access_token: string;
    complaint_id: number;
    title?: string;
    description?: string;
    address?: string;
    latitude?: number;
    longitude?: number;
    /** IDs of existing photos to retain unchanged. */
    keepPhotoIds?: number[];
    /** New photos to add. */
    newFiles?: Blob[];
    /** Existing photos to replace in place. */
    replacements?: ComplaintPhotoReplacement[];
    /** Index into `newFiles` to mark as the primary photo. */
    primaryNewFileIndex?: number;
    onProgress?: OnUploadProgress;
}

export interface DeleteComplaintParams {
    access_token: string;
    complaint_id: number;
    deletion_reason: string;
}

export interface ListComplaintsByUserParams {
    access_token: string;
    user_id: number;
}

export interface ListMyComplaintsParams {
    access_token: string;
}

declare const ComplaintApi: {
    /** Create a new complaint with attached photos. */
    create(params: CreateComplaintParams): Promise<ApiResponse<ComplaintDetail>>;

    /** Retrieve a single complaint by ID. */
    get(params: GetComplaintParams): Promise<ApiResponse<ComplaintDetail | null>>;

    /** Update a complaint's fields and/or its set of photos (add, replace, keep). */
    update(params: UpdateComplaintParams): Promise<ApiResponse<ComplaintDetail>>;

    /** Delete a complaint. */
    delete(params: DeleteComplaintParams): Promise<ApiResponse<null>>;

    /** List all public complaints (no authentication required). */
    list(): Promise<ApiResponse<PaginatedResult<ComplaintSummary>>>;

    /** List complaints filed by a specific user. */
    listByUser(
        params: ListComplaintsByUserParams
    ): Promise<ApiResponse<PaginatedResult<ComplaintSummary>>>;

    /** List complaints filed by the authenticated user. */
    listMine(
        params: ListMyComplaintsParams
    ): Promise<ApiResponse<PaginatedResult<ComplaintSummary>>>;
};

export default ComplaintApi;
