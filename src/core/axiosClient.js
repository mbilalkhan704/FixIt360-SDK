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
import { getCurrentConfig, isInitialized } from "../config/config.js";
import { SDKNotInitializedError } from "../errors/RequestErrors.js";


/**
 * @typedef {import("axios").AxiosInstance} AxiosInstance
 */


/**
 * Shared Axios instance.
 *
 * @type {AxiosInstance|null}
 */
let instance = null;


/**
 * Returns the shared Axios client instance.
 *
 * Creates the instance on first use and returns the same
 * instance for all subsequent requests.
 *
 * @returns {AxiosInstance}
 *
 * @throws {SDKNotInitializedError}
 */
export function getAxiosClient() {

    if (!isInitialized()) throw new SDKNotInitializedError();
    if (instance) return instance;

    const config = getCurrentConfig();

    instance = axios.create({
        baseURL: config.baseURL,
        timeout: config.timeout,
        withCredentials: config.withCredentials,
    });

    return instance;

}