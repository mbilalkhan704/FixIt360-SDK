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

import {
    post,
} from "../../core/request.js";

import {
    buildAuthorizationHeaders,
} from "../../core/headers.js";

import StorageBuilders from "../../builders/storage/storageBuilders.js";

import {
    uploadFile,
} from "../../internal/cloudinary/uploadRequest.js";

import {
    parseProfilePictureUploadResponse,
    parseComplaintImagesUploadResponse,
} from "../../internal/cloudinary/parseUploadResponse.js";


/**
 * Requests an upload signature from the backend.
 *
 * @param {string} endpoint
 * @param {string} accessToken
 *
 * @returns {Promise<FixIt360Response>}
 */
async function requestUploadSignature(
    endpoint,
    accessToken,
) {

    return post({

        endpoint,

        headers: buildAuthorizationHeaders(
            accessToken,
        ),

        payload: {},

    });

}


/**
 * Uploads a profile picture.
 *
 * @param {Object} data
 *
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

    return parseProfilePictureUploadResponse(

        uploadResponse,

    );

}


/**
 * Uploads complaint images.
 *
 * @param {Object} data
 *
 * @returns {Promise<FixIt360Response>}
 */
export async function uploadComplaintImages(data) {

    const payload =
        StorageBuilders.buildComplaintImagesUpload(data);

    const uploadResponses = [];

    const totalFiles = payload.files.length;

    for (let index = 0; index < totalFiles; index++) {

        const file = payload.files[index];

        const signatureResponse =
            await requestUploadSignature(

                ENDPOINTS.STORAGE.COMPLAINT_IMAGES_SIGNATURE,

                payload.access_token,

            );

        const uploadResponse =
            await uploadFile({

                ...signatureResponse.data,

                file,

            });

        uploadResponses.push(
            uploadResponse,
        );

        if (
            typeof payload.onProgress === "function"
        ) {

            payload.onProgress(

                Math.round(
                    ((index + 1) * 100) / totalFiles
                ),

            );

        }

    }

    return parseComplaintImagesUploadResponse(

        uploadResponses,

    );

}