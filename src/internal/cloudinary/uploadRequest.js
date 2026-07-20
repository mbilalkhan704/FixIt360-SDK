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
 * @param {Object} data
 * @param {string} data.upload_endpoint
 * @param {File|Blob} data.file
 * @param {string} data.public_id
 * @param {string} data.api_key
 * @param {number|string} data.timestamp
 * @param {string} data.signature
 * @param {string} data.folder
 * @param {string} data.context
 * @param {Function} [data.onProgress]
 *
 * @returns {Promise<Object>}
 */
export async function uploadFile(data) {

    const formData = buildFormData(data);

    const response = await axios.post(

        data.upload_endpoint,

        formData,

        {

            headers: {

                "Content-Type":
                    "multipart/form-data",

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

                data.onProgress(progress);

            },

        },

    );

    return response.data;

}