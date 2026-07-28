/**
 * @file Type definitions and JSDoc for `sdk.admin.volunteer.*` (admin-only endpoints).
 */

/**
 * @typedef {import('../common.js').ApiResponse} ApiResponse
 * @typedef {import('../common.js').PaginatedResult} PaginatedResult
 * @typedef {import('../common.js').AvailabilitySlot} AvailabilitySlot
 */

/**
 * Review status of an application or reactivation request.
 * @typedef {("pending"|"approved"|"rejected")} ReviewStatus
 */

/**
 * A volunteer application as returned by admin endpoints.
 * @typedef {Object} VolunteerApplication
 * @property {number} id
 * @property {string} email
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} motivation
 * @property {string} occupation
 * @property {string} emergency_contact
 * @property {string} experience
 * @property {string} skills
 * @property {AvailabilitySlot[]} availabilities
 * @property {ReviewStatus} status
 * @property {string} review_reason - Reason given by the reviewing admin (empty if unreviewed).
 * @property {string} created_at - ISO 8601 timestamp.
 * @property {?string} reviewed_at - ISO 8601 timestamp, or `null` if not yet reviewed.
 */

/**
 * A volunteer reactivation request as returned by admin endpoints.
 * @typedef {Object} VolunteerReactivationRequest
 * @property {number} id
 * @property {string} email
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} reason
 * @property {ReviewStatus} status
 * @property {string} review_reason
 * @property {string} created_at - ISO 8601 timestamp.
 * @property {?string} reviewed_at - ISO 8601 timestamp, or `null` if not yet reviewed.
 */

/**
 * Full active/inactive volunteer record as returned by admin endpoints.
 * @typedef {Object} AdminVolunteer
 * @property {number} id
 * @property {string} email
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} [occupation]
 * @property {string} [emergency_contact]
 * @property {string} [experience]
 * @property {string} [skills]
 * @property {AvailabilitySlot[]} [availabilities]
 * @property {boolean} is_active
 * @property {string} joined_at - ISO 8601 timestamp.
 * @property {?string} [left_at] - ISO 8601 timestamp, or `null`.
 * @property {string} [deactivation_reason]
 * @property {string} approved_by - Email of the admin who approved the volunteer.
 * @property {string} [reviewed_at] - ISO 8601 timestamp.
 * @property {string} [deactivated_by] - Email of the admin who deactivated the volunteer.
 */

/**
 * Summarized volunteer as returned by listVolunteers.
 * @typedef {Object} AdminVolunteerSummary
 * @property {number} id
 * @property {string} email
 * @property {string} first_name
 * @property {string} last_name
 * @property {boolean} is_active
 * @property {string} joined_at - ISO 8601 timestamp.
 * @property {?string} left_at - ISO 8601 timestamp, or `null`.
 * @property {string} approved_by - Email of the admin who approved the volunteer.
 */

// ---------------------------------------------------------------------------
// listVolunteerApplications
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} ListVolunteerApplicationsParams
 * @property {string} access_token
 * @property {ReviewStatus} [status] - Filter by review status.
 */

/**
 * List volunteer applications, optionally filtered by status.
 * @function
 * @param {ListVolunteerApplicationsParams} params
 * @returns {Promise<ApiResponse<PaginatedResult<VolunteerApplication>>>}
 */

// ---------------------------------------------------------------------------
// getVolunteerApplication
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} GetVolunteerApplicationParams
 * @property {string} access_token
 * @property {number} application_id
 */

/**
 * Retrieve a single volunteer application by ID.
 * @function
 * @param {GetVolunteerApplicationParams} params
 * @returns {Promise<ApiResponse<VolunteerApplication>>}
 */

// ---------------------------------------------------------------------------
// reviewVolunteerApplication
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} ReviewVolunteerApplicationParams
 * @property {string} access_token
 * @property {number} application_id
 * @property {("approved"|"rejected")} status
 * @property {string} [review_reason] - Optional when `status` is `"approved"`,
 *   required when `status` is `"rejected"`.
 */

/**
 * Approve or reject a pending volunteer application.
 * @function
 * @param {ReviewVolunteerApplicationParams} params
 * @returns {Promise<ApiResponse<null>>}
 */

// ---------------------------------------------------------------------------
// listVolunteers
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} ListVolunteersParams
 * @property {string} access_token
 */

/**
 * List all volunteers (active and inactive).
 * @function
 * @param {ListVolunteersParams} params
 * @returns {Promise<ApiResponse<PaginatedResult<AdminVolunteerSummary>>>}
 */

// ---------------------------------------------------------------------------
// getVolunteer
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} GetVolunteerParams
 * @property {string} access_token
 * @property {number} volunteer_id
 */

/**
 * Retrieve full detail for a single volunteer.
 * @function
 * @param {GetVolunteerParams} params
 * @returns {Promise<ApiResponse<AdminVolunteer>>}
 */

// ---------------------------------------------------------------------------
// deactivateVolunteer
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} DeactivateVolunteerParams
 * @property {string} access_token
 * @property {number} volunteer_id
 * @property {string} reason
 */

/**
 * Deactivate an active volunteer (admin-initiated).
 * @function
 * @param {DeactivateVolunteerParams} params
 * @returns {Promise<ApiResponse<null>>}
 */

// ---------------------------------------------------------------------------
// listVolunteerReactivationRequests
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} ListVolunteerReactivationRequestsParams
 * @property {string} access_token
 */

/**
 * List volunteer reactivation requests.
 * @function
 * @param {ListVolunteerReactivationRequestsParams} params
 * @returns {Promise<ApiResponse<PaginatedResult<VolunteerReactivationRequest>>>}
 */

// ---------------------------------------------------------------------------
// getVolunteerReactivationRequest
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} GetVolunteerReactivationRequestParams
 * @property {string} access_token
 * @property {number} request_id
 */

/**
 * Retrieve a single volunteer reactivation request by ID.
 * @function
 * @param {GetVolunteerReactivationRequestParams} params
 * @returns {Promise<ApiResponse<VolunteerReactivationRequest>>}
 */

// ---------------------------------------------------------------------------
// reviewVolunteerReactivationRequest
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} ReviewVolunteerReactivationRequestParams
 * @property {string} access_token
 * @property {number} request_id
 * @property {("approved"|"rejected")} status
 * @property {string} [review_reason] - Optional when `status` is `"approved"`,
 *   required when `status` is `"rejected"`.
 */

/**
 * Approve or reject a pending volunteer reactivation request.
 * @function
 * @param {ReviewVolunteerReactivationRequestParams} params
 * @returns {Promise<ApiResponse<null>>}
 */

export {};
