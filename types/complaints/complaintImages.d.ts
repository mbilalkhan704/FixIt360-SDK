import type { ApiResponse, ValidationErrors, OnUploadProgress } from "../common";

export interface AddComplaintImagesParams {
    access_token: string;
    complaint_id: number;
    /** Photos to add to the complaint. */
    files: Blob[];
    /** Index into `files` to mark as the primary photo. */
    primaryFileIndex?: number;
    onProgress?: OnUploadProgress;
}

export interface AddComplaintImagesData {
    /** Total photo count on the complaint after this call. */
    total_photos: number;
}

export interface DeleteComplaintImageParams {
    access_token: string;
    complaint_id: number;
    image_id: number;
}

export interface DeleteComplaintImageData {
    /** Total photo count on the complaint after this call. */
    total_photos: number;
}

export interface ReplaceComplaintImageParams {
    access_token: string;
    complaint_id: number;
    /** ID of the existing photo to replace. */
    image_id: number;
    /** New file to replace it with. */
    file: Blob;
}

export interface ReplaceComplaintImageData {
    /** ID of the replaced photo (unchanged). */
    photo_id: number;
    new_image_url: string;
}

export interface ComplaintImagesApi {
    /**
     * Add one or more photos to an existing complaint. Fails if the complaint's
     * 5-photo limit would be exceeded.
     */
    add(
        params: AddComplaintImagesParams
    ): Promise<ApiResponse<AddComplaintImagesData> | ApiResponse<ValidationErrors>>;

    /** Delete a single photo from a complaint. */
    delete(params: DeleteComplaintImageParams): Promise<ApiResponse<DeleteComplaintImageData>>;

    /** Replace an existing complaint photo in place with a new file. */
    replace(params: ReplaceComplaintImageParams): Promise<ApiResponse<ReplaceComplaintImageData>>;
}

declare const ComplaintImagesApi: ComplaintImagesApi;

export default ComplaintImagesApi;
