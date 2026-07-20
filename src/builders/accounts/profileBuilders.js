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


function buildUpdateProfile(data) {

    validateRequiredFields(data, [

        "first_name",

        "last_name",

        "gender",

        "date_of_birth",

    ]);

    return removeUndefinedFields({

        first_name: data.first_name,

        last_name: data.last_name,

        gender: data.gender,

        date_of_birth:
            toRequestDate(data.date_of_birth),

        phone_number:
            data.phone_number,

        profile_picture_key:
            data.profile_picture_key,

    });

}


export default {

    buildUpdateProfile,

};