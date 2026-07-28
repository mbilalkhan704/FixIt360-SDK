/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Cloudinary Upload Request
 *
 * Performs file uploads to Cloudinary.
 *
 * Internal SDK use only.
 * ============================================================================
 */


import axios from "axios";
import buildFormData from "./buildFormData.js";


/**
 * @import { AxiosError } from "axios";
 */

/**
 * Progress callback invoked while a single file uploads to Cloudinary.
 * @callback OnFileUploadProgress
 * @param {Object} progress
 * @param {number} progress.progress - Percentage complete (0-100).
 * @param {number} progress.loadedBytes - Bytes uploaded so far.
 * @param {number} progress.totalBytes - Total bytes to upload.
 * @returns {void}
 */

/**
 * Parameters for a single Cloudinary file upload, combining the signed
 * upload params (from the backend signature endpoint) with the file itself.
 * @typedef {Object} UploadFileParams
 * @property {string} upload_endpoint - Cloudinary upload URL to POST the file to.
 * @property {(File|Blob)} file - The file being uploaded.
 * @property {string} [public_id] - Cloudinary public ID for the asset, if pre-assigned.
 * @property {string} api_key - Cloudinary API key.
 * @property {(number|string)} timestamp - Signature timestamp.
 * @property {string} signature - Cloudinary upload signature.
 * @property {string} folder - Destination folder on Cloudinary.
 * @property {string} context - Cloudinary context metadata string.
 * @property {OnFileUploadProgress} [onProgress] - Callback invoked with upload progress updates.
 */

/**
 * Raw response body returned by Cloudinary's upload endpoint. Shape is
 * whatever Cloudinary's API returns; not normalized by this function.
 * @typedef {Object.<string, *>} CloudinaryUploadResponse
 */


/**
 * Uploads a single file to Cloudinary.
 *
 * Sends the file and its associated upload parameters to the
 * provided Cloudinary upload endpoint. If supplied, the
 * `onProgress` callback receives upload progress updates.
 *
 * @param {UploadFileParams} data
 * @returns {Promise<CloudinaryUploadResponse>} The Cloudinary upload response.
 * @throws {AxiosError}
 */
export async function uploadFile(data) {

    const formData = buildFormData(data);

    const response = await axios.post(

        data.upload_endpoint,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },

            onUploadProgress(event) {

                if (
                    typeof data.onProgress !== "function"
                ) {
                    return;
                }

                if (!event.total) {
                    return;
                }

                const progress = Math.round(
                    (event.loaded * 100) / event.total,
                );

                data.onProgress?.({
                    progress,
                    loadedBytes: event.loaded,
                    totalBytes: event.total,
                });
            },
        },
    );

    return response.data;

}
