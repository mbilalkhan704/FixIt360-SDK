/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Admin Volunteer API
 *
 * Handles volunteer administration operations.
 * ============================================================================
 */


/**
 * @import {ApiResponse} from "../../types/typedefs.js"
 */

/**
 * @typedef {Object} ListApplicationsRequest
 * @property {string} access_token
 * @property {('pending'|'approved'|'rejected')} [status]
 * @property {string|number} [reviewed_by]
 */

/**
 * @typedef {Object} GetApplicationRequest
 * @property {string} access_token
 * @property {number|string} application_id
 */

/**
 * @typedef {Object} ReviewApplicationRequest
 * @property {string} access_token
 * @property {number|string} application_id
 * @property {('approved'|'rejected')} status
 */

/**
 * @typedef {Object} ListVolunteersRequest
 * @property {string} access_token
 * @property {('active'|'inactive')} [status]
 * @property {string|number} [approved_by]
 * @property {string|number} [deactivated_by]
 */

/**
 * @typedef {Object} GetVolunteerRequest
 * @property {string} access_token
 * @property {number|string} volunteer_id
 */

/**
 * @typedef {Object} DeactivateVolunteerRequest
 * @property {string} access_token
 * @property {number|string} volunteer_id
 * @property {string} reason
 */

/**
 * @typedef {Object} ListReactivationRequestsRequest
 * @property {string} access_token
 * @property {string} [status]
 * @property {string|number} [reviewed_by]
 */

/**
 * @typedef {Object} GetReactivationRequestRequest
 * @property {string} access_token
 * @property {number|string} request_id
 */

/**
 * @typedef {Object} ReviewReactivationRequest
 * @property {string} access_token
 * @property {number|string} request_id
 * @property {('approved'|'rejected')} status
 */


import ENDPOINTS from "../../config/endpoints.js";

import {
    get,
    patch,
} from "../../core/request.js";

import {
    buildAuthorizationHeaders,
} from "../../core/headers.js";

import VolunteerBuilders from "../../builders/admin/volunteerBuilders.js";
import {
    removeUndefinedFields
} from "../../utils/objectHelpers.js"

/**
 * Retrieves volunteer applications.
 *
 * Authentication:
 *     Required (Admin)
 *
 * @param {ListApplicationsRequest} data
 *
 * @returns {Promise<ApiResponse>}
 */
async function listApplicationsApi(data) {

    return get({

        endpoint:
            ENDPOINTS.ADMIN.VOLUNTEER_APPLICATIONS.LIST,

        headers: buildAuthorizationHeaders(
            data.access_token,
        ),

        query: removeUndefinedFields({
            status: data.status,
            reviewed_by: data.reviewed_by,
        }),

    });

}


/**
 * Retrieves a volunteer application.
 *
 * Authentication:
 *     Required (Admin)
 *
 * @param {GetApplicationRequest} data
 *
 * @returns {Promise<ApiResponse>}
 */
async function getApplicationApi(data) {

    return get({

        endpoint:
            ENDPOINTS.ADMIN.VOLUNTEER_APPLICATIONS.DETAIL(
                data.application_id,
            ),

        headers: buildAuthorizationHeaders(
            data.access_token,
        ),

    });

}


/**
 * Reviews a volunteer application.
 *
 * Authentication:
 *     Required (Admin)
 *
 * @param {ReviewApplicationRequest} data
 *
 * @returns {Promise<ApiResponse>}
 */
async function reviewApplicationApi(data) {

    return patch({

        endpoint:
            ENDPOINTS.ADMIN.VOLUNTEER_APPLICATIONS.REVIEW(
                data.application_id,
            ),

        headers: buildAuthorizationHeaders(
            data.access_token,
        ),

        payload:
            VolunteerBuilders.buildApplicationReview(
                data,
            ),

    });

}


/**
 * Retrieves volunteers.
 *
 * Authentication:
 *     Required (Admin)
 *
 * @param {ListVolunteersRequest} data
 *
 * @returns {Promise<ApiResponse>}
 */
async function listVolunteersApi(data) {

    return get({

        endpoint:
            ENDPOINTS.ADMIN.VOLUNTEERS.LIST,

        headers: buildAuthorizationHeaders(
            data.access_token,
        ),
        query: removeUndefinedFields({
            status: data.status,
            approved_by: data.approved_by,
            deactivated_by: data.deactivated_by,
        }),

    });

}


/**
 * Retrieves a volunteer.
 *
 * Authentication:
 *     Required (Admin)
 *
 * @param {GetVolunteerRequest} data
 *
 * @returns {Promise<ApiResponse>}
 */
async function getVolunteerApi(data) {

    return get({

        endpoint:
            ENDPOINTS.ADMIN.VOLUNTEERS.DETAIL(
                data.volunteer_id,
            ),

        headers: buildAuthorizationHeaders(
            data.access_token,
        ),

    });

}


/**
 * Deactivates a volunteer.
 *
 * Authentication:
 *     Required (Admin)
 *
 * @param {DeactivateVolunteerRequest} data
 *
 * @returns {Promise<ApiResponse>}
 */
async function deactivateVolunteerApi(data) {

    return patch({

        endpoint:
            ENDPOINTS.ADMIN.VOLUNTEERS.DEACTIVATE(
                data.volunteer_id,
            ),

        headers: buildAuthorizationHeaders(
            data.access_token,
        ),

        payload:
            VolunteerBuilders.buildVolunteerDeactivation(
                data,
            ),

    });

}


/**
 * Retrieves volunteer reactivation requests.
 *
 * Authentication:
 *     Required (Admin)
 *
 * @param {ListReactivationRequestsRequest} data
 *
 * @returns {Promise<ApiResponse>}
 */
async function listReactivationRequestsApi(data) {

    return get({

        endpoint:
            ENDPOINTS.ADMIN
                .VOLUNTEER_REACTIVATION_REQUESTS
                .LIST,

        headers: buildAuthorizationHeaders(
            data.access_token,
        ),
        query: removeUndefinedFields({
            status: data.status,
            reviewed_by: data.reviewed_by,
        }),

    });

}


/**
 * Retrieves a volunteer reactivation request.
 *
 * Authentication:
 *     Required (Admin)
 *
 * @param {GetReactivationRequestRequest} data
 *
 * @returns {Promise<ApiResponse>}
 */
async function getReactivationRequestApi(data) {

    return get({

        endpoint:
            ENDPOINTS.ADMIN
                .VOLUNTEER_REACTIVATION_REQUESTS
                .DETAIL(
                    data.request_id,
                ),

        headers: buildAuthorizationHeaders(
            data.access_token,
        ),

    });

}


/**
 * Reviews a volunteer reactivation request.
 *
 * Authentication:
 *     Required (Admin)
 *
 * @param {ReviewReactivationRequest} data
 *
 * @returns {Promise<ApiResponse>}
 */
async function reviewReactivationRequestApi(data) {

    return patch({

        endpoint:
            ENDPOINTS.ADMIN
                .VOLUNTEER_REACTIVATION_REQUESTS
                .REVIEW(
                    data.request_id,
                ),

        headers: buildAuthorizationHeaders(
            data.access_token,
        ),

        payload:
            VolunteerBuilders.buildReactivationReview(
                data,
            ),

    });

}


export default {

    listVolunteerApplications: listApplicationsApi,

    getVolunteerApplication: getApplicationApi,

    reviewVolunteerApplication: reviewApplicationApi,

    listVolunteers: listVolunteersApi,

    getVolunteer: getVolunteerApi,

    deactivateVolunteer: deactivateVolunteerApi,

    listVolunteerReactivationRequests:
        listReactivationRequestsApi,

    getVolunteerReactivationRequest:
        getReactivationRequestApi,

    reviewVolunteerReactivationRequest:
        reviewReactivationRequestApi,

};