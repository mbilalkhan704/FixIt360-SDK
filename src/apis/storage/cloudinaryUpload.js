/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Cloudinary Upload
 *
 * Orchestrates the complete upload workflow:
 *
 * 1. Request upload signature from the backend.
 * 2. Upload file(s) to Cloudinary.
 * 3. Parse the Cloudinary response.
 *
 * Internal SDK use only.
 * ============================================================================
 */


import ENDPOINTS from "../../config/endpoints.js";
import { get, post } from "../../core/request.js";
import { buildAuthorizationHeaders } from "../../core/headers.js";
import StorageBuilders from "../../builders/storage/storageBuilders.js";
import { uploadFile } from "../../internal/cloudinary/uploadRequest.js";
import {
    parseProfilePictureUploadResponse,
    parseComplaintImagesUploadResponse,
} from "../../internal/cloudinary/parseUploadResponse.js";


/**
 * Standard response envelope returned by SDK calls.
 * @typedef {Object} FixIt360Response
 * @property {boolean} success
 * @property {string} message
 * @property {*} data
 */

/**
 * Per-chunk upload progress passed to `onProgress` while a single file streams
 * to Cloudinary.
 * @typedef {Object} FileUploadProgress
 * @property {number} progress - Percentage complete for this file (0-100).
 * @property {number} loadedBytes - Bytes uploaded so far for this file.
 * @property {number} totalBytes - Total bytes for this file.
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
 * @param {FileUploadProgress} progress
 * @returns {void}
 */

/**
 * @typedef {Object} UploadProfilePictureData
 * @property {string} access_token
 * @property {(File|Blob)} file
 * @property {OnSingleUploadProgress} [onProgress]
 */

/**
 * @typedef {Object} UploadComplaintImagesData
 * @property {string} access_token
 * @property {(File|Blob)[]} files
 * @property {OnBatchUploadProgress} [onProgress]
 */


/**
 * Requests an upload signature from the backend.
 *
 * @param {string} endpoint
 * @param {string} accessToken
 * @returns {Promise<FixIt360Response>}
 */
async function requestUploadSignature(endpoint, accessToken,) {

    return get({
        endpoint,
        headers: buildAuthorizationHeaders({
            accessToken,
        }),
        payload: {},
    });

}


/**
 * Uploads a profile picture.
 *
 * @param {UploadProfilePictureData} data
 * @returns {Promise<FixIt360Response>}
 */
export async function uploadProfilePicture(data) {

    const payload =
        StorageBuilders.buildProfilePictureUpload(data);

    const signatureResponse =
        await requestUploadSignature(
            ENDPOINTS.STORAGE.PROFILE_PICTURE_SIGNATURE,
            payload.access_token,
        );

    const uploadResponse =
        await uploadFile({
            ...signatureResponse.data,
            file: payload.file,
            onProgress: payload.onProgress,
        });

    return parseProfilePictureUploadResponse(uploadResponse);

}


/**
 * Uploads complaint images.
 *
 * @param {UploadComplaintImagesData} data
 * @returns {Promise<FixIt360Response>}
 */
export async function uploadComplaintImages(data) {

    const payload = StorageBuilders.buildComplaintImagesUpload(data);
    const uploadResponses = [];

    const totalFiles = payload.files.length;
    const totalBytes = payload.files.reduce(
        (sum, file) => sum + file.size,
        0,
    );
    let uploadedBytes = 0;

    for (let index = 0; index < totalFiles; index++) {

        const file = payload.files[index];

        const signatureResponse =
            await requestUploadSignature(
                ENDPOINTS.STORAGE.COMPLAINT_IMAGES_SIGNATURE,
                payload.access_token,
            );

        let previousLoaded = 0;

        const uploadResponse =
            await uploadFile({
                ...signatureResponse.data,
                file,
                onProgress({
                    progress,
                    loadedBytes,
                    totalBytes: currentFileTotalBytes,
                }) {
                    uploadedBytes += loadedBytes - previousLoaded;
                    previousLoaded = loadedBytes;
                    payload.onProgress?.({
                        progress: Math.min(100, Math.round((uploadedBytes / totalBytes) * 100)),
                        loadedBytes: uploadedBytes,
                        totalBytes,
                        currentFile: index + 1,
                        totalFiles,
                        currentFileProgress: progress,
                        currentFileLoadedBytes: loadedBytes,
                        currentFileTotalBytes,
                    });
                },
            });

        uploadResponses.push(uploadResponse);
    }

    return parseComplaintImagesUploadResponse(uploadResponses);

}
