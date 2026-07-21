/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Password Payload Builders
 *
 * Responsible for validating input and constructing payloads for
 * password related endpoints.
 * ============================================================================
 */

import {
    validateRequiredFields,
} from "../../utils/validators.js";


/**
 * Builds the Forgot Password payload.
 */
function buildForgotPasswordPayload(data) {

    validateRequiredFields(data, [
        "email",
    ]);

    return {
        email: data.email,
    };
}


/**
 * Builds the Verify Password Reset OTP payload.
 */
function buildVerifyPasswordResetOTPPayload(data) {

    validateRequiredFields(data, [
        "email",
        "otp",
    ]);

    return {
        email: data.email,
        otp: data.otp,
    };
}


/**
 * Builds the Reset Password payload.
 */
function buildResetPasswordPayload(data) {

    validateRequiredFields(data, [
        "password_reset_token",
        "password",
        "confirm_password",
    ]);

    return {
        password_reset_token: data.password_reset_token,
        password: data.password,
        confirm_password: data.confirm_password,
    };
}


/**
 * Builds the Confirm Password payload.
 */
function buildConfirmPasswordPayload(data) {

    validateRequiredFields(data, [
        "password",
    ]);

    return {
        password: data.password,
    };
}


/**
 * Builds the Change Password payload.
 */
function buildChangePasswordPayload(data) {

    validateRequiredFields(data, [
        "current_password",
        "new_password",
        "confirm_new_password",
    ]);

    return {
        current_password: data.current_password,
        new_password: data.new_password,
        confirm_new_password: data.confirm_new_password,
    };
}

export default {

    forgotPassword: buildForgotPasswordPayload,

    verifyPasswordResetOTP: buildVerifyPasswordResetOTPPayload,

    resetPassword: buildResetPasswordPayload,

    confirmPassword: buildConfirmPasswordPayload,

    changePassword: buildChangePasswordPayload,

};