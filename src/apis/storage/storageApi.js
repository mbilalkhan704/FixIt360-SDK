/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Storage API
 *
 * Internal SDK use only.
 * ============================================================================
 */


import { uploadProfilePicture, uploadComplaintImages } from "./cloudinaryUpload.js";


/**
 * Standard response envelope returned by SDK calls.
 * @typedef {Object} FixIt360Response
 * @property {boolean} success
 * @property {string} message
 * @property {*} data
 */

/**
 * Aggregate upload progress reported across a multi-file batch upload.
 * @callback OnBatchUploadProgress
 * @param {Object} progress
 * @param {number} progress.progress - Overall percentage complete across all files (0-100).
 * @param {number} progress.loadedBytes - Total bytes uploaded so far across all files.
 * @param {number} progress.totalBytes - Total bytes across all files.
 * @param {number} progress.currentFile - Index (1-based) of the file currently uploading.
 * @param {number} progress.totalFiles - Total number of files being uploaded.
 * @param {number} progress.currentFileProgress - Percentage complete for the current file (0-100).
 * @param {number} progress.currentFileLoadedBytes - Bytes uploaded so far for the current file.
 * @param {number} progress.currentFileTotalBytes - Total bytes for the current file.
 * @returns {void}
 */

/**
 * Simple single-file progress callback, used for the profile picture upload.
 * @callback OnSingleUploadProgress
 * @param {Object} progress
 * @param {number} progress.progress - Percentage complete (0-100).
 * @param {number} progress.loadedBytes - Bytes uploaded so far.
 * @param {number} progress.totalBytes - Total bytes to upload.
 * @returns {void}
 */

/**
 * @typedef {Object} UploadProfilePictureParams
 * @property {string} access_token
 * @property {(File|Blob)} file
 * @property {OnSingleUploadProgress} [onProgress]
 */

/**
 * @typedef {Object} UploadComplaintImagesParams
 * @property {string} access_token
 * @property {(File|Blob)[]} files
 * @property {OnBatchUploadProgress} [onProgress]
 */


/**
 * Uploads a user's profile picture.
 *
 * Authentication:
 *     Required
 *
 * @param {UploadProfilePictureParams} data
 * @returns {Promise<FixIt360Response>}
 */
async function uploadProfilePictureApi(data) {

    return uploadProfilePicture(data);

}


/**
 * Uploads complaint images.
 *
 * Authentication:
 *     Required
 *
 * @param {UploadComplaintImagesParams} data
 * @returns {Promise<FixIt360Response>}
 */
async function uploadComplaintImagesApi(data) {

    return uploadComplaintImages(data);

}


export default {
    uploadProfilePicture: uploadProfilePictureApi,
    uploadComplaintImages: uploadComplaintImagesApi,
};
