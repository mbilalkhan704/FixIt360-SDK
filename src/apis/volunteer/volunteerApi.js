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
 */
/**
 * @typedef {Object} AvailabilitySlot
 * @property {(
 *   'monday'|
 *   'tuesday'|
 *   'wednesday'|
 *   'thursday'|
 *   'friday'|
 *   'saturday'|
 *   'sunday'
 * )} day
 * @property {string} start_time
 * @property {string} end_time
 */

/**
 * @typedef {Object} GetVolunteerStatusRequest
 * @property {string} access_token
 */

/**
 * @typedef {Object} ApplyVolunteerRequest
 * @property {string} access_token
 * @property {string} motivation
 * @property {string} occupation
 * @property {string} emergency_contact
 * @property {string} [experience]
 * @property {string} [skills]
 * @property {AvailabilitySlot[]} availabilities
 */

/**
 * @typedef {Object} GetVolunteerProfileRequest
 * @property {string} access_token
 */

/**
 * @typedef {Object} UpdateAvailabilityRequest
 * @property {string} access_token
 * @property {AvailabilitySlot[]} availabilities
 */

/**
 * @typedef {Object} VolunteerResignationRequest
 * @property {string} access_token
 * @property {string} [reason]
 */

/**
 * @typedef {Object} VolunteerReactivationRequest
 * @property {string} access_token
 * @property {string} [reason]
 */
import ENDPOINTS from "../../config/endpoints.js";

import {
    get,
    put,
    post,
    patch,
} from "../../core/request.js";

import {
    buildAuthorizationHeaders,
} from "../../core/headers.js";

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

        headers: buildAuthorizationHeaders(
            data.access_token,
        ),

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

        headers: buildAuthorizationHeaders(
            data.access_token,
        ),

        payload:
            VolunteerBuilders.buildVolunteerApplication(
                data,
            ),

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

        headers: buildAuthorizationHeaders(
            data.access_token,
        ),

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

        endpoint:
            ENDPOINTS.VOLUNTEER.UPDATE_AVAILABILITY,

        headers: buildAuthorizationHeaders(
            data.access_token,
        ),

        payload:
            VolunteerBuilders.buildAvailabilityUpdate(
                data,
            ),

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

    return post({

        endpoint:
            ENDPOINTS.VOLUNTEER.RESIGN,

        headers: buildAuthorizationHeaders(
            data.access_token,
        ),

        payload:
            VolunteerBuilders.buildVolunteerResignation(
                data,
            ),

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

        endpoint:
            ENDPOINTS.VOLUNTEER.REACTIVATION_REQUEST,

        headers: buildAuthorizationHeaders(
            data.access_token,
        ),

        payload:
            VolunteerBuilders
                .buildVolunteerReactivationRequest(
                    data,
                ),

    });

}


export default {

    getVolunteerStatus: getVolunteerStatusApi,

    apply: applyApi,

    getProfile: getProfileApi,

    updateAvailabilities: updateAvailabilitiesApi,

    resign: resignApi,

    requestReactivation:
        requestReactivationApi,

};