const API = "/api/v1";

const ROUTES = {
    ACCOUNTS: `${API}/accounts`,
    VOLUNTEER: `${API}/accounts/volunteer`,
    COMPLAINTS: `${API}/complaints`,
    STORAGE: `${API}/storage`,
    ADMIN: `${API}/accounts/admin`,
};

const ENDPOINTS = {

    /**
     * ============================================================================
     * Accounts
     * ============================================================================
     */

    ACCOUNTS: {
        REGISTER: `${ROUTES.ACCOUNTS}/register/`,
        LOGIN: `${ROUTES.ACCOUNTS}/login/`,
        GOOGLE_LOGIN: `${ROUTES.ACCOUNTS}/google/`,
        REFRESH_TOKEN: `${ROUTES.ACCOUNTS}/token/refresh/`,
        LOGOUT: `${ROUTES.ACCOUNTS}/logout/`,

        VERIFY_EMAIL: `${ROUTES.ACCOUNTS}/verify-email/`,
        RESEND_EMAIL_OTP: `${ROUTES.ACCOUNTS}/resend-email-otp/`,

        FORGOT_PASSWORD: `${ROUTES.ACCOUNTS}/forgot-password/`,
        VERIFY_PASSWORD_RESET_OTP: `${ROUTES.ACCOUNTS}/verify-password-reset-otp/`,
        RESET_PASSWORD: `${ROUTES.ACCOUNTS}/reset-password/`,

        CONFIRM_PASSWORD: `${ROUTES.ACCOUNTS}/confirm-password/`,
        CHANGE_PASSWORD: `${ROUTES.ACCOUNTS}/change-password/`,

        PROFILE: `${ROUTES.ACCOUNTS}/profile/`,

        DELETE_ACCOUNT: `${ROUTES.ACCOUNTS}/delete/user/me/`,
        REACTIVATE_ACCOUNT: `${ROUTES.ACCOUNTS}/reactivate-account/`,
    },

    /**
     * ============================================================================
     * Volunteer
     * ============================================================================
     */

    VOLUNTEER: {
        STATUS: `${ROUTES.VOLUNTEER}/status/`,
        APPLY: `${ROUTES.VOLUNTEER}/apply/`,
        PROFILE: `${ROUTES.VOLUNTEER}/profile/`,
        UPDATE_AVAILABILITY: `${ROUTES.VOLUNTEER}/availability/`,
        RESIGN: `${ROUTES.VOLUNTEER}/resign/`,
        REACTIVATION_REQUEST: `${ROUTES.VOLUNTEER}/reactivation-request/`,
    },

    /**
     * ============================================================================
     * Complaints
     * ============================================================================
     */

    COMPLAINTS: {
        LIST: `${ROUTES.COMPLAINTS}/`,
        CREATE: `${ROUTES.COMPLAINTS}/`,

        DETAIL: (complaintId) => `${ROUTES.COMPLAINTS}/${complaintId}/`,
        UPDATE: (complaintId) => `${ROUTES.COMPLAINTS}/${complaintId}/`,
        DELETE: (complaintId) => `${ROUTES.COMPLAINTS}/${complaintId}/`,

        ADD_IMAGES: (complaintId) =>
            `${ROUTES.COMPLAINTS}/${complaintId}/images/`,

        DELETE_IMAGE: (complaintId, imageId) =>
            `${ROUTES.COMPLAINTS}/${complaintId}/images/${imageId}/`,

        REPLACE_IMAGE: (complaintId, imageId) =>
            `${ROUTES.COMPLAINTS}/${complaintId}/images/${imageId}/`,
    },

    /**
     * ============================================================================
     * Storage
     * ============================================================================
     */

    STORAGE: {
        PROFILE_PICTURE_SIGNATURE:
            `${ROUTES.STORAGE}/upload-signature/profile-picture/`,

        COMPLAINT_IMAGES_SIGNATURE:
            `${ROUTES.STORAGE}/upload-signature/complaint-images/`,
    },


    /**
     * ============================================================================
     * Admin Endpoints
     * ============================================================================
     *
     * Only currently implemented admin endpoints are included.
     * Future complaint-management and president endpoints will be added here.
     */

    ADMIN: {

        VOLUNTEER_APPLICATIONS: {

            LIST:
                `${ROUTES.ADMIN}/volunteer-applications/`,

            DETAIL: (applicationId) =>
                `${ROUTES.ADMIN}/volunteer-applications/${applicationId}/`,

            REVIEW: (applicationId) =>
                `${ROUTES.ADMIN}/volunteer-applications/${applicationId}/review/`,
        },

        VOLUNTEERS: {

            LIST:
                `${ROUTES.ADMIN}/volunteers/`,

            DETAIL: (volunteerId) =>
                `${ROUTES.ADMIN}/volunteers/${volunteerId}/`,

            DEACTIVATE: (volunteerId) =>
                `${ROUTES.ADMIN}/volunteers/${volunteerId}/deactivate/`,
        },



        VOLUNTEER_REACTIVATION_REQUESTS: {

            LIST:
                `${ROUTES.ADMIN}/volunteer-reactivation-requests/`,

            DETAIL: (requestId) =>
                `${ROUTES.ADMIN}/volunteer-reactivation-requests/${requestId}/`,

            REVIEW: (requestId) =>
                `${ROUTES.ADMIN}/volunteer-reactivation-requests/${requestId}/review/`,
        },
    }
};

export { API, ROUTES, ENDPOINTS };

export default ENDPOINTS;