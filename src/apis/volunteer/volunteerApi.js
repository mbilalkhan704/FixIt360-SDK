/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Volunteer API
 *
 * Handles volunteer related operations.
 * ============================================================================
 */


/**
 * @import {ApiResponse} from "../../types/typedefs.js"
 * @import {
 *      AvailabilitySlot,
 *      GetVolunteerStatusRequest,
 *      ApplyVolunteerRequest,
 *      GetVolunteerProfileRequest,
 *      UpdateAvailabilityRequest,
 *      VolunteerResignationRequest,
 *      VolunteerReactivationRequest
 * } from "../../types/typedefs.js"
 */


import ENDPOINTS from "../../config/endpoints.js";
import { get, put, post, patch } from "../../core/request.js";
import { buildAuthorizationHeaders } from "../../core/headers.js";
import VolunteerBuilders from "../../builders/volunteer/volunteerBuilders.js";


/**
 * Retrieves the current volunteer status.
 *
 * Authentication:
 *     Required
 *
 * @param {GetVolunteerStatusRequest} data
 *
 * @returns {Promise<ApiResponse>}
 */
async function getVolunteerStatusApi(data) {

    return get({
        endpoint: ENDPOINTS.VOLUNTEER.STATUS,
        headers: buildAuthorizationHeaders({
            accessToken: data.access_token,
        }),
    });

}


/**
 * Submits a volunteer application.
 *
 * Authentication:
 *     Required
 *
 * @param {ApplyVolunteerRequest} data
 *
 * @returns {Promise<ApiResponse>}
 */
async function applyApi(data) {

    return post({
        endpoint: ENDPOINTS.VOLUNTEER.APPLY,
        headers: buildAuthorizationHeaders({
            accessToken: data.access_token,
        }),
        payload: VolunteerBuilders.buildVolunteerApplication(data),
    });

}


/**
 * Updates volunteer availability.
 *
 * Authentication:
 *     Required
 *
 * @param {UpdateAvailabilityRequest} data
 *
 * @returns {Promise<ApiResponse>}
 */
async function updateAvailabilitiesApi(data) {

    return put({
        endpoint: ENDPOINTS.VOLUNTEER.UPDATE_AVAILABILITY,
        headers: buildAuthorizationHeaders({
            accessToken: data.access_token,
        }),
        payload: VolunteerBuilders.buildAvailabilityUpdate(data),
    });

}


/**
 * Retrieves the authenticated volunteer profile.
 *
 * Authentication:
 *     Required
 *
 * @param {GetVolunteerProfileRequest} data
 *
 * @returns {Promise<ApiResponse>}
 */
async function getProfileApi(data) {

    return get({
        endpoint: ENDPOINTS.VOLUNTEER.PROFILE,
        headers: buildAuthorizationHeaders({
            accessToken: data.access_token,
        }),
    });

}


/**
 * Resigns as a volunteer.
 *
 * Authentication:
 *     Required
 *
 * @param {VolunteerResignationRequest} data
 *
 * @returns {Promise<ApiResponse>}
 */
async function resignApi(data) {

    return patch({
        endpoint: ENDPOINTS.VOLUNTEER.RESIGN,
        headers: buildAuthorizationHeaders({
            accessToken: data.access_token,
        }),
        payload: VolunteerBuilders.buildVolunteerResignation(data),
    });

}


/**
 * Requests volunteer reactivation.
 *
 * Authentication:
 *     Required
 *
 * @param {VolunteerReactivationRequest} data
 *
 * @returns {Promise<ApiResponse>}
 */
async function requestReactivationApi(data) {

    return post({
        endpoint: ENDPOINTS.VOLUNTEER.REACTIVATION_REQUEST,
        headers: buildAuthorizationHeaders({
            accessToken: data.access_token,
        }),
        payload: VolunteerBuilders.buildVolunteerReactivationRequest(data),
    });

}


export default {
    getVolunteerStatus: getVolunteerStatusApi,
    apply: applyApi,
    updateAvailabilities: updateAvailabilitiesApi,
    getProfile: getProfileApi,
    resign: resignApi,
    requestReactivation: requestReactivationApi,
};