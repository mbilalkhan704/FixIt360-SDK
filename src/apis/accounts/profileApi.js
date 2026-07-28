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
 * @typedef {import('../../typedefs/common.js').ApiResponse} ApiResponse
 * @typedef {import('../../typedefs/accounts/profile.js').GetProfileParams} GetProfileParams
 * @typedef {import('../../typedefs/accounts/profile.js').UserProfile} UserProfile
 * @typedef {import('../../typedefs/accounts/profile.js').UpdateProfileParams} UpdateProfileParams
 */


import ENDPOINTS from "../../config/endpoints.js";
import { get, patch } from "../../core/request.js";
import { buildAuthorizationHeaders } from "../../core/headers.js";
import StorageApi from "../storage/storageApi.js";
import ProfileBuilders from "../../builders/accounts/profileBuilders.js";


/**
 * Retrieve the authenticated user's profile.
 * @param {GetProfileParams} params
 * @returns {Promise<ApiResponse<UserProfile>>}
 */
async function getProfileApi(data) {

    return get({
        endpoint: ENDPOINTS.ACCOUNTS.PROFILE,
        headers: buildAuthorizationHeaders({
            accessToken: data.access_token,
        }),
    });

}


/**
 * Update one or more fields of the authenticated user's profile.
 * Only the fields provided are changed.
 * @param {UpdateProfileParams} params
 * @returns {Promise<ApiResponse<UserProfile>>}
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
        headers: buildAuthorizationHeaders({
            accessToken: data.access_token,
        }),
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