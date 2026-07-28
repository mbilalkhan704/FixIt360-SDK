import type { ApiResponse } from "../common";

export interface UserProfile {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    /** Format `"YYYY-MM-DD"`. */
    date_of_birth: string;
    /** Lowercased, e.g. `"male"`. */
    gender: string;
    phone_number: string | null;
    profile_picture_url: string | null;
    /** e.g. `"citizen"`. */
    role: string;
}

export interface GetProfileParams {
    access_token: string;
}

export interface UpdateProfileParams {
    access_token: string;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    date_of_birth?: string;
    gender?: string;
    /** New profile picture file. */
    profile_picture?: Blob;
}

declare const ProfileApi: {
    /** Retrieve the authenticated user's profile. */
    getProfile(params: GetProfileParams): Promise<ApiResponse<UserProfile>>;

    /**
     * Update one or more fields of the authenticated user's profile.
     * Only the fields provided are changed.
     */
    updateProfile(params: UpdateProfileParams): Promise<ApiResponse<UserProfile>>;
};

export default ProfileApi;
