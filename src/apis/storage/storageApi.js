/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Storage API
 *
 * Public SDK interface for storage operations.
 * ============================================================================
 */

import {
    uploadProfilePicture,
    uploadComplaintImages,
} from "./cloudinaryUpload.js";


/**
 * Uploads a user's profile picture.
 *
 * Authentication:
 *     Required
 *
 * @param {Object} data
 * @param {string} data.access_token
 * @param {File|Blob} data.file
 * @param {Function} [data.onProgress]
 *
 * @returns {Promise<FixIt360Response>}
 *
 * @example
 * await api.storage.uploadProfilePicture({
 *     access_token,
 *     file,
 * });
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
 * @param {Object} data
 * @param {string} data.access_token
 * @param {Array<File|Blob>} data.files
 * @param {Function} [data.onProgress]
 *
 * @returns {Promise<FixIt360Response>}
 *
 * @example
 * await api.storage.uploadComplaintImages({
 *     access_token,
 *     files,
 * });
 */
async function uploadComplaintImagesApi(data) {

    return uploadComplaintImages(data);

}


export default {

    uploadProfilePicture: uploadProfilePictureApi,

    uploadComplaintImages: uploadComplaintImagesApi,

};