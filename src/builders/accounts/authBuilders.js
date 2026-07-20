/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Authentication Payload Builders
 *
 * Responsible for validating input and constructing payloads for
 * authentication related endpoints.
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


/**
 * Builds the register payload.
 */
function buildRegisterPayload(data) {

    validateRequiredFields(data, [

        "first_name",

        "last_name",

        "gender",

        "date_of_birth",

        "email",

        "password",

        "confirm_password",

    ]);

    return removeUndefinedFields({

        first_name: data.first_name,

        last_name: data.last_name,

        gender: data.gender,

        date_of_birth:
            toRequestDate(
                data.date_of_birth,
            ),

        phone_number:
            data.phone_number,

        email:
            data.email,

        password:
            data.password,

        confirm_password:
            data.confirm_password,

    });

}


/**
 * Builds the login payload.
 */
function buildLoginPayload(data) {

    validateRequiredFields(data, [

        "email",

        "password",

    ]);

    return {

        email: data.email,

        password: data.password,

    };

}


/**
 * Builds the Google Login payload.
 */
function buildGoogleLoginPayload(data) {

    validateRequiredFields(data, [

        "id_token",

    ]);

    return {

        id_token:
            data.id_token,

    };

}


/**
 * Builds the refresh token payload.
 */
function buildRefreshTokenPayload(data) {

    validateRequiredFields(data, [

        "refresh",

    ]);

    return {

        refresh:
            data.refresh,

    };

}


/**
 * Builds the logout payload.
 */
function buildLogoutPayload(data) {

    validateRequiredFields(data, [

        "refresh",

    ]);

    return {

        refresh:
            data.refresh,

    };

}

export default {

    register,

    login,

    googleLogin,

    refreshToken,

    logout,

};