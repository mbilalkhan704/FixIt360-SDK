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
 */

/**
 * @typedef {Object} ForgotPasswordRequest
 * @property {string} email
 */

/**
 * @typedef {Object} VerifyPasswordResetOTPRequest
 * @property {string} otp
 */

/**
 * @typedef {Object} PasswordResetTokenData
 * @property {string} password_reset_token
 */

/**
 * @typedef {Object} ResetPasswordRequest
 * @property {string} password_reset_token
 * @property {string} password
 * @property {string} confirm_password
 */

/**
 * @typedef {Object} ConfirmPasswordRequest
 * @property {string} access_token
 * @property {string} password
 */

/**
 * @typedef {Object} ChangePasswordRequest
 * @property {string} access_token
 * @property {string} current_password
 * @property {string} new_password
 * @property {string} confirm_new_password
 */


import ENDPOINTS from "../../config/endpoints.js";
import {
    post} from "../../core/request.js";

import {
    buildAuthorizationHeaders,
} from "../../core/headers.js";

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
 *
 * @example
 * await api.accounts.password.forgotPassword({
 *     email: "email@example.com",
 * });
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
 *
 * @example
 * await api.accounts.password.verifyPasswordResetOTP({
 *     email: "email@example.com",
 *     otp: "123456",
 * });
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
 *
 * @example
 * await api.accounts.password.resetPassword({
 *     password_reset_token,
 *     password: "NewPassword@123",
 *     confirm_password: "NewPassword@123",
 * });
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
 *
 * @example
 * await api.accounts.password.confirmPassword({
 *     access_token,
 *     password: "Password@123",
 * });
 */
async function confirmPasswordApi(data) {

    return post({

        endpoint: ENDPOINTS.ACCOUNTS.CONFIRM_PASSWORD,

        headers: buildAuthorizationHeaders(
            data.access_token,
        ),

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
 *
 * @example
 * await api.accounts.password.changePassword({
 *     access_token,
 *     current_password: "OldPassword@123",
 *     new_password: "NewPassword@123",
 *     confirm_new_password: "NewPassword@123",
 * });
 */
async function changePasswordApi(data) {

    return post({

        endpoint: ENDPOINTS.ACCOUNTS.CHANGE_PASSWORD,

        headers: buildAuthorizationHeaders(
            data.access_token,
        ),

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