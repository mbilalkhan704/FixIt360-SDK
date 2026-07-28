/**
 * @file Type definitions and JSDoc for `sdk.accounts.profile.*`.
 */

/**
 * @typedef {import('../common.js').ApiResponse} ApiResponse
 */

/**
 * @typedef {Object} UserProfile
 * @property {number} id
 * @property {string} email
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} date_of_birth - Format `"YYYY-MM-DD"`.
 * @property {string} gender - Lowercased, e.g. `"male"`.
 * @property {?string} phone_number
 * @property {?string} profile_picture_url
 * @property {string} role - e.g. `"citizen"`.
 */

// ---------------------------------------------------------------------------
// getProfile
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} GetProfileParams
 * @property {string} access_token
 */

/**
 * Retrieve the authenticated user's profile.
 * @function
 * @param {GetProfileParams} params
 * @returns {Promise<ApiResponse<UserProfile>>}
 */

// ---------------------------------------------------------------------------
// updateProfile
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} UpdateProfileParams
 * @property {string} access_token
 * @property {string} [first_name]
 * @property {string} [last_name]
 * @property {string} [phone_number]
 * @property {string} [date_of_birth]
 * @property {string} [gender]
 * @property {Blob} [profile_picture] - New profile picture file.
 */

/**
 * Update one or more fields of the authenticated user's profile.
 * Only the fields provided are changed.
 * @function
 * @param {UpdateProfileParams} params
 * @returns {Promise<ApiResponse<UserProfile>>}
 */

export {};
