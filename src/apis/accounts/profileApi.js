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
 * @import {
 *      GetProfileRequest,
 *      UpdateProfileRequest,
 *      ProfileData
 * } from "../../types/typedefs.js"
 */


import ENDPOINTS from "../../config/endpoints.js";
import { get, patch } from "../../core/request.js";
import { buildAuthorizationHeaders } from "../../core/headers.js";
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
 * Updates the authenticated user's profile.
 * If profile_picture is provided, the SDK handles the upload.
 *
 * Authentication:
 *     Required
 *
 * @param {UpdateProfileRequest} data
 *
 * @returns {Promise<ApiResponse & { data: ProfileData }>}
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