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


import { validateRequiredFields } from "../../utils/validators.js";


function buildApplicationReview(data) {

    let payload = {
        status: data.status
    }

    if (data.status === "rejected") {
        validateRequiredFields(data, [
            "reason"
        ])
        payload.review_reason = data.reason
    }

    return payload;

}


function buildVolunteerDeactivation(data) {

    return {
        reason: data.reason,
    };

}


function buildReactivationReview(data) {

    return {
        status: data.status,
    };

}


export default {
    buildApplicationReview,
    buildVolunteerDeactivation,
    buildReactivationReview,
};