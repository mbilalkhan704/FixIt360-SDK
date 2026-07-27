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


import { InvalidSDKConfigurationError } from "../errors/RequestErrors.js";


const DEFAULT_CONFIG = Object.freeze({
    /**
     * Base URL of the backend server.
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


let currentConfig = { ...DEFAULT_CONFIG };
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

    if (typeof config !== "object" || config === null || Array.isArray(config)) {
        throw new InvalidSDKConfigurationError(
            "SDK configuration must be an object."
        );
    }

    const mergedConfig = {
        ...DEFAULT_CONFIG,
        ...config,
    };

    if (
        typeof mergedConfig.baseURL !== "string" ||
        mergedConfig.baseURL.trim() === ""
    ) {
        throw new InvalidSDKConfigurationError(
            '"baseURL" must be a non-empty string.'
        );
    }

    if (
        !Number.isFinite(mergedConfig.timeout) ||
        mergedConfig.timeout <= 0
    ) {
        throw new InvalidSDKConfigurationError(
            '"timeout" must be a positive number.'
        );
    }

    if (typeof mergedConfig.withCredentials !== "boolean") {
        throw new InvalidSDKConfigurationError(
            '"withCredentials" must be a boolean.'
        );
    }

    currentConfig = mergedConfig;
    initialized = true;
}


/**
 * Returns the current SDK configuration.
 *
 * Internal SDK use only.
 */
export function getCurrentConfig() {
    return currentConfig;
}


/**
 * Returns the current SDK status.
 */
export function isInitialized() {
    return initialized;
}