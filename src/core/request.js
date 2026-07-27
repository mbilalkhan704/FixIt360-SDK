/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Request Layer
 *
 * Executes HTTP requests using the shared Axios client.
 * All requests pass through this layer.
 * ============================================================================
 */


import { getAxiosClient } from "./axiosClient.js";
import parseResponse from "./response.js";
import { NetworkError, RequestTimeoutError, ServerError } from "../errors/RequestErrors.js";


/**
 * Executes an HTTP request.
 * 
 * @typedef {import("./response.js").SDKResponse} SDKResponse
 *
 * @param {Object} options
 * @param {"GET"|"POST"|"PUT"|"PATCH"|"DELETE"} options.method
 * @param {string} options.endpoint
 * @param {Object} [options.payload]
 * @param {Object} [options.query]
 * @param {Object} [options.headers]
 * @param {number} [options.timeout]
 *
 * @returns {Promise<SDKResponse>}
 *
 * @throws {ServerError}
 * @throws {RequestTimeoutError}
 * @throws {NetworkError}
 */
async function executeRequest({ method, endpoint, payload, query, headers = {}, timeout }) {

    const client = getAxiosClient();

    try {
        const response = await client({
            method,
            url: endpoint,
            data: payload,
            params: query,
            headers,
            timeout,
        });
        return parseResponse(response);
    }

    catch (error) {
        /*
         * Axios received a response from the server.
         */
        if (error.response) {
            if (error.response.status >= 500) {
                throw new ServerError(
                    error.response.data?.message,
                    error,
                );
            }

            /*
             * Backend business errors.
             * Return them unchanged.
             */
            return parseResponse(error.response);
        }

        /*
         * Request timed out.
         */
        if (error.code === "ECONNABORTED") {
            throw new RequestTimeoutError(
                null,
                error,
            );
        }

        /*
         * Network failure.
         */
        throw new NetworkError(
            error.message,
            error,
        );
    }

}


export function get(options) {

    return executeRequest({
        ...options,
        method: "GET",
    });

}


export function post(options) {

    return executeRequest({
        ...options,
        method: "POST",
    });

}


export function put(options) {

    return executeRequest({
        ...options,
        method: "PUT",
    });

}


export function patch(options) {

    return executeRequest({
        ...options,
        method: "PATCH",
    });

}


export function del(options) {

    return executeRequest({
        ...options,
        method: "DELETE",
    });

}