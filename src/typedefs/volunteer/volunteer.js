/**
 * @file Type definitions and JSDoc for `sdk.volunteer.*` (self-service volunteer endpoints).
 */

/**
 * @typedef {import('../common.js').ApiResponse} ApiResponse
 * @typedef {import('../common.js').ValidationErrors} ValidationErrors
 * @typedef {import('../common.js').AvailabilitySlot} AvailabilitySlot
 */

// ---------------------------------------------------------------------------
// apply
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} VolunteerApplyParams
 * @property {string} access_token
 * @property {string} motivation
 * @property {string} occupation
 * @property {string} emergency_contact - Phone number in international format (e.g. `"+92..."`).
 * @property {AvailabilitySlot[]} availabilities
 */

/**
 * Submit a volunteer application for the authenticated user.
 * @function
 * @param {VolunteerApplyParams} params
 * @returns {Promise<ApiResponse<null>|ApiResponse<ValidationErrors>>}
 */

// ---------------------------------------------------------------------------
// getProfile
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} GetVolunteerProfileParams
 * @property {string} access_token
 */

/**
 * @typedef {Object} VolunteerProfile
 * @property {number} id
 * @property {string} email
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} occupation
 * @property {string} emergency_contact
 * @property {string} experience
 * @property {string} skills
 * @property {AvailabilitySlot[]} availabilities
 * @property {string} joined_at - ISO 8601 timestamp.
 */

/**
 * Retrieve the authenticated user's volunteer profile. Fails if the user
 * is not registered as a volunteer.
 * @function
 * @param {GetVolunteerProfileParams} params
 * @returns {Promise<ApiResponse<VolunteerProfile|null>>}
 */

// ---------------------------------------------------------------------------
// getVolunteerStatus
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} GetVolunteerStatusParams
 * @property {string} access_token
 */

/**
 * Overall volunteer lifecycle status for the authenticated user.
 * @typedef {("apply_required"|"pending"|"active"|"inactive")} VolunteerStatusValue
 */

/**
 * @typedef {Object} VolunteerStatusData
 * @property {VolunteerStatusValue} status
 * @property {string} [reason] - e.g. `"new_volunteer"`, `"volunteer_resigned"`, `"admin_deactivated"`.
 * @property {boolean} [cooldown_active] - Only present when `status` is `"inactive"`.
 * @property {boolean} [can_request_reactivation] - Only present when `status` is `"inactive"`.
 * @property {boolean} [has_pending_reactivation_request] - Only present when `status` is `"inactive"`.
 * @property {?string} [cooldown_until] - ISO 8601 timestamp, or `null`. Only when `status` is `"inactive"`.
 * @property {?string} [reactivation_expires_at] - ISO 8601 timestamp, or `null`. Only when `status` is `"inactive"`.
 */

/**
 * Retrieve the authenticated user's current volunteer status
 * (never registered / applied and pending / active / inactive).
 * @function
 * @param {GetVolunteerStatusParams} params
 * @returns {Promise<ApiResponse<VolunteerStatusData>>}
 */

// ---------------------------------------------------------------------------
// updateAvailabilities
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} UpdateAvailabilitiesParams
 * @property {string} access_token
 * @property {AvailabilitySlot[]} availabilities - Full replacement set of availability slots.
 */

/**
 * Replace the authenticated volunteer's availability slots.
 * @function
 * @param {UpdateAvailabilitiesParams} params
 * @returns {Promise<ApiResponse<null>|ApiResponse<ValidationErrors>>}
 */

// ---------------------------------------------------------------------------
// resign
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} VolunteerResignParams
 * @property {string} access_token
 * @property {string} reason
 */

/**
 * Voluntarily resign from the volunteer program.
 * @function
 * @param {VolunteerResignParams} params
 * @returns {Promise<ApiResponse<null>>}
 */

// ---------------------------------------------------------------------------
// requestReactivation
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} RequestReactivationParams
 * @property {string} access_token
 * @property {string} [reason]
 */

/**
 * Request reactivation of a resigned/deactivated volunteer account.
 * Subject to review and (for admin-deactivated accounts) a cooldown period.
 * @function
 * @param {RequestReactivationParams} params
 * @returns {Promise<ApiResponse<null>>}
 */

export {};
