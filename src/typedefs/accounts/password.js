/**
 * @file Type definitions and JSDoc for `sdk.accounts.password.*`.
 */

/**
 * @typedef {import('../common.js').ApiResponse} ApiResponse
 */

// ---------------------------------------------------------------------------
// changePassword
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} ChangePasswordParams
 * @property {string} access_token
 * @property {string} verification_token - Token proving prior identity confirmation
 *   (e.g. from {@link ConfirmPasswordData}).
 * @property {string} new_password
 * @property {string} confirm_new_password
 */

/**
 * @typedef {Object} ChangePasswordData
 * @property {string} verification_token - Fresh verification token issued after the change.
 */

/**
 * Change the authenticated user's password.
 * @function
 * @param {ChangePasswordParams} params
 * @returns {Promise<ApiResponse<ChangePasswordData>>}
 */

// ---------------------------------------------------------------------------
// confirmPassword
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} ConfirmPasswordParams
 * @property {string} access_token
 * @property {string} password - Current password, re-entered to confirm identity.
 */

/**
 * @typedef {Object} ConfirmPasswordData
 * @property {string} verification_token - Short-lived token authorizing a sensitive
 *   follow-up action (e.g. changePassword).
 */

/**
 * Re-confirm the authenticated user's current password before a sensitive action.
 * @function
 * @param {ConfirmPasswordParams} params
 * @returns {Promise<ApiResponse<ConfirmPasswordData>>}
 */

// ---------------------------------------------------------------------------
// forgotPassword
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} ForgotPasswordParams
 * @property {string} email
 */

/**
 * Request a password reset OTP via email. Response is intentionally
 * non-revealing about whether the account exists.
 * @function
 * @param {ForgotPasswordParams} params
 * @returns {Promise<ApiResponse<null>>}
 */

// ---------------------------------------------------------------------------
// verifyPasswordResetOTP
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} VerifyPasswordResetOTPParams
 * @property {string} email
 * @property {string} otp
 */

/**
 * @typedef {Object} VerifyPasswordResetOTPData
 * @property {string} verification_token - Token to pass to resetPassword.
 */

/**
 * Verify the OTP sent by forgotPassword.
 * @function
 * @param {VerifyPasswordResetOTPParams} params
 * @returns {Promise<ApiResponse<VerifyPasswordResetOTPData>>}
 */

// ---------------------------------------------------------------------------
// resetPassword
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} ResetPasswordParams
 * @property {string} verification_token - Token from verifyPasswordResetOTP.
 * @property {string} new_password
 * @property {string} confirm_new_password
 */

/**
 * @typedef {Object} ResetPasswordFieldErrors
 * @property {string[]} [confirm_new_password]
 */

/**
 * Reset a user's password using a verified reset token.
 * @function
 * @param {ResetPasswordParams} params
 * @returns {Promise<ApiResponse<null>|ApiResponse<ResetPasswordFieldErrors>>}
 */

export {};
