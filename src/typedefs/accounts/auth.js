/**
 * @file Type definitions and JSDoc for `sdk.accounts.auth.*`.
 */

/**
 * @typedef {import('../common.js').ApiResponse} ApiResponse
 */

// ---------------------------------------------------------------------------
// login
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} LoginParams
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} AuthUser
 * @property {string} email
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} role - e.g. `"citizen"`.
 * @property {boolean} email_verified
 */

/**
 * @typedef {Object} LoginData
 * @property {string} refresh - JWT refresh token.
 * @property {string} access - JWT access token.
 * @property {AuthUser} user
 */

/**
 * Authenticate a user with email and password.
 * @function
 * @param {LoginParams} params
 * @returns {Promise<ApiResponse<LoginData>>}
 */

// ---------------------------------------------------------------------------
// logout
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} LogoutParams
 * @property {string} access_token
 * @property {string} refresh_token
 */

/**
 * Invalidate the current session's tokens.
 * @function
 * @param {LogoutParams} params
 * @returns {Promise<ApiResponse<null>>}
 */

// ---------------------------------------------------------------------------
// refreshToken
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} RefreshTokenParams
 * @property {string} refresh_token
 */

/**
 * @typedef {Object} RefreshTokenData
 * @property {string} access - New JWT access token.
 * @property {string} refresh - New (or rotated) JWT refresh token.
 */

/**
 * Exchange a valid refresh token for a new access token.
 * @function
 * @param {RefreshTokenParams} params
 * @returns {Promise<ApiResponse<RefreshTokenData>>}
 */

// ---------------------------------------------------------------------------
// register
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} RegisterParams
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} email
 * @property {("Male"|"Female"|string)} gender
 * @property {string} date_of_birth - Format `"YYYY/MM/DD"`.
 * @property {string} password
 * @property {string} confirm_password
 */

/**
 * @typedef {Object} RegisterUser
 * @property {string} email
 * @property {boolean} email_verified - Always `false` immediately after registration.
 */

/**
 * @typedef {Object} RegisterData
 * @property {string} access - JWT access token (used to verify the account via OTP).
 * @property {string} refresh - JWT refresh token.
 * @property {RegisterUser} user
 */

/**
 * Create a new account. Sends an email verification OTP on success.
 * @function
 * @param {RegisterParams} params
 * @returns {Promise<ApiResponse<RegisterData>>}
 */

// ---------------------------------------------------------------------------
// resendEmailOTP
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} ResendEmailOTPParams
 * @property {string} access_token
 */

/**
 * Resend the email verification OTP to the authenticated (unverified) user.
 * @function
 * @param {ResendEmailOTPParams} params
 * @returns {Promise<ApiResponse<null>>}
 */

// ---------------------------------------------------------------------------
// verifyEmail
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} VerifyEmailParams
 * @property {string} access_token
 * @property {string} otp - One-time code sent to the user's email.
 */

/**
 * Verify a user's email address using the OTP sent by register/resendEmailOTP.
 * @function
 * @param {VerifyEmailParams} params
 * @returns {Promise<ApiResponse<null>>}
 */

export {};
