/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Axios Client
 *
 * Creates the shared Axios instance used throughout the SDK.
 * ============================================================================
 */

import axios from "axios";

import {
    getCurrentConfig,
    isInitialized,
} from "../config/config.js";

import {
    SDKNotInitializedError,
} from "../errors/RequestErrors.js";

/**
 * Shared Axios instance.
 *
 * @type {import("axios").AxiosInstance|null}
 */
let instance = null;

/**
 * Returns the singleton Axios instance.
 *
 * @returns {AxiosInstance}
 */
export function getAxiosClient() {

    if (!isInitialized()) {
        throw new SDKNotInitializedError();
    }

    if (instance) {
        return instance;
    }

    const config = getCurrentConfig();

    instance = axios.create({

        baseURL: config.baseURL,

        timeout: config.timeout,

        withCredentials: config.withCredentials,
    });

    return instance;
}