import type { ApiResponse } from "../common";

export interface ChangePasswordParams {
    access_token: string;
    /** Token proving prior identity confirmation (e.g. from ConfirmPasswordData). */
    verification_token: string;
    new_password: string;
    confirm_new_password: string;
}

export interface ChangePasswordData {
    /** Fresh verification token issued after the change. */
    verification_token: string;
}

export interface ConfirmPasswordParams {
    access_token: string;
    /** Current password, re-entered to confirm identity. */
    password: string;
}

export interface ConfirmPasswordData {
    /** Short-lived token authorizing a sensitive follow-up action (e.g. changePassword). */
    verification_token: string;
}

export interface ForgotPasswordParams {
    email: string;
}

export interface VerifyPasswordResetOTPParams {
    email: string;
    otp: string;
}

export interface VerifyPasswordResetOTPData {
    /** Token to pass to resetPassword. */
    verification_token: string;
}

export interface ResetPasswordParams {
    /** Token from verifyPasswordResetOTP. */
    verification_token: string;
    new_password: string;
    confirm_new_password: string;
}

export interface ResetPasswordFieldErrors {
    confirm_new_password?: string[];
}

export interface PasswordApi {
    /** Change the authenticated user's password. */
    changePassword(params: ChangePasswordParams): Promise<ApiResponse<ChangePasswordData>>;

    /** Re-confirm the authenticated user's current password before a sensitive action. */
    confirmPassword(params: ConfirmPasswordParams): Promise<ApiResponse<ConfirmPasswordData>>;

    /**
     * Request a password reset OTP via email. Response is intentionally
     * non-revealing about whether the account exists.
     */
    forgotPassword(params: ForgotPasswordParams): Promise<ApiResponse<null>>;

    /** Verify the OTP sent by forgotPassword. */
    verifyPasswordResetOTP(
        params: VerifyPasswordResetOTPParams
    ): Promise<ApiResponse<VerifyPasswordResetOTPData>>;

    /** Reset a user's password using a verified reset token. */
    resetPassword(
        params: ResetPasswordParams
    ): Promise<ApiResponse<null> | ApiResponse<ResetPasswordFieldErrors>>;
}

declare const PasswordApi: PasswordApi;

export default PasswordApi;