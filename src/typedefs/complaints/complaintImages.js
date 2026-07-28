/**
 * @file Type definitions and JSDoc for `sdk.complaints.images.*`.
 */

/**
 * @typedef {import('../common.js').ApiResponse} ApiResponse
 * @typedef {import('../common.js').ValidationErrors} ValidationErrors
 * @typedef {import('../common.js').OnUploadProgress} OnUploadProgress
 */

// ---------------------------------------------------------------------------
// add
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} AddComplaintImagesParams
 * @property {string} access_token
 * @property {number} complaint_id
 * @property {Blob[]} files - Photos to add to the complaint.
 * @property {number} [primaryFileIndex] - Index into `files` to mark as the primary photo.
 * @property {OnUploadProgress} [onProgress]
 */

/**
 * @typedef {Object} AddComplaintImagesData
 * @property {number} total_photos - Total photo count on the complaint after this call.
 */

/**
 * Add one or more photos to an existing complaint. Fails if the complaint's
 * 5-photo limit would be exceeded.
 * @function
 * @param {AddComplaintImagesParams} params
 * @returns {Promise<ApiResponse<AddComplaintImagesData>|ApiResponse<ValidationErrors>>}
 */

// ---------------------------------------------------------------------------
// delete
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} DeleteComplaintImageParams
 * @property {string} access_token
 * @property {number} complaint_id
 * @property {number} image_id
 */

/**
 * @typedef {Object} DeleteComplaintImageData
 * @property {number} total_photos - Total photo count on the complaint after this call.
 */

/**
 * Delete a single photo from a complaint.
 * @function
 * @param {DeleteComplaintImageParams} params
 * @returns {Promise<ApiResponse<DeleteComplaintImageData>>}
 */

// ---------------------------------------------------------------------------
// replace
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} ReplaceComplaintImageParams
 * @property {string} access_token
 * @property {number} complaint_id
 * @property {number} image_id - ID of the existing photo to replace.
 * @property {Blob} file - New file to replace it with.
 */

/**
 * @typedef {Object} ReplaceComplaintImageData
 * @property {number} photo_id - ID of the replaced photo (unchanged).
 * @property {string} new_image_url
 */

/**
 * Replace an existing complaint photo in place with a new file.
 * @function
 * @param {ReplaceComplaintImageParams} params
 * @returns {Promise<ApiResponse<ReplaceComplaintImageData>>}
 */

export {};
