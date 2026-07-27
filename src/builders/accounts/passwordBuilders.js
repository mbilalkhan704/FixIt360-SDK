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


import { validateRequiredFields } from "../../utils/validators.js";


function buildForgotPasswordPayload(data) {

    validateRequiredFields(data, [
        "email",
    ]);

    return {
        email: data.email,
    };
}


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


function buildResetPasswordPayload(data) {

    validateRequiredFields(data, [
        "verification_token",
        "new_password",
        "confirm_new_password",
    ]);

    return {
        verification_token: data.verification_token,
        new_password: data.new_password,
        confirm_new_password: data.confirm_new_password,
    };
}


function buildConfirmPasswordPayload(data) {

    validateRequiredFields(data, [
        "password",
    ]);

    return {
        password: data.password,
    };
}


function buildChangePasswordPayload(data) {

    validateRequiredFields(data, [
        "verification_token",
        "new_password",
        "confirm_new_password",
    ]);

    return {
        verification_token: data.verification_token,
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