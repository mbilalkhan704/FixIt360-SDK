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
 * @import {
 *      ListApplicationsRequest,
 *      GetApplicationRequest,
 *      ReviewApplicationRequest,
 *      ListVolunteersRequest,
 *      GetVolunteerRequest,
 *      DeactivateVolunteerRequest,
 *      ListReactivationRequestsRequest,
 *      GetReactivationRequestRequest,
 *      ReviewReactivationRequest
 * } from "../../types/typedefs.js"
 */


import ENDPOINTS from "../../config/endpoints.js";
import { get, patch } from "../../core/request.js";
import { buildAuthorizationHeaders } from "../../core/headers.js";
import VolunteerBuilders from "../../builders/admin/volunteerBuilders.js";
import { removeUndefinedFields } from "../../utils/objectHelpers.js"
import { validateRequiredFields } from "../../utils/validators.js";


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

        headers: buildAuthorizationHeaders({
            accessToken: data.access_token,
        }),

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

    validateRequiredFields(data, [
        "access_token",
        "application_id",
    ]);

    return get({

        endpoint:
            ENDPOINTS.ADMIN.VOLUNTEER_APPLICATIONS.DETAIL(
                data.application_id,
            ),

        headers: buildAuthorizationHeaders({
            accessToken: data.access_token,
        }),

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

    validateRequiredFields(data, [
        "access_token",
        "application_id",
        "status"
    ])

    return patch({

        endpoint:
            ENDPOINTS.ADMIN.VOLUNTEER_APPLICATIONS.REVIEW(
                data.application_id,
            ),

        headers: buildAuthorizationHeaders({
            accessToken: data.access_token,
        }),

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

        headers: buildAuthorizationHeaders({
            accessToken: data.access_token,
        }),
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

    validateRequiredFields(data, [
        "volunteer_id"
    ])

    return get({

        endpoint:
            ENDPOINTS.ADMIN.VOLUNTEERS.DETAIL(
                data.volunteer_id,
            ),

        headers: buildAuthorizationHeaders({
            accessToken: data.access_token,
        }),

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

    validateRequiredFields(data, [
        "volunteer_id",
        "reason"
    ])

    return patch({

        endpoint:
            ENDPOINTS.ADMIN.VOLUNTEERS.DEACTIVATE(
                data.volunteer_id,
            ),

        headers: buildAuthorizationHeaders({
            accessToken: data.access_token,
        }),

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

        headers: buildAuthorizationHeaders({
            accessToken: data.access_token,
        }),
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

    validateRequiredFields(data, [
        "request_id"
    ])

    return get({

        endpoint:
            ENDPOINTS.ADMIN
                .VOLUNTEER_REACTIVATION_REQUESTS
                .DETAIL(
                    data.request_id,
                ),

        headers: buildAuthorizationHeaders({
            accessToken: data.access_token,
        }),

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

    validateRequiredFields(data, [
        "request_id",
        "status"
    ])

    return patch({

        endpoint:
            ENDPOINTS.ADMIN
                .VOLUNTEER_REACTIVATION_REQUESTS
                .REVIEW(
                    data.request_id,
                ),

        headers: buildAuthorizationHeaders({
            accessToken: data.access_token,
        }),

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