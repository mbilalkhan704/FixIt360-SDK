/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Public SDK Entry Point
 *
 * Exposes all public SDK modules.
 * ============================================================================
 */


import {
    initializeSDK,
    getCurrentConfig,
    isInitialized
} from "./config/config.js";
import AccountsApi from "./apis/accounts/index.js";
import ComplaintsApi from "./apis/complaints/index.js";
import VolunteerApi from "./apis/volunteer/index.js";
import AdminApi from "./apis/admin/index.js";


/**
 * @typedef {import('./typedefs/common.js').SDKConfig} SDKConfig
 */


class FixIt360SDK {

    /**
     * Creates a new SDK instance. If `config` is provided, the SDK is
     * initialized immediately; otherwise call `initializeSDK` before use.
     *
     * @param {SDKConfig} [config]
     */
    constructor(config) {
        if (config) {
            this.initializeSDK(config);
        }

        this.accounts = AccountsApi;
        this.complaints = ComplaintsApi;
        this.volunteer = VolunteerApi;
        this.admin = AdminApi;
    }

    /**
     * Initializes (or re-initializes) the SDK with the given config.
     *
     * @param {SDKConfig} config
     * @returns {FixIt360SDK} The SDK instance, for chaining.
     */
    initializeSDK(config) {
        initializeSDK(config);
        return this;
    }

    /**
     * Whether the SDK has been initialized.
     *
     * @returns {boolean}
     */
    isInitialized() {
        return isInitialized();
    }

    /**
     * Retrieves the SDK's current configuration.
     *
     * @returns {SDKConfig}
     */
    getCurrentConfig() {
        return getCurrentConfig();
    }

}


export default FixIt360SDK;
export * from "./errors/index.js";