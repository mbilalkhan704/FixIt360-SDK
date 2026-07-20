/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Password API
 * ============================================================================
 */

import ENDPOINTS from "../../config/endpoints.js";

import {
    post,
} from "../../core/request.js";

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
 * @param {Object} data
 * @param {string} data.email
 *
 * @returns {Promise<FixIt360Response>}
 *
 * @example
 * await api.accounts.password.forgotPassword({
 *     email: "bilal@example.com",
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
 * @param {Object} data
 * @param {string} data.email
 * @param {string} data.otp
 *
 * @returns {Promise<FixIt360Response>}
 *
 * @example
 * await api.accounts.password.verifyPasswordResetOTP({
 *     email: "bilal@example.com",
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
 * @param {Object} data
 * @param {string} data.password_reset_token
 * @param {string} data.password
 * @param {string} data.confirm_password
 *
 * @returns {Promise<FixIt360Response>}
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
 * @param {Object} data
 * @param {string} data.access_token
 * @param {string} data.password
 *
 * @returns {Promise<FixIt360Response>}
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
 * @param {Object} data
 * @param {string} data.access_token
 * @param {string} data.current_password
 * @param {string} data.new_password
 * @param {string} data.confirm_new_password
 *
 * @returns {Promise<FixIt360Response>}
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