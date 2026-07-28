/**
 * @file Type definitions and JSDoc for `sdk.complaints.*` (create, get, list, update, delete).
 * Image sub-resource operations live in `./complaintImages.js`.
 */

/**
 * @typedef {import('../common.js').ApiResponse} ApiResponse
 * @typedef {import('../common.js').PaginatedResult} PaginatedResult
 * @typedef {import('../common.js').OnUploadProgress} OnUploadProgress
 */

/**
 * Complaint status values.
 * @typedef {("pending review"|string)} ComplaintStatus
 */

/**
 * A single complaint photo as returned in complaint detail responses.
 * @typedef {Object} ComplaintPhotoDetail
 * @property {number} id
 * @property {string} image_url
 * @property {string} uploaded_at - ISO 8601 timestamp.
 */

/**
 * Full complaint detail (returned by create/get/update).
 * @typedef {Object} ComplaintDetail
 * @property {number} id
 * @property {string} title
 * @property {string} category - e.g. `"pothole"`, `"manhole"`.
 * @property {string} description
 * @property {ComplaintStatus} status
 * @property {string} address
 * @property {number} [latitude]
 * @property {number} [longitude]
 * @property {number} [primary_photo_id]
 * @property {number} [photo_count]
 * @property {ComplaintPhotoDetail[]} photos_detail
 * @property {string} created_at - ISO 8601 timestamp.
 * @property {string} [updated_at] - ISO 8601 timestamp.
 */

/**
 * Summarized complaint as returned in list responses.
 * @typedef {Object} ComplaintSummary
 * @property {number} id
 * @property {string} title
 * @property {string} category
 * @property {string} description
 * @property {ComplaintStatus} status
 * @property {string} address
 * @property {number} latitude
 * @property {number} longitude
 * @property {number} photo_count
 * @property {?string} primary_photo - URL of the primary photo.
 * @property {string} created_at - ISO 8601 timestamp.
 */

// ---------------------------------------------------------------------------
// create
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} CreateComplaintParams
 * @property {string} access_token
 * @property {string} title
 * @property {string} category
 * @property {string} description
 * @property {string} address
 * @property {number} latitude
 * @property {number} longitude
 * @property {Blob[]} files - Complaint photos (jpg/png etc).
 * @property {OnUploadProgress} [onProgress]
 */

/**
 * Create a new complaint with attached photos.
 * @function
 * @param {CreateComplaintParams} params
 * @returns {Promise<ApiResponse<ComplaintDetail>>}
 */

// ---------------------------------------------------------------------------
// get
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} GetComplaintParams
 * @property {string} access_token
 * @property {number} complaint_id
 */

/**
 * Retrieve a single complaint by ID.
 * @function
 * @param {GetComplaintParams} params
 * @returns {Promise<ApiResponse<ComplaintDetail|null>>}
 */

// ---------------------------------------------------------------------------
// update
// ---------------------------------------------------------------------------

/**
 * An existing photo to be swapped for a newly uploaded file.
 * @typedef {Object} ComplaintPhotoReplacement
 * @property {number} photo_id - ID of the existing photo to replace.
 * @property {Blob} file - New file to replace it with.
 */

/**
 * @typedef {Object} UpdateComplaintParams
 * @property {string} access_token
 * @property {number} complaint_id
 * @property {string} [title]
 * @property {string} [description]
 * @property {string} [address]
 * @property {number} [latitude]
 * @property {number} [longitude]
 * @property {number[]} [keepPhotoIds] - IDs of existing photos to retain unchanged.
 * @property {Blob[]} [newFiles] - New photos to add.
* @property {ComplaintPhotoReplacement[]} [replacements] - Existing photos to replace in place.
 * @property {number} [primaryPhotoId] - ID of an existing (kept or replaced) photo to mark
 *   as primary. Mutually exclusive with `primaryNewFileIndex` — supplying both throws
 *   `InvalidRequestDataError`.
 * @property {number} [primaryNewFileIndex] - Index into `newFiles` to mark as the primary
 *   photo. Mutually exclusive with `primaryPhotoId`.
 * @property {OnUploadProgress} [onProgress]
 */

/**
 * Update a complaint's fields and/or its set of photos (add, replace, keep).
 * @function
 * @param {UpdateComplaintParams} params
 * @returns {Promise<ApiResponse<ComplaintDetail>>}
 */

// ---------------------------------------------------------------------------
// delete
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} DeleteComplaintParams
 * @property {string} access_token
 * @property {number} complaint_id
 * @property {string} deletion_reason
 */

/**
 * Delete a complaint.
 * @function
 * @param {DeleteComplaintParams} params
 * @returns {Promise<ApiResponse<null>>}
 */

// ---------------------------------------------------------------------------
// list
// ---------------------------------------------------------------------------

/**
 * List all public complaints (no authentication required).
 * @function
 * @returns {Promise<ApiResponse<PaginatedResult<ComplaintSummary>>>}
 */

// ---------------------------------------------------------------------------
// listByUser
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} ListComplaintsByUserParams
 * @property {string} access_token
 * @property {number} user_id
 */

/**
 * List complaints filed by a specific user.
 * @function
 * @param {ListComplaintsByUserParams} params
 * @returns {Promise<ApiResponse<PaginatedResult<ComplaintSummary>>>}
 */

// ---------------------------------------------------------------------------
// listMine
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} ListMyComplaintsParams
 * @property {string} access_token
 */

/**
 * List complaints filed by the authenticated user.
 * @function
 * @param {ListMyComplaintsParams} params
 * @returns {Promise<ApiResponse<PaginatedResult<ComplaintSummary>>>}
 */

export { };
