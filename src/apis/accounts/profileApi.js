/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Profile API
 *
 * Handles authenticated user profile operations.
 * ============================================================================
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
 * @param {Object} data
 * @param {string} data.access_token
 *
 * @returns {Promise<FixIt360Response>}
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
 * Authentication:
 *     Required
 *
 * @param {Object} data
 * @param {string} data.access_token
 * @param {File|Blob} [data.profile_picture]
 * @param {Function} [data.onProgress]
 *
 * @returns {Promise<FixIt360Response>}
 *
 * @example
 * await api.accounts.profile.updateProfile({
 *     access_token,
 *     first_name: "Muhammad",
 *     last_name: "Bilal",
 *     profile_picture: file,
 * });
 */
async function updateProfileApi(data) {

    let profile_picture_key;

    if (data.profile_picture) {

        const uploadResponse =
            await StorageApi.uploadProfilePicture({

                access_token: data.access_token,

                file: data.profile_picture,

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