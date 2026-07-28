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
 * @typedef {import('../../typedefs/common.js').ApiResponse} ApiResponse
 * @typedef {import('../../typedefs/common.js').PaginatedResult} PaginatedResult
 * @typedef {import('../../typedefs/admin/volunteer.js').VolunteerApplication} VolunteerApplication
 * @typedef {import('../../typedefs/admin/volunteer.js').VolunteerReactivationRequest} VolunteerReactivationRequest
 * @typedef {import('../../typedefs/admin/volunteer.js').AdminVolunteer} AdminVolunteer
 * @typedef {import('../../typedefs/admin/volunteer.js').AdminVolunteerSummary} AdminVolunteerSummary
 * @typedef {import('../../typedefs/admin/volunteer.js').ListVolunteerApplicationsParams} ListVolunteerApplicationsParams
 * @typedef {import('../../typedefs/admin/volunteer.js').GetVolunteerApplicationParams} GetVolunteerApplicationParams
 * @typedef {import('../../typedefs/admin/volunteer.js').ReviewVolunteerApplicationParams} ReviewVolunteerApplicationParams
 * @typedef {import('../../typedefs/admin/volunteer.js').ListVolunteersParams} ListVolunteersParams
 * @typedef {import('../../typedefs/admin/volunteer.js').GetVolunteerParams} GetVolunteerParams
 * @typedef {import('../../typedefs/admin/volunteer.js').DeactivateVolunteerParams} DeactivateVolunteerParams
 * @typedef {import('../../typedefs/admin/volunteer.js').ListVolunteerReactivationRequestsParams} ListVolunteerReactivationRequestsParams
 * @typedef {import('../../typedefs/admin/volunteer.js').GetVolunteerReactivationRequestParams} GetVolunteerReactivationRequestParams
 * @typedef {import('../../typedefs/admin/volunteer.js').ReviewVolunteerReactivationRequestParams} ReviewVolunteerReactivationRequestParams
 */


import ENDPOINTS from "../../config/endpoints.js";
import { get, patch } from "../../core/request.js";
import { buildAuthorizationHeaders } from "../../core/headers.js";
import VolunteerBuilders from "../../builders/admin/volunteerBuilders.js";
import { removeUndefinedFields } from "../../utils/objectHelpers.js"
import { validateRequiredFields } from "../../utils/validators.js";


/**
 * List volunteer applications, optionally filtered by status.
 * @param {ListVolunteerApplicationsParams} params
 * @returns {Promise<ApiResponse<PaginatedResult<VolunteerApplication>>>}
 */
async function listApplicationsApi(data) {

    return get({
        endpoint: ENDPOINTS.ADMIN.VOLUNTEER_APPLICATIONS.LIST,
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
 * Retrieve a single volunteer application by ID.
 * @param {GetVolunteerApplicationParams} params
 * @returns {Promise<ApiResponse<VolunteerApplication>>}
 */
async function getApplicationApi(data) {

    validateRequiredFields(data, [
        "access_token",
        "application_id",
    ]);

    return get({
        endpoint: ENDPOINTS.ADMIN.VOLUNTEER_APPLICATIONS.DETAIL(
            data.application_id,
        ),
        headers: buildAuthorizationHeaders({
            accessToken: data.access_token,
        }),
    });

}


/**
 * Approve or reject a pending volunteer application.
 * @param {ReviewVolunteerApplicationParams} params
 * @returns {Promise<ApiResponse<null>>}
 */
async function reviewApplicationApi(data) {

    validateRequiredFields(data, [
        "access_token",
        "application_id",
        "status"
    ])

    return patch({
        endpoint: ENDPOINTS.ADMIN.VOLUNTEER_APPLICATIONS.REVIEW(
            data.application_id,
        ),
        headers: buildAuthorizationHeaders({
            accessToken: data.access_token,
        }),
        payload: VolunteerBuilders.buildApplicationReview(data),
    });

}


/**
 * List all volunteers (active and inactive).
 * @param {ListVolunteersParams} params
 * @returns {Promise<ApiResponse<PaginatedResult<AdminVolunteerSummary>>>}
 */
async function listVolunteersApi(data) {

    return get({
        endpoint: ENDPOINTS.ADMIN.VOLUNTEERS.LIST,
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
 * Retrieve full detail for a single volunteer.
 * @param {GetVolunteerParams} params
 * @returns {Promise<ApiResponse<AdminVolunteer>>}
 */
async function getVolunteerApi(data) {

    validateRequiredFields(data, [
        "volunteer_id"
    ])

    return get({
        endpoint: ENDPOINTS.ADMIN.VOLUNTEERS.DETAIL(
            data.volunteer_id,
        ),
        headers: buildAuthorizationHeaders({
            accessToken: data.access_token,
        }),
    });

}


/**
 * Deactivate an active volunteer (admin-initiated).
 * @param {DeactivateVolunteerParams} params
 * @returns {Promise<ApiResponse<null>>}
 */
async function deactivateVolunteerApi(data) {

    validateRequiredFields(data, [
        "volunteer_id",
        "reason"
    ])

    return patch({
        endpoint: ENDPOINTS.ADMIN.VOLUNTEERS.DEACTIVATE(
            data.volunteer_id,
        ),
        headers: buildAuthorizationHeaders({
            accessToken: data.access_token,
        }),
        payload: VolunteerBuilders.buildVolunteerDeactivation(data),
    });

}


/**
 * List volunteer reactivation requests.
 * @param {ListVolunteerReactivationRequestsParams} params
 * @returns {Promise<ApiResponse<PaginatedResult<VolunteerReactivationRequest>>>}
 */
async function listReactivationRequestsApi(data) {

    return get({
        endpoint: ENDPOINTS.ADMIN.VOLUNTEER_REACTIVATION_REQUESTS.LIST,
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
 * Retrieve a single volunteer reactivation request by ID.
 * @param {GetVolunteerReactivationRequestParams} params
 * @returns {Promise<ApiResponse<VolunteerReactivationRequest>>}
 */
async function getReactivationRequestApi(data) {

    validateRequiredFields(data, [
        "request_id"
    ])

    return get({
        endpoint: ENDPOINTS.ADMIN.VOLUNTEER_REACTIVATION_REQUESTS.DETAIL(
            data.request_id,
        ),
        headers: buildAuthorizationHeaders({
            accessToken: data.access_token,
        }),
    });

}


/**
 * Approve or reject a pending volunteer reactivation request.
 * @param {ReviewVolunteerReactivationRequestParams} params
 * @returns {Promise<ApiResponse<null>>}
 */
async function reviewReactivationRequestApi(data) {

    validateRequiredFields(data, [
        "request_id",
        "status"
    ])

    return patch({
        endpoint: ENDPOINTS.ADMIN.VOLUNTEER_REACTIVATION_REQUESTS.REVIEW(
            data.request_id,
        ),
        headers: buildAuthorizationHeaders({
            accessToken: data.access_token,
        }),
        payload: VolunteerBuilders.buildReactivationReview(data),
    });

}


export default {
    listVolunteerApplications: listApplicationsApi,
    getVolunteerApplication: getApplicationApi,
    reviewVolunteerApplication: reviewApplicationApi,
    listVolunteers: listVolunteersApi,
    getVolunteer: getVolunteerApi,
    deactivateVolunteer: deactivateVolunteerApi,
    listVolunteerReactivationRequests: listReactivationRequestsApi,
    getVolunteerReactivationRequest: getReactivationRequestApi,
    reviewVolunteerReactivationRequest: reviewReactivationRequestApi,
};