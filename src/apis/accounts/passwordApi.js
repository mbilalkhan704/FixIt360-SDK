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
 * @import {ApiResponse} from "../../types/typedefs.js"
 * @import {
 *      ForgotPasswordRequest,
 *      VerifyPasswordResetOTPRequest,
 *      PasswordResetTokenData,
 *      ResetPasswordRequest,
 *      ConfirmPasswordRequest,
 *      ChangePasswordRequest,
 * } from "../../types/typedefs.js"
 */


import ENDPOINTS from "../../config/endpoints.js";
import { post } from "../../core/request.js";
import { buildAuthorizationHeaders } from "../../core/headers.js";
import PasswordBuilders from "../../builders/accounts/passwordBuilders.js";


/**
 * Sends a password reset OTP to the user's email address.
 *
 * Authentication:
 *     Not Required
 *
 * @param {ForgotPasswordRequest} data
 *
 * @returns {Promise<ApiResponse>}
 */
async function forgotPasswordApi(data) {

    return post({
        endpoint: ENDPOINTS.ACCOUNTS.FORGOT_PASSWORD,
        payload: PasswordBuilders.forgotPassword(data),
    });

}


/**
 * Verifies the password reset OTP.
 *
 * Authentication:
 *     Not Required
 *
 * @param {VerifyPasswordResetOTPRequest} data
 *
 * @returns {Promise<ApiResponse & { data: PasswordResetTokenData }>}
 */
async function verifyPasswordResetOTPApi(data) {

    return post({
        endpoint: ENDPOINTS.ACCOUNTS.VERIFY_PASSWORD_RESET_OTP,
        payload: PasswordBuilders.verifyPasswordResetOTP(data),
    });

}


/**
 * Resets the user's password using a verified password reset token.
 *
 * Authentication:
 *     Not Required
 *
 * @param {ResetPasswordRequest} data
 *
 * @returns {Promise<ApiResponse>}
 */
async function resetPasswordApi(data) {

    return post({
        endpoint: ENDPOINTS.ACCOUNTS.RESET_PASSWORD,
        payload: PasswordBuilders.resetPassword(data),
    });

}


/**
 * Confirms the authenticated user's password before performing
 * sensitive account operations.
 *
 * Authentication:
 *     Required
 *
 * @param {ConfirmPasswordRequest} data
 *
 * @returns {Promise<ApiResponse>}
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
 * Changes the authenticated user's password.
 *
 * Authentication:
 *     Required
 *
 * @param {ChangePasswordRequest} data
 *
 * @returns {Promise<ApiResponse>}
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