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
 * @typedef {import('../../typedefs/common.js').ApiResponse} ApiResponse
 * @typedef {import('../../typedefs/common.js').ValidationErrors} ValidationErrors
 * @typedef {import('../../typedefs/volunteer/volunteer.js').VolunteerApplyParams} VolunteerApplyParams
 * @typedef {import('../../typedefs/volunteer/volunteer.js').GetVolunteerProfileParams} GetVolunteerProfileParams
 * @typedef {import('../../typedefs/volunteer/volunteer.js').VolunteerProfile} VolunteerProfile
 * @typedef {import('../../typedefs/volunteer/volunteer.js').GetVolunteerStatusParams} GetVolunteerStatusParams
 * @typedef {import('../../typedefs/volunteer/volunteer.js').VolunteerStatusData} VolunteerStatusData
 * @typedef {import('../../typedefs/volunteer/volunteer.js').UpdateAvailabilitiesParams} UpdateAvailabilitiesParams
 * @typedef {import('../../typedefs/volunteer/volunteer.js').VolunteerResignParams} VolunteerResignParams
 * @typedef {import('../../typedefs/volunteer/volunteer.js').RequestReactivationParams} RequestReactivationParams
 */


import ENDPOINTS from "../../config/endpoints.js";
import { get, put, post, patch } from "../../core/request.js";
import { buildAuthorizationHeaders } from "../../core/headers.js";
import VolunteerBuilders from "../../builders/volunteer/volunteerBuilders.js";


/**
 * Retrieve the authenticated user's current volunteer status
 * (never registered / applied and pending / active / inactive).
 * @param {GetVolunteerStatusParams} params
 * @returns {Promise<ApiResponse<VolunteerStatusData>>}
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
 * Submit a volunteer application for the authenticated user.
 * @param {VolunteerApplyParams} params
 * @returns {Promise<ApiResponse<null>|ApiResponse<ValidationErrors>>}
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
 * Replace the authenticated volunteer's availability slots.
 * @param {UpdateAvailabilitiesParams} params
 * @returns {Promise<ApiResponse<null>|ApiResponse<ValidationErrors>>}
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
 * Retrieve the authenticated user's volunteer profile. Fails if the user
 * is not registered as a volunteer.
 * @param {GetVolunteerProfileParams} params
 * @returns {Promise<ApiResponse<VolunteerProfile|null>>}
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
 * Voluntarily resign from the volunteer program.
 * @param {VolunteerResignParams} params
 * @returns {Promise<ApiResponse<null>>}
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
 * Request reactivation of a resigned/deactivated volunteer account.
 * Subject to review and (for admin-deactivated accounts) a cooldown period.
 * @param {RequestReactivationParams} params
 * @returns {Promise<ApiResponse<null>>}
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