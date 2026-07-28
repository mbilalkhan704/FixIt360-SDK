import type { ApiResponse, ValidationErrors, AvailabilitySlot } from "../common";

export interface VolunteerApplyParams {
    access_token: string;
    motivation: string;
    occupation: string;
    /** Phone number in international format (e.g. `"+92..."`). */
    emergency_contact: string;
    availabilities: AvailabilitySlot[];
}

export interface GetVolunteerProfileParams {
    access_token: string;
}

export interface VolunteerProfile {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    occupation: string;
    emergency_contact: string;
    experience: string;
    skills: string;
    availabilities: AvailabilitySlot[];
    /** ISO 8601 timestamp. */
    joined_at: string;
}

export interface GetVolunteerStatusParams {
    access_token: string;
}

export type VolunteerStatusValue = "apply_required" | "pending" | "active" | "inactive";

export interface VolunteerStatusData {
    status: VolunteerStatusValue;
    /** e.g. `"new_volunteer"`, `"volunteer_resigned"`, `"admin_deactivated"`. */
    reason?: string;
    /** Only present when `status` is `"inactive"`. */
    cooldown_active?: boolean;
    /** Only present when `status` is `"inactive"`. */
    can_request_reactivation?: boolean;
    /** Only present when `status` is `"inactive"`. */
    has_pending_reactivation_request?: boolean;
    /** ISO 8601 timestamp, or `null`. Only when `status` is `"inactive"`. */
    cooldown_until?: string | null;
    /** ISO 8601 timestamp, or `null`. Only when `status` is `"inactive"`. */
    reactivation_expires_at?: string | null;
}

export interface UpdateAvailabilitiesParams {
    access_token: string;
    /** Full replacement set of availability slots. */
    availabilities: AvailabilitySlot[];
}

export interface VolunteerResignParams {
    access_token: string;
    reason: string;
}

export interface RequestReactivationParams {
    access_token: string;
    reason?: string;
}

export interface VolunteerApi {
    /** Submit a volunteer application for the authenticated user. */
    apply(params: VolunteerApplyParams): Promise<ApiResponse<null> | ApiResponse<ValidationErrors>>;

    /**
     * Retrieve the authenticated user's volunteer profile. Fails if the user
     * is not registered as a volunteer.
     */
    getProfile(params: GetVolunteerProfileParams): Promise<ApiResponse<VolunteerProfile | null>>;

    /**
     * Retrieve the authenticated user's current volunteer status
     * (never registered / applied and pending / active / inactive).
     */
    getVolunteerStatus(params: GetVolunteerStatusParams): Promise<ApiResponse<VolunteerStatusData>>;

    /** Replace the authenticated volunteer's availability slots. */
    updateAvailabilities(
        params: UpdateAvailabilitiesParams
    ): Promise<ApiResponse<null> | ApiResponse<ValidationErrors>>;

    /** Voluntarily resign from the volunteer program. */
    resign(params: VolunteerResignParams): Promise<ApiResponse<null>>;

    /**
     * Request reactivation of a resigned/deactivated volunteer account.
     * Subject to review and (for admin-deactivated accounts) a cooldown period.
     */
    requestReactivation(params: RequestReactivationParams): Promise<ApiResponse<null>>;
}

declare const VolunteerApi: VolunteerApi;

export default VolunteerApi;
