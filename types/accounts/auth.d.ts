import type { ApiResponse } from "../common";

export interface LoginParams {
    email: string;
    password: string;
}

export interface AuthUser {
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    email_verified: boolean;
}

export interface LoginData {
    refresh: string;
    access: string;
    user: AuthUser;
}

export interface LogoutParams {
    access_token: string;
    refresh_token: string;
}

export interface RefreshTokenParams {
    refresh_token: string;
}

export interface RefreshTokenData {
    access: string;
    refresh: string;
}

export interface RegisterParams {
    first_name: string;
    last_name: string;
    email: string;
    gender: "Male" | "Female" | (string & {});
    /** Format `"YYYY/MM/DD"`. */
    date_of_birth: string;
    password: string;
    confirm_password: string;
}

export interface RegisterUser {
    email: string;
    email_verified: boolean;
}

export interface RegisterData {
    access: string;
    refresh: string;
    user: RegisterUser;
}

export interface ResendEmailOTPParams {
    access_token: string;
}

export interface VerifyEmailParams {
    access_token: string;
    otp: string;
}

declare const AuthApi: {
    /** Authenticate a user with email and password. */
    login(params: LoginParams): Promise<ApiResponse<LoginData>>;

    /** Invalidate the current session's tokens. */
    logout(params: LogoutParams): Promise<ApiResponse<null>>;

    /** Exchange a valid refresh token for a new access token. */
    refreshToken(params: RefreshTokenParams): Promise<ApiResponse<RefreshTokenData>>;

    /** Create a new account. Sends an email verification OTP on success. */
    register(params: RegisterParams): Promise<ApiResponse<RegisterData>>;

    /** Resend the email verification OTP to the authenticated (unverified) user. */
    resendEmailOTP(params: ResendEmailOTPParams): Promise<ApiResponse<null>>;

    /** Verify a user's email address using the OTP sent by register/resendEmailOTP. */
    verifyEmail(params: VerifyEmailParams): Promise<ApiResponse<null>>;
};

export default AuthApi;
