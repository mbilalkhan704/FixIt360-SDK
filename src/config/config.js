/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Global SDK Configuration
 *
 * This file stores the runtime configuration used throughout the SDK.
 * It must be initialized once before making any API requests.
 * ============================================================================
 */

const DEFAULT_CONFIG = Object.freeze({

    /**
     * Base URL of the backend server.
     *
     * Example:
     * https://api.fixit360.org
     */
    baseURL: "",

    /**
     * Axios request timeout (milliseconds).
     */
    timeout: 30000,

    /**
     * Whether cookies should be sent with requests.
     */
    withCredentials: false,
});

let currentConfig = {
    ...DEFAULT_CONFIG,
};

let initialized = false;

/**
 * Initializes the SDK.
 *
 * This function should be called once during application startup.
 *
 * Example:
 *
 * initializeSDK({
 *     baseURL: "https://api.fixit360.org",
 * });
 */
export function initializeSDK(config = {}) {

    initialized = true;

    currentConfig = {
        ...DEFAULT_CONFIG,
        ...config,
    };
}

/**
 * Returns the current SDK configuration.
 *
 * Internal SDK use only.
 */
export function getcurrentConfig() {
    return currentConfig;
}

/**
 * Returns the current SDK status.
 */
export function isInitialized() {
    return initialized;
}