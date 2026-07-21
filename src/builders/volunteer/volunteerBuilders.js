/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Volunteer Payload Builders
 *
 * Responsible for validating input and constructing payloads for
 * volunteer related operations.
 * ============================================================================
 */

import {
    validateRequiredFields,
} from "../../utils/validators.js";

import {
    removeUndefinedFields,
} from "../../utils/objectHelpers.js";


/**
 * Builds the payload for submitting a volunteer application.
 *
 * @param {Object} data
 *
 * @returns {Object}
 */
function buildVolunteerApplication(data) {

    validateRequiredFields(data, [
        "availability",
    ]);

    return {

        availability: data.availability,

    };

}


/**
 * Builds the payload for updating volunteer availability.
 *
 * @param {Object} data
 *
 * @returns {Object}
 */
function buildAvailabilityUpdate(data) {

    validateRequiredFields(data, [
        "availability",
    ]);

    return {

        availability: data.availability,

    };

}


/**
 * Builds the payload for resigning as a volunteer.
 *
 * @param {Object} data
 *
 * @returns {Object}
 */
function buildVolunteerResignation(data) {

    return removeUndefinedFields({

        reason: data.reason,

    });

}


/**
 * Builds the payload for requesting volunteer reactivation.
 *
 * @param {Object} data
 *
 * @returns {Object}
 */
function buildVolunteerReactivationRequest(data) {

    return removeUndefinedFields({

        reason: data.reason,

    });

}


export default {

    buildVolunteerApplication,

    buildAvailabilityUpdate,

    buildVolunteerResignation,

    buildVolunteerReactivationRequest,

};