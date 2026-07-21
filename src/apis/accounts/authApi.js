/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Accounts Authentication API
 *
 * Handles authentication related endpoints.
 * ============================================================================
 */


/**
 * @import {ApiResponse, AuthenticationData} from "../../types/typedefs.js"
 */


/**
 * @typedef {Object} RegisterRequest
 * @property {string} first_name
 *     Required. User's first name. Maximum 50 characters.
 * @property {string} last_name
 *     Required. User's last name. Maximum 50 characters.
 * @property {('male'|'female'|'other')} gender
 *     Required.
 * @property {string|Date} date_of_birth
 *     Required. Accepts a Date object or a string in YYYY-MM-DD format.
 * @property {string} email
 *     Required. Email address used for authentication.
 * @property {string} password
 *     Required.
 * @property {string} confirm_password
 *     Required. Must match password.
 * @property {string} [phone_number]
 *     Optional.
 */

/**
 * @typedef {Object} LoginRequest
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} GoogleLoginRequest
 * @property {string} id_token
 *     Google Identity Services ID Token.
 */

/**
 * @typedef {Object} RefreshTokenRequest
 * @property {string} refresh
 *     Refresh token previously issued by the SDK.
 */

/**
 * @typedef {Object} LogoutRequest
 * @property {string} access_token
 * @property {string} refresh
 */


import ENDPOINTS from "../../config/endpoints.js";

import {
    post,
} from "../../core/request.js";

import {
    buildAuthorizationHeaders,
} from "../../core/headers.js";

import AuthBuilders from "../../builders/accounts/authBuilders.js";


/**
 * Registers a new FixIt360 user account.
 *
 * Authentication:
 *     Not Required
 *
 * @param {RegisterRequest} data
 *
 * @returns {Promise<ApiResponse>}
 *
 * @example
 * await api.accounts.auth.register({...});
 */
async function registerApi(data) {

    return post({

        endpoint: ENDPOINTS.ACCOUNTS.REGISTER,

        payload: AuthBuilders.register(data),

    });

}


/**
 * @returns {Promise<ApiResponse & { data: AuthenticationData }>}
 */
async function loginApi(data) {

    return post({

        endpoint: ENDPOINTS.ACCOUNTS.LOGIN,

        payload: AuthBuilders.login(data),

    });

}


/**
 * @returns {Promise<ApiResponse & { data: AuthenticationData }>}
 */
async function googleLoginApi(data) {

    return post({

        endpoint: ENDPOINTS.ACCOUNTS.GOOGLE_LOGIN,

        payload: AuthBuilders.googleLogin(data),

    });

}


/**
 * @returns {Promise<ApiResponse & { data: AuthenticationData }>}
 */
async function refreshTokenApi(data) {

    return post({

        endpoint: ENDPOINTS.ACCOUNTS.REFRESH_TOKEN,

        payload: AuthBuilders.refreshToken(data),

    });

}


/**
 * @returns {Promise<ApiResponse>}
 */
async function logoutApi(data) {

    return post({

        endpoint: ENDPOINTS.ACCOUNTS.LOGOUT,

        headers: buildAuthorizationHeaders(
            data.access_token,
        ),

        payload: AuthBuilders.logout(data),

    });

}


export default {

    register: registerApi,

    login: loginApi,

    googleLogin: googleLoginApi,

    refreshToken: refreshTokenApi,

    logout: logoutApi,

};