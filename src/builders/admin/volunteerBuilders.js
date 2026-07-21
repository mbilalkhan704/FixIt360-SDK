/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Admin Volunteer Payload Builders
 *
 * Responsible for validating input and constructing payloads for
 * volunteer administration operations.
 * ============================================================================
 */

import {
    validateRequiredFields,
} from "../../utils/validators.js";


/**
 * Builds the payload for reviewing a volunteer application.
 *
 * @param {Object} data
 *
 * @returns {Object}
 */
function buildApplicationReview(data) {

    validateRequiredFields(data, [
        "status",
    ]);

    return {

        status: data.status,

    };

}


/**
 * Builds the payload for deactivating a volunteer.
 *
 * @param {Object} data
 *
 * @returns {Object}
 */
function buildVolunteerDeactivation(data) {

    validateRequiredFields(data, [
        "reason",
    ]);

    return {

        reason: data.reason,

    };

}


/**
 * Builds the payload for reviewing a volunteer reactivation request.
 *
 * @param {Object} data
 *
 * @returns {Object}
 */
function buildReactivationReview(data) {

    validateRequiredFields(data, [
        "status",
    ]);

    return {

        status: data.status,

    };

}


export default {

    buildApplicationReview,

    buildVolunteerDeactivation,

    buildReactivationReview,

};