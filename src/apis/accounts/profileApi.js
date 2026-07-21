/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Profile API
 *
 * Handles authenticated user profile operations.
 * ============================================================================
 */


/**
 * @import {ApiResponse} from "../../types/typedefs.js"
 */

/**
 * @typedef {Object} GetProfileRequest
 * @property {string} access_token
 */

/**
 * @typedef {Object} UpdateProfileRequest
 * @property {string} access_token
 * @property {string} [first_name]
 * @property {string} [last_name]
 * @property {('male'|'female'|'other')} [gender]
 * @property {string|Date} [date_of_birth]
 * @property {string} [phone_number]
 * @property {File|Blob} [file]
 * @property {function(number): void} [onProgress]
 */

/**
 * @typedef {Object} ProfileData
 * @property {number} id
 * @property {string} email
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} date_of_birth
 * @property {('male'|'female'|'other')} gender
 * @property {?string} phone_number
 * @property {?string} profile_picture_url
 * @property {string} role
 * @property {boolean} email_verified
 */


import ENDPOINTS from "../../config/endpoints.js";

import {
    get,
    patch,
} from "../../core/request.js";

import {
    buildAuthorizationHeaders,
} from "../../core/headers.js";

import StorageApi from "../storage/storageApi.js";

import ProfileBuilders from "../../builders/accounts/profileBuilders.js";


/**
 * Retrieves the authenticated user's profile.
 *
 * Authentication:
 *     Required
 *
 * @param {GetProfileRequest} data
 *
 * @returns {Promise<ApiResponse & { data: ProfileData }>}
 *
 * @example
 * await api.accounts.profile.getProfile({
 *     access_token,
 * });
 */
async function getProfileApi(data) {

    return get({

        endpoint: ENDPOINTS.ACCOUNTS.PROFILE,

        headers: buildAuthorizationHeaders(
            data.access_token,
        ),

    });

}


/**
 * Updates the authenticated user's profile.
 *
 * If profile_picture is provided, the SDK uploads it to Cloudinary
 * automatically and sends the resulting profile_picture_key to the backend.
 *
 * ...
 *
 * @param {UpdateProfileRequest} data
 *
 * @returns {Promise<ApiResponse & { data: ProfileData }>}
 *
 * @example
 * const file = fileInput.files[0];
 *
 * await api.accounts.profile.updateProfile({
 *     access_token,
 *     first_name: "Muhammad",
 *     last_name: "Bilal",
 *     file,
 * });
 */
async function updateProfileApi(data) {

    let profile_picture_key;

    if (data.file) {

        const uploadResponse =
            await StorageApi.uploadProfilePicture({

                access_token: data.access_token,

                file: data.file,

                onProgress: data.onProgress,

            });

        profile_picture_key =
            uploadResponse.data.profile_picture_key;

    }

    return patch({

        endpoint: ENDPOINTS.ACCOUNTS.PROFILE,

        headers: buildAuthorizationHeaders(
            data.access_token,
        ),

        payload: ProfileBuilders.buildUpdateProfile({

            ...data,

            profile_picture_key,

        }),

    });

}


export default {

    getProfile: getProfileApi,

    updateProfile: updateProfileApi,

};