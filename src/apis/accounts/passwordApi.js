/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Password API
 * 
 * Handles password related endpoints.
 * ============================================================================
 */


/**
 * @typedef {import('../../typedefs/common.js').ApiResponse} ApiResponse
 * @typedef {import('../../typedefs/accounts/password.js').ChangePasswordParams} ChangePasswordParams
 * @typedef {import('../../typedefs/accounts/password.js').ChangePasswordData} ChangePasswordData
 * @typedef {import('../../typedefs/accounts/password.js').ConfirmPasswordParams} ConfirmPasswordParams
 * @typedef {import('../../typedefs/accounts/password.js').ConfirmPasswordData} ConfirmPasswordData
 * @typedef {import('../../typedefs/accounts/password.js').ForgotPasswordParams} ForgotPasswordParams
 * @typedef {import('../../typedefs/accounts/password.js').VerifyPasswordResetOTPParams} VerifyPasswordResetOTPParams
 * @typedef {import('../../typedefs/accounts/password.js').VerifyPasswordResetOTPData} VerifyPasswordResetOTPData
 * @typedef {import('../../typedefs/accounts/password.js').ResetPasswordParams} ResetPasswordParams
 * @typedef {import('../../typedefs/accounts/password.js').ResetPasswordFieldErrors} ResetPasswordFieldErrors
 */


import ENDPOINTS from "../../config/endpoints.js";
import { post } from "../../core/request.js";
import { buildAuthorizationHeaders } from "../../core/headers.js";
import PasswordBuilders from "../../builders/accounts/passwordBuilders.js";


/**
 * Request a password reset OTP via email. Response is intentionally
 * non-revealing about whether the account exists.
 * @param {ForgotPasswordParams} params
 * @returns {Promise<ApiResponse<null>>}
 */
async function forgotPasswordApi(data) {

    return post({
        endpoint: ENDPOINTS.ACCOUNTS.FORGOT_PASSWORD,
        payload: PasswordBuilders.forgotPassword(data),
    });

}


/**
 * Verify the OTP sent by forgotPassword.
 * @param {VerifyPasswordResetOTPParams} params
 * @returns {Promise<ApiResponse<VerifyPasswordResetOTPData>>}
 */
async function verifyPasswordResetOTPApi(data) {

    return post({
        endpoint: ENDPOINTS.ACCOUNTS.VERIFY_PASSWORD_RESET_OTP,
        payload: PasswordBuilders.verifyPasswordResetOTP(data),
    });

}


/**
 * Reset a user's password using a verified reset token.
 * @param {ResetPasswordParams} params
 * @returns {Promise<ApiResponse<null>|ApiResponse<ResetPasswordFieldErrors>>}
 */
async function resetPasswordApi(data) {

    return post({
        endpoint: ENDPOINTS.ACCOUNTS.RESET_PASSWORD,
        payload: PasswordBuilders.resetPassword(data),
    });

}


/**
 * Re-confirm the authenticated user's current password before a sensitive action.
 * @param {ConfirmPasswordParams} params
 * @returns {Promise<ApiResponse<ConfirmPasswordData>>}
 */
async function confirmPasswordApi(data) {

    return post({
        endpoint: ENDPOINTS.ACCOUNTS.CONFIRM_PASSWORD,
        headers: buildAuthorizationHeaders({
            accessToken: data.access_token,
        }),
        payload: PasswordBuilders.confirmPassword(data),
    });

}


/**
 * Change the authenticated user's password.
 * @param {ChangePasswordParams} params
 * @returns {Promise<ApiResponse<ChangePasswordData>>}
 */
async function changePasswordApi(data) {

    return post({
        endpoint: ENDPOINTS.ACCOUNTS.CHANGE_PASSWORD,
        headers: buildAuthorizationHeaders({
            accessToken: data.access_token,
        }),
        payload: PasswordBuilders.changePassword(data),
    });

}


export default {
    forgotPassword: forgotPasswordApi,
    verifyPasswordResetOTP: verifyPasswordResetOTPApi,
    resetPassword: resetPasswordApi,
    confirmPassword: confirmPasswordApi,
    changePassword: changePasswordApi,
};