/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Complaint API
 *
 * Handles complaint related operations.
 * ============================================================================
 */


/**
 * @import {ApiResponse} from "../../types/typedefs.js"
 */
/**
 * @typedef {Object} ListComplaintsRequest
 * @property {string} access_token
 */

/**
 * @typedef {Object} GetComplaintRequest
 * @property {string} access_token
 * @property {number|string} complaint_id
 */

/**
 * @typedef {Object} CreateComplaintRequest
 * @property {string} access_token
 * @property {string} title
 * @property {string} description
 * @property {number} latitude
 * @property {number} longitude
 * @property {string} category
 * @property {Array<File|Blob>} [files]
 * @property {function(number): void} [onProgress]
 */

/**
 * @typedef {Object} UpdateComplaintRequest
 * @property {string} access_token
 * @property {number|string} complaint_id
 * @property {string} [title]
 * @property {string} [description]
 * @property {number} [latitude]
 * @property {number} [longitude]
 * @property {string} [category]
 */

/**
 * @typedef {Object} DeleteComplaintRequest
 * @property {string} access_token
 * @property {number|string} complaint_id
 */

/**
 * @typedef {Object} ListMineRequest
 * @property {string} access_token
 */

/**
 * @typedef {Object} ListByUserRequest
 * @property {string} access_token
 * @property {number|string} user_id
 */


import ENDPOINTS from "../../config/endpoints.js";

import {
    get,
    post,
    patch,
    del,
} from "../../core/request.js";

import {
    buildAuthorizationHeaders,
} from "../../core/headers.js";

import ComplaintBuilders from "../../builders/complaints/complaintBuilders.js";

import ComplaintImagesApi from "./complaintImagesApi.js";


/**
 * Retrieves all complaints.
 *
 * Authentication:
 *     Required
 *
 * @param {ListComplaintsRequest} data
 *
 * @returns {Promise<ApiResponse>}
 */
async function listComplaintsApi(data) {

    return get({

        endpoint: ENDPOINTS.COMPLAINTS.LIST,

        headers: buildAuthorizationHeaders(
            data.access_token,
        ),

    });

}


/**
 * Retrieves a complaint.
 *
 * Authentication:
 *     Required
 *
 * @param {GetComplaintRequest} data
 *
 * @returns {Promise<ApiResponse & { data: ComplaintData }>}
 */
async function getComplaintApi(data) {

    return get({

        endpoint: ENDPOINTS.COMPLAINTS.DETAIL(
            data.complaint_id,
        ),

        headers: buildAuthorizationHeaders(
            data.access_token,
        ),

    });

}


/**
 * Creates a complaint.
 *
 * If files are provided, they are automatically uploaded
 * and attached to the newly created complaint.
 *
 * Authentication:
 *     Required
 *
 * @param {CreateComplaintRequest} data
 *
 * @returns {Promise<ApiResponse & { data: ComplaintData }>}
 */
async function createComplaintApi(data) {

    const response = await post({

        endpoint: ENDPOINTS.COMPLAINTS.CREATE,

        headers: buildAuthorizationHeaders(
            data.access_token,
        ),

        payload:
            ComplaintBuilders.buildCreateComplaint(
                data,
            ),

    });

    if (
        Array.isArray(data.files) &&
        data.files.length > 0
    ) {

        await ComplaintImagesApi.add({

            access_token: data.access_token,

            complaint_id: response.data.id,

            files: data.files,

            onProgress: data.onProgress,

        });

    }

    return response;

}


/**
 * Updates a complaint.
 *
 * Authentication:
 *     Required
 *
 * @param {UpdateComplaintRequest} data
 *
 * @returns {Promise<ApiResponse & { data: ComplaintData }>}
 */
async function updateComplaintApi(data) {

    return patch({

        endpoint: ENDPOINTS.COMPLAINTS.UPDATE(
            data.complaint_id,
        ),

        headers: buildAuthorizationHeaders(
            data.access_token,
        ),

        payload:
            ComplaintBuilders.buildUpdateComplaint(
                data,
            ),

    });

}


/**
 * Deletes a complaint.
 *
 * Authentication:
 *     Required
 *
 * @param {DeleteComplaintRequest} data
 *
 * @returns {Promise<ApiResponse>}
 */
async function deleteComplaintApi(data) {

    return del({

        endpoint: ENDPOINTS.COMPLAINTS.DELETE(
            data.complaint_id,
        ),

        headers: buildAuthorizationHeaders(
            data.access_token,
        ),

    });

}


/**
 * Retrieves complaints created by the authenticated user.
 *
 * Authentication:
 *     Required
 *
 * @param {ListMineRequest} data
 *
 * @returns {Promise<ApiResponse>}
 */
async function listMineApi(data) {

    return get({

        endpoint: ENDPOINTS.COMPLAINTS.MY_LIST,

        headers: buildAuthorizationHeaders(
            data.access_token,
        ),

    });

}


/**
 * Retrieves complaints created by a specific user.
 *
 * Authentication:
 *     Required
 *
 * @param {ListByUserRequest} data
 *
 * @returns {Promise<ApiResponse>}
 */
async function listByUserApi(data) {

    return get({

        endpoint: ENDPOINTS.COMPLAINTS.USER_LIST(
            data.user_id,
        ),

        headers: buildAuthorizationHeaders(
            data.access_token,
        ),

    });

}


export default {

    list: listComplaintsApi,

    listMine: listMineApi,

    listByUser: listByUserApi,

    get: getComplaintApi,

    create: createComplaintApi,

    update: updateComplaintApi,

    delete: deleteComplaintApi,

};