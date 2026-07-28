import type { SDKConfig } from "./common";
import type { AuthApi } from "./accounts/auth";
import type { PasswordApi } from "./accounts/password";
import type { ProfileApi } from "./accounts/profile";
import type { ComplaintApi } from "./complaints/complaint";
import type { ComplaintImagesApi } from "./complaints/complaintImages";
import type { VolunteerApi } from "./volunteer/volunteer";
import type { AdminVolunteerApi } from "./admin/volunteer";

/** Shape of `sdk.accounts`, per `src/apis/accounts/index.js`. */
interface AccountsApi {
    auth: AuthApi;
    password: PasswordApi;
    profile: ProfileApi;
}

/**
 * Shape of `sdk.complaints`, per `src/apis/complaints/index.js`
 * (spreads ComplaintApi's methods to the top level, adds `images`).
 */
type ComplaintsApi = ComplaintApi & {
    images: ComplaintImagesApi;
};

/** Shape of `sdk.admin`, per `src/apis/admin/index.js`. */
interface AdminApi {
    volunteer: AdminVolunteerApi;
}

declare class FixIt360SDK {
    /**
     * Creates a new SDK instance. If `config` is provided, the SDK is
     * initialized immediately; otherwise call `initializeSDK` before use.
     */
    constructor(config?: SDKConfig);

    /** Initializes (or re-initializes) the SDK with the given config. */
    initializeSDK(config: SDKConfig): FixIt360SDK;

    /** Whether the SDK has been initialized. */
    isInitialized(): boolean;

    /** Retrieves the SDK's current configuration. */
    getCurrentConfig(): SDKConfig;

    accounts: AccountsApi;
    complaints: ComplaintsApi;
    volunteer: VolunteerApi;
    admin: AdminApi;
}

export default FixIt360SDK;
export * from "./errors";