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
 * @typedef {import('../../typedefs/common.js').ApiResponse} ApiResponse
 * @typedef {import('../../typedefs/accounts/auth.js').LoginParams} LoginParams
 * @typedef {import('../../typedefs/accounts/auth.js').LoginData} LoginData
 * @typedef {import('../../typedefs/accounts/auth.js').LogoutParams} LogoutParams
 * @typedef {import('../../typedefs/accounts/auth.js').RefreshTokenParams} RefreshTokenParams
 * @typedef {import('../../typedefs/accounts/auth.js').RefreshTokenData} RefreshTokenData
 * @typedef {import('../../typedefs/accounts/auth.js').RegisterParams} RegisterParams
 * @typedef {import('../../typedefs/accounts/auth.js').RegisterData} RegisterData
 * @typedef {import('../../typedefs/accounts/auth.js').ResendEmailOTPParams} ResendEmailOTPParams
 * @typedef {import('../../typedefs/accounts/auth.js').VerifyEmailParams} VerifyEmailParams
 */


import ENDPOINTS from "../../config/endpoints.js";
import { post } from "../../core/request.js";
import { buildAuthorizationHeaders } from "../../core/headers.js";
import AuthBuilders from "../../builders/accounts/authBuilders.js";


/**
 * Create a new account. Sends an email verification OTP on success.
 * @param {RegisterParams} params
 * @returns {Promise<ApiResponse<RegisterData>>}
 */
async function registerApi(data) {

    return post({
        endpoint: ENDPOINTS.ACCOUNTS.REGISTER,
        payload: AuthBuilders.register(data),
    });

}


/**
 * Authenticate a user with email and password.
 * @param {LoginParams} params
 * @returns {Promise<ApiResponse<LoginData>>}
 */
async function loginApi(data) {

    return post({
        endpoint: ENDPOINTS.ACCOUNTS.LOGIN,
        payload: AuthBuilders.login(data),
    });

}


/**
 * Logs in a FixIt360 user account through Google OAuth. Business
 * failures (invalid credential, no matching account) come back as
 * `{success: false, data: null}` rather than throwing.
 * @param {GoogleLoginParams} data
 * @returns {Promise<ApiResponse<GoogleLoginData|null>>}
 */
async function googleLoginApi(data) {

    return post({
        endpoint: ENDPOINTS.ACCOUNTS.GOOGLE_LOGIN,
        payload: AuthBuilders.googleLogin(data),
    })

}


/**
 * Exchange a valid refresh token for a new access token.
 * @param {RefreshTokenParams} params
 * @returns {Promise<ApiResponse<RefreshTokenData>>}
 */
async function refreshTokenApi(data) {

    return post({
        endpoint: ENDPOINTS.ACCOUNTS.REFRESH_TOKEN,
        payload: AuthBuilders.refreshToken(data),
    });

}


/**
 * Invalidate the current session's tokens.
 * @param {LogoutParams} params
 * @returns {Promise<ApiResponse<null>>}
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
 * Verify a user's email address using the OTP sent by register/resendEmailOTP.
 * @param {VerifyEmailParams} params
 * @returns {Promise<ApiResponse<null>>}
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
 * Resend the email verification OTP to the authenticated (unverified) user.
 * @param {ResendEmailOTPParams} params
 * @returns {Promise<ApiResponse<null>>}
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