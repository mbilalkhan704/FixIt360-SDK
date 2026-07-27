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
 * @import {
 *      ApiResponse,
*       AuthenticationData
* } from "../../types/typedefs.js"
 * @import {
 *      RegisterRequest,
 *      LoginRequest,
 *      GoogleLoginRequest,
 *      RefreshTokenRequest,
 *      LogoutRequest,
 *      VerifyEmailRequest,
 *      ResendEmailOTPRequest
 * } from "../../types/typedefs.js"
 */


import ENDPOINTS from "../../config/endpoints.js";
import { post } from "../../core/request.js";
import { buildAuthorizationHeaders } from "../../core/headers.js";
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
 */
async function registerApi(data) {

    return post({
        endpoint: ENDPOINTS.ACCOUNTS.REGISTER,
        payload: AuthBuilders.register(data),
    });

}


/**
 * Logs in a FixIt360 user account.
 *
 * Authentication:
 *     Not Required
 * 
 * @param {LoginRequest} data
 * 
 * @returns {Promise<ApiResponse & { data: AuthenticationData }>}
 */
async function loginApi(data) {

    return post({
        endpoint: ENDPOINTS.ACCOUNTS.LOGIN,
        payload: AuthBuilders.login(data),
    });

}


/**
 * Logs in a FixIt360 user account through Google OAuth.
 *
 * Authentication:
 *     Not Required
 * 
 * @param {GoogleLoginRequest} data 
 * 
 * @returns {Promise<ApiResponse & { data: AuthenticationData }>}
 */
async function googleLoginApi(data) {

    return post({
        endpoint: ENDPOINTS.ACCOUNTS.GOOGLE_LOGIN,
        payload: AuthBuilders.googleLogin(data),
    })

}


/**
 * Returns a new refresh and a new access token.
 *
 * Authentication:
 *     Required
 * 
 * @param {RefreshTokenRequest} data
 * 
 * @returns {Promise<ApiResponse & { data: AuthenticationData }>}
 */
async function refreshTokenApi(data) {

    return post({
        endpoint: ENDPOINTS.ACCOUNTS.REFRESH_TOKEN,
        payload: AuthBuilders.refreshToken(data),
    });

}


/**
 * Logs out a FixIt360 user account.
 *
 * Authentication:
 *     Required
 * 
 * @param {LogoutRequest} data
 *  
 * @returns {Promise<ApiResponse>}
 */
async function logoutApi(data) {

    return post({
        endpoint: ENDPOINTS.ACCOUNTS.LOGOUT,
        headers: buildAuthorizationHeaders({
            accessToken: data.access_token,
        }),
        payload: AuthBuilders.logout(data),
    });

}


/**
 * Verifies a FixIt360 user email.
 *
 * Authentication:
 *     Required
 * 
 * @param {VerifyEmailRequest} data
 *  
 * @returns {Promise<ApiResponse>}
 */
async function verifyEmailApi(data) {

    return post({
        endpoint: ENDPOINTS.ACCOUNTS.VERIFY_EMAIL,
        headers: buildAuthorizationHeaders({
            accessToken: data.access_token,
        }),
        payload: AuthBuilders.verifyEmail(data),
    });

}


/**
 * Resends a FixIt360 user email verification OTP.
 *
 * Authentication:
 *     Required
 * 
 * @param {ResendEmailOTPRequest} data
 *  
 * @returns {Promise<ApiResponse>}
 */
async function resendEmailOTPApi(data) {

    return post({
        endpoint: ENDPOINTS.ACCOUNTS.RESEND_EMAIL_OTP,
        headers: buildAuthorizationHeaders({
            accessToken: data.access_token,
        }),
    });

}


export default {
    register: registerApi,
    login: loginApi,
    googleLogin: googleLoginApi,
    refreshToken: refreshTokenApi,
    logout: logoutApi,
    verifyEmail: verifyEmailApi,
    resendEmailOTP: resendEmailOTPApi,
};