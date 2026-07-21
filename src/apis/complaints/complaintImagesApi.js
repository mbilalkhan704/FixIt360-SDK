/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Complaint Images API
 *
 * Handles complaint image operations.
 * ============================================================================
 */


/**
 * @import {ApiResponse} from "../../types/typedefs.js"
 */

/**
 * @typedef {Object} AddComplaintImagesRequest
 * @property {string} access_token
 * @property {number|string} complaint_id
 * @property {Array<File|Blob>} files
 * @property {function(number): void} [onProgress]
 */

/**
 * @typedef {Object} ReplaceComplaintImageRequest
 * @property {string} access_token
 * @property {number|string} complaint_id
 * @property {number|string} image_id
 * @property {File|Blob} file
 * @property {function(number): void} [onProgress]
 */

/**
 * @typedef {Object} DeleteComplaintImageRequest
 * @property {string} access_token
 * @property {number|string} complaint_id
 * @property {number|string} image_id
 */


import ENDPOINTS from "../../config/endpoints.js";

import {
    post,
    patch,
    del,
} from "../../core/request.js";

import {
    buildAuthorizationHeaders,
} from "../../core/headers.js";

import StorageApi from "../storage/storageApi.js";

import ComplaintBuilders from "../../builders/complaints/complaintBuilders.js";


/**
 * Adds images to a complaint.
 *
 * Authentication:
 *     Required
 *
 * @param {AddComplaintImagesRequest} data
 *
 * @returns {Promise<ApiResponse>}
 */
async function addImagesApi(data) {

    const uploadResponse =
        await StorageApi.uploadComplaintImages({

            access_token: data.access_token,

            files: data.files,

            onProgress: data.onProgress,

        });

    return post({

        endpoint:
            ENDPOINTS.COMPLAINTS.ADD_IMAGES(
                data.complaint_id,
            ),

        headers: buildAuthorizationHeaders(
            data.access_token,
        ),

        payload:
            ComplaintBuilders.buildAddImages({

                complaint_image_keys:
                    uploadResponse.data
                        .complaint_image_keys,

            }),

    });

}


/**
 * Replaces a complaint image.
 *
 * Authentication:
 *     Required
 *
 * @param {ReplaceComplaintImageRequest} data
 *
 * @returns {Promise<ApiResponse>}
 */
async function replaceImageApi(data) {

    const uploadResponse =
        await StorageApi.uploadComplaintImages({

            access_token: data.access_token,

            files: [data.file],

            onProgress: data.onProgress,

        });

    return patch({

        endpoint:
            ENDPOINTS.COMPLAINTS.REPLACE_IMAGE(

                data.complaint_id,

                data.image_id,

            ),

        headers: buildAuthorizationHeaders(
            data.access_token,
        ),

        payload:
            ComplaintBuilders.buildReplaceImage({

                complaint_image_key:
                    uploadResponse.data
                        .complaint_image_keys[0],

            }),

    });

}


/**
 * Deletes a complaint image.
 *
 * Authentication:
 *     Required
 *
 * @param {DeleteComplaintImageRequest} data
 *
 * @returns {Promise<ApiResponse>}
 */
async function deleteImageApi(data) {

    return del({

        endpoint:
            ENDPOINTS.COMPLAINTS.DELETE_IMAGE(

                data.complaint_id,

                data.image_id,

            ),

        headers: buildAuthorizationHeaders(
            data.access_token,
        ),

    });

}


export default {

    add: addImagesApi,

    replace: replaceImageApi,

    delete: deleteImageApi,

};