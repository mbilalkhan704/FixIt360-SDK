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

import {
    NetworkError,
    RequestTimeoutError,
    ServerError,
} from "../errors/RequestErrors.js";


/**
 * Executes an HTTP request.
 *
 * @param {Object} options
 * @param {"GET"|"POST"|"PUT"|"PATCH"|"DELETE"} options.method
 * @param {string} options.endpoint
 * @param {Object} [options.payload]
 * @param {Object} [options.query]
 * @param {Object} [options.headers]
 * @param {number} [options.timeout]
 *
 * @returns {Promise<Object>}
 */
async function executeRequest({

    method,

    endpoint,

    payload,

    query,

    headers = {},

    timeout,

}) {

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


/**
 * Executes a GET request.
 */
export function get(options) {

    return executeRequest({

        ...options,

        method: "GET",

    });

}


/**
 * Executes a POST request.
 */
export function post(options) {

    return executeRequest({

        ...options,

        method: "POST",

    });

}


/**
 * Executes a PUT request.
 */
export function put(options) {

    return executeRequest({

        ...options,

        method: "PUT",

    });

}


/**
 * Executes a PATCH request.
 */
export function patch(options) {

    return executeRequest({

        ...options,

        method: "PATCH",

    });

}


/**
 * Executes a DELETE request.
 */
export function del(options) {

    return executeRequest({

        ...options,

        method: "DELETE",

    });

}