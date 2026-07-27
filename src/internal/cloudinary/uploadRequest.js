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
 * Uploads a single file to Cloudinary.
 *
 * Sends the file and its associated upload parameters to the
 * provided Cloudinary upload endpoint. If supplied, the
 * `onProgress` callback receives upload progress updates.
 *
 * @import { AxiosError } from "axios";
 * 
 * @typedef {Object} CloudinaryUploadResponse
 * @property {Object} data
 * @property {string} data.upload_endpoint
 * @property {File|Blob} data.file
 * @property {string} data.public_id
 * @property {string} data.api_key
 * @property {number|string} data.timestamp
 * @property {string} data.signature
 * @property {string} data.folder
 * @property {string} data.context
 * @property {Function} [data.onProgress] Callback invoked with upload progress updates.
 *
 * @returns {Promise<Object>} The Cloudinary upload response.
 *
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