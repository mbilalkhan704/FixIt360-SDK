/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Profile Payload Builders
 *
 * Responsible for validating input and constructing payloads for
 * profile related endpoints.
 * ============================================================================
 */

import {
    validateRequiredFields,
} from "../../utils/validators.js";

import {
    removeUndefinedFields,
} from "../../utils/objectHelpers.js";

import {
    toRequestDate,
} from "../../utils/dateUtils.js";
import { InvalideRequestDataError } from "../../errors/RequestErrors.js";


function buildUpdateProfile(data) {

    const payload = removeUndefinedFields({
        first_name: data.first_name,

        last_name: data.last_name,

        gender: data.gender,

        date_of_birth:
            data.date_of_birth !== undefined
                ? toRequestDate(data.date_of_birth)
                : undefined,

        phone_number:
            data.phone_number,

        profile_picture_key:
            data.profile_picture_key,
    });

    if (Object.keys(payload).length === 0) {
        throw InvalidRequestDataError.atLeastOneRequired(
            "profile field",
        );
    }

    return payload;
}


export default {

    buildUpdateProfile,

};