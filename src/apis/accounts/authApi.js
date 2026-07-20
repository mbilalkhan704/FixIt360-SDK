/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Accounts Authentication API
 *
 * Handles authentication related endpoints.
 * ============================================================================
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
 * @param {Object} data
 * @param {string} data.first_name
 * @param {string} data.last_name
 * @param {string} data.gender
 * @param {Date|string} data.date_of_birth
 * @param {string} data.email
 * @param {string} data.password
 * @param {string} data.confirm_password
 * @param {string} [data.phone_number]
 *
 * @returns {Promise<FixIt360Response>}
 *
 * @example
 * await api.accounts.auth.register({
 *     first_name: "Muhammad",
 *     last_name: "Bilal",
 *     gender: "male",
 *     date_of_birth: "2004-07-16",
 *     email: "bilal@example.com",
 *     phone_number: "03001234567",
 *     password: "Password@123",
 *     confirm_password: "Password@123",
 * });
 */
async function registerApi(data) {

    return post({

        endpoint: ENDPOINTS.ACCOUNTS.REGISTER,

        payload: AuthBuilders.register(data),

    });

}


/**
 * Authenticates a FixIt360 user.
 *
 * Authentication:
 *     Not Required
 *
 * @param {Object} data
 * @param {string} data.email
 * @param {string} data.password
 *
 * @returns {Promise<FixIt360Response>}
 *
 * @example
 * await api.accounts.auth.login({
 *     email: "bilal@example.com",
 *     password: "Password@123",
 * });
 */
async function loginApi(data) {

    return post({

        endpoint: ENDPOINTS.ACCOUNTS.LOGIN,

        payload: AuthBuilders.login(data),

    });

}


/**
 * Authenticates a user using Google Sign-In.
 *
 * Authentication:
 *     Not Required
 *
 * @param {Object} data
 * @param {string} data.id_token
 *
 * @returns {Promise<FixIt360Response>}
 *
 * @example
 * await api.accounts.auth.googleLogin({
 *     id_token: googleCredential,
 * });
 */
async function googleLoginApi(data) {

    return post({

        endpoint: ENDPOINTS.ACCOUNTS.GOOGLE_LOGIN,

        payload: AuthBuilders.googleLogin(data),

    });

}


/**
 * Generates a new access token using a refresh token.
 *
 * Authentication:
 *     Not Required
 *
 * @param {Object} data
 * @param {string} data.refresh
 *
 * @returns {Promise<FixIt360Response>}
 *
 * @example
 * await api.accounts.auth.refreshToken({
 *     refresh: refreshToken,
 * });
 */
async function refreshTokenApi(data) {

    return post({

        endpoint: ENDPOINTS.ACCOUNTS.REFRESH_TOKEN,

        payload: AuthBuilders.refreshToken(data),

    });

}


/**
 * Logs the authenticated user out by blacklisting the refresh token.
 *
 * Authentication:
 *     Required
 *
 * @param {Object} data
 * @param {string} data.access_token
 * @param {string} data.refresh
 *
 * @returns {Promise<FixIt360Response>}
 *
 * @example
 * await api.accounts.auth.logout({
 *     access_token,
 *     refresh,
 * });
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