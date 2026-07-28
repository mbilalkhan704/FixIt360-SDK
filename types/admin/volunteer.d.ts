import type { ApiResponse, PaginatedResult, AvailabilitySlot } from "../common";

export type ReviewStatus = "pending" | "approved" | "rejected";

/** A volunteer application as returned by admin endpoints. */
export interface VolunteerApplication {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    motivation: string;
    occupation: string;
    emergency_contact: string;
    experience: string;
    skills: string;
    availabilities: AvailabilitySlot[];
    status: ReviewStatus;
    /** Reason given by the reviewing admin (empty if unreviewed). */
    review_reason: string;
    /** ISO 8601 timestamp. */
    created_at: string;
    /** ISO 8601 timestamp, or `null` if not yet reviewed. */
    reviewed_at: string | null;
}

/** A volunteer reactivation request as returned by admin endpoints. */
export interface VolunteerReactivationRequest {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    reason: string;
    status: ReviewStatus;
    review_reason: string;
    /** ISO 8601 timestamp. */
    created_at: string;
    /** ISO 8601 timestamp, or `null` if not yet reviewed. */
    reviewed_at: string | null;
}

/** Full active/inactive volunteer record as returned by admin endpoints. */
export interface AdminVolunteer {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    occupation?: string;
    emergency_contact?: string;
    experience?: string;
    skills?: string;
    availabilities?: AvailabilitySlot[];
    is_active: boolean;
    /** ISO 8601 timestamp. */
    joined_at: string;
    /** ISO 8601 timestamp, or `null`. */
    left_at?: string | null;
    deactivation_reason?: string;
    /** Email of the admin who approved the volunteer. */
    approved_by: string;
    /** ISO 8601 timestamp. */
    reviewed_at?: string;
    /** Email of the admin who deactivated the volunteer. */
    deactivated_by?: string;
}

/** Summarized volunteer as returned by listVolunteers. */
export interface AdminVolunteerSummary {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    /** ISO 8601 timestamp. */
    joined_at: string;
    /** ISO 8601 timestamp, or `null`. */
    left_at: string | null;
    /** Email of the admin who approved the volunteer. */
    approved_by: string;
}

/** Admin DB id, or the literal `"me"` for the currently authenticated admin. */
export type AdminIdFilter = string;

export interface ListVolunteerApplicationsParams {
    access_token: string;
    /** Filter by review status. */
    status?: ReviewStatus;
    /** Filter by reviewing admin. */
    reviewed_by?: AdminIdFilter;
}

export interface GetVolunteerApplicationParams {
    access_token: string;
    application_id: number;
}

export interface ReviewVolunteerApplicationParams {
    access_token: string;
    application_id: number;
    status: "approved" | "rejected";
    /** Optional when `status` is `"approved"`, required when `status` is `"rejected"`. */
    review_reason?: string;
}

export type VolunteerActiveStatus = "active" | "inactive";

export interface ListVolunteersParams {
    access_token: string;
    /** Filter by active/inactive status. */
    status?: VolunteerActiveStatus;
    /** Filter by the admin who approved the volunteer. */
    approved_by?: AdminIdFilter;
    /** Filter by the admin who deactivated the volunteer. */
    deactivated_by?: AdminIdFilter;
}

export interface GetVolunteerParams {
    access_token: string;
    volunteer_id: number;
}

export interface DeactivateVolunteerParams {
    access_token: string;
    volunteer_id: number;
    reason: string;
}

export interface ListVolunteerReactivationRequestsParams {
    access_token: string;
    /** Filter by review status. */
    status?: ReviewStatus;
    /** Filter by reviewing admin. */
    reviewed_by?: AdminIdFilter;
}

export interface GetVolunteerReactivationRequestParams {
    access_token: string;
    request_id: number;
}

export interface ReviewVolunteerReactivationRequestParams {
    access_token: string;
    request_id: number;
    status: "approved" | "rejected";
    /** Optional when `status` is `"approved"`, required when `status` is `"rejected"`. */
    review_reason?: string;
}

export interface AdminVolunteerApi {
    /** List volunteer applications, optionally filtered by status. */
    listVolunteerApplications(
        params: ListVolunteerApplicationsParams
    ): Promise<ApiResponse<PaginatedResult<VolunteerApplication>>>;

    /** Retrieve a single volunteer application by ID. */
    getVolunteerApplication(
        params: GetVolunteerApplicationParams
    ): Promise<ApiResponse<VolunteerApplication>>;

    /** Approve or reject a pending volunteer application. */
    reviewVolunteerApplication(params: ReviewVolunteerApplicationParams): Promise<ApiResponse<null>>;

    /** List all volunteers (active and inactive). */
    listVolunteers(
        params: ListVolunteersParams
    ): Promise<ApiResponse<PaginatedResult<AdminVolunteerSummary>>>;

    /** Retrieve full detail for a single volunteer. */
    getVolunteer(params: GetVolunteerParams): Promise<ApiResponse<AdminVolunteer>>;

    /** Deactivate an active volunteer (admin-initiated). */
    deactivateVolunteer(params: DeactivateVolunteerParams): Promise<ApiResponse<null>>;

    /** List volunteer reactivation requests. */
    listVolunteerReactivationRequests(
        params: ListVolunteerReactivationRequestsParams
    ): Promise<ApiResponse<PaginatedResult<VolunteerReactivationRequest>>>;

    /** Retrieve a single volunteer reactivation request by ID. */
    getVolunteerReactivationRequest(
        params: GetVolunteerReactivationRequestParams
    ): Promise<ApiResponse<VolunteerReactivationRequest>>;

    /** Approve or reject a pending volunteer reactivation request. */
    reviewVolunteerReactivationRequest(
        params: ReviewVolunteerReactivationRequestParams
    ): Promise<ApiResponse<null>>;
}

declare const AdminVolunteerApi: AdminVolunteerApi;

export default AdminVolunteerApi;