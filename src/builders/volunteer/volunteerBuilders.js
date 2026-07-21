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
    validateAvailabilitySlots,
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
        "motivation",
        "occupation",
        "emergency_contact",
        "availabilities",
    ]);

    validateAvailabilitySlots(data.availabilities);

    return removeUndefinedFields({

        motivation: data.motivation,

        occupation: data.occupation,

        emergency_contact: data.emergency_contact,

        experience: data.experience,

        skills: data.skills,

        availabilities: data.availabilities,

    });

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
        "availabilities",
    ]);

    validateAvailabilitySlots(data.availabilities);

    return {

        availabilities: data.availabilities,

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