/**
 * ============================================================================
 * Common Types
 * ============================================================================
 */

/**
 * @typedef {Object} AuthenticationData
 * @property {string} access_token
 * @property {string} refresh_token
 */

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success
 * @property {string} message
 * @property {*} data
 */

/**
 * @typedef {Object} ComplaintData
 * @property {number} id
 */

/**
 * ============================================================================
 * Authentication Types
 * ============================================================================
 */

/**
 * @typedef {Object} RegisterRequest
 * @property {string} first_name
 *     Required. User's first name. Maximum 50 characters.
 * @property {string} last_name
 *     Required. User's last name. Maximum 50 characters.
 * @property {('male'|'female'|'other')} gender
 *     Required.
 * @property {string|Date} date_of_birth
 *     Required. Accepts a Date object or a string in YYYY-MM-DD format.
 * @property {string} email
 *     Required. Email address used for authentication.
 * @property {string} password
 *     Required.
 * @property {string} confirm_password
 *     Required. Must match password.
 * @property {string} [phone_number]
 *     Optional.
 */

/**
 * @typedef {Object} LoginRequest
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} GoogleLoginRequest
 * @property {string} id_token
 *     Google Identity Services ID Token.
 */

/**
 * @typedef {Object} RefreshTokenRequest
 * @property {string} refresh_token
 *     Refresh token previously issued by the SDK.
 */

/**
 * @typedef {Object} LogoutRequest
 * @property {string} access_token
 * @property {string} refresh_token
 */

/**
 * @typedef {Object} VerifyEmailRequest
 * @property {string} access_token
 * @property {string} otp
 */

/**
 * @typedef {Object} ResendEmailOTPRequest
 * @property {string} access_token
 */

/**
 * ============================================================================
 * Password Types
 * ============================================================================
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

/**
 * ============================================================================
 * Profile Types
 * ============================================================================
 */

/**
 * @typedef {Object} GetProfileRequest
 * @property {string} access_token
 */

/**
 * @typedef {Object} UpdateProfileRequest
 * @property {string} access_token
 * @property {string} [first_name]
 * @property {string} [last_name]
 * @property {('male'|'female'|'other')} [gender]
 * @property {string|Date} [date_of_birth]
 * @property {string} [phone_number]
 * @property {File|Blob} [file]
 * @property {function(number): void} [onProgress]
 */

/**
 * @typedef {Object} ProfileData
 * @property {number} id
 * @property {string} email
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} date_of_birth
 * @property {('male'|'female'|'other')} gender
 * @property {?string} phone_number
 * @property {?string} profile_picture_url
 * @property {string} role
 * @property {boolean} email_verified
 */

/**
 * ============================================================================
 * Complaint Types
 * ============================================================================
 */

/**
 * @typedef {Object} ListComplaintsRequest
 */

/**
 * @typedef {Object} GetComplaintRequest
 * @property {string} access_token
 * @property {number|string} complaint_id
 */

/**
 * @typedef {Object} CreateComplaintRequest
 * @property {string} access_token
 * @property {string} title
 * @property {string} description
 * @property {number} latitude
 * @property {number} longitude
 * @property {string} category
 * @property {string} address
 * @property {Array<File|Blob>} files
 * @property {number} [primaryFileIndex] - index into files marking the primary photo; defaults to first if omitted
 * @property {function(number): void} [onProgress]
 */

/**
 * @typedef {Object} UpdateComplaintRequest
 * @property {string} access_token
 * @property {number|string} complaint_id
 * @property {string} [title]
 * @property {string} [description]
 * @property {number} [latitude]
 * @property {number} [longitude]
 * @property {string} [address]
 * @property {Array<number|string>} [keepPhotoIds] - existing photo IDs to keep unchanged; any existing photo omitted here (and not in replacements) is deleted
 * @property {Array<File|Blob>} [newFiles] - new photos to add
 * @property {Array<{photo_id: number|string, file: File|Blob}>} [replacements] - existing photos to replace with a new file
 * @property {number|string} [primaryPhotoId] - marks an existing kept or replaced photo as primary
 * @property {number} [primaryNewFileIndex] - marks a photo from newFiles (by index) as primary
 * @property {function(number): void} [onProgress]
 */

/**
 * @typedef {Object} DeleteComplaintRequest
 * @property {string} access_token
 * @property {number|string} complaint_id
 */

/**
 * @typedef {Object} ListMineRequest
 * @property {string} access_token
 */

/**
 * @typedef {Object} ListByUserRequest
 * @property {string} access_token
 * @property {number|string} user_id
 */

/**
 * ============================================================================
 * Complaint Images Types
 * ============================================================================
 */

/**
 * @typedef {Object} AddComplaintImagesRequest
 * @property {string} access_token
 * @property {number|string} complaint_id
 * @property {Array<File|Blob>} files
 * @property {function(number): void} [onProgress]
 */

/**
 * @typedef {Object} ReplaceComplaintImageRequest
 * @property {string} access_token
 * @property {number|string} complaint_id
 * @property {number|string} image_id
 * @property {File|Blob} file
 * @property {function(number): void} [onProgress]
 */

/**
 * @typedef {Object} DeleteComplaintImageRequest
 * @property {string} access_token
 * @property {number|string} complaint_id
 * @property {number|string} image_id
 */

/**
 * ============================================================================
 * Volunteer Types
 * ============================================================================
 */

/**
 * @typedef {Object} AvailabilitySlot
 * @property {(
 *   'monday'|
 *   'tuesday'|
 *   'wednesday'|
 *   'thursday'|
 *   'friday'|
 *   'saturday'|
 *   'sunday'
 * )} day
 * @property {string} start_time
 * @property {string} end_time
 */

/**
 * @typedef {Object} GetVolunteerStatusRequest
 * @property {string} access_token
 */

/**
 * @typedef {Object} ApplyVolunteerRequest
 * @property {string} access_token
 * @property {string} motivation
 * @property {string} occupation
 * @property {string} emergency_contact
 * @property {string} [experience]
 * @property {string} [skills]
 * @property {AvailabilitySlot[]} availabilities
 */

/**
 * @typedef {Object} GetVolunteerProfileRequest
 * @property {string} access_token
 */

/**
 * @typedef {Object} UpdateAvailabilityRequest
 * @property {string} access_token
 * @property {AvailabilitySlot[]} availabilities
 */

/**
 * @typedef {Object} VolunteerResignationRequest
 * @property {string} access_token
 * @property {string} reason
 */

/**
 * @typedef {Object} VolunteerReactivationRequest
 * @property {string} access_token
 * @property {string} [reason]
 */

/**
 * ============================================================================
 * Admin Types
 * ============================================================================
 */

/**
 * ============================================================================
 * Admin - Volunteer Types
 * ============================================================================
 */

/**
 * @typedef {Object} ListApplicationsRequest
 * @property {string} access_token
 * @property {('pending'|'approved'|'rejected')} [status]
 * @property {string|number} [reviewed_by]
 */

/**
 * @typedef {Object} GetApplicationRequest
 * @property {string} access_token
 * @property {number|string} application_id
 */

/**
 * @typedef {Object} ReviewApplicationRequest
 * @property {string} access_token
 * @property {number|string} application_id
 * @property {('approved'|'rejected')} status
 */

/**
 * @typedef {Object} ListVolunteersRequest
 * @property {string} access_token
 * @property {('active'|'inactive')} [status]
 * @property {string|number} [approved_by]
 * @property {string|number} [deactivated_by]
 */

/**
 * @typedef {Object} GetVolunteerRequest
 * @property {string} access_token
 * @property {number|string} volunteer_id
 */

/**
 * @typedef {Object} DeactivateVolunteerRequest
 * @property {string} access_token
 * @property {number|string} volunteer_id
 * @property {string} reason
 */

/**
 * @typedef {Object} ListReactivationRequestsRequest
 * @property {string} access_token
 * @property {string} [status]
 * @property {string|number} [reviewed_by]
 */

/**
 * @typedef {Object} GetReactivationRequestRequest
 * @property {string} access_token
 * @property {number|string} request_id
 */

/**
 * @typedef {Object} ReviewReactivationRequest
 * @property {string} access_token
 * @property {number|string} request_id
 * @property {('approved'|'rejected')} status
 */

export { };