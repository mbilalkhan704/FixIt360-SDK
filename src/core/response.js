/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Response Parser
 *
 * Validates and normalizes backend responses.
 *
 * Every successful HTTP request passes through this file before being returned
 * to the frontend application.
 * ============================================================================
 */


import { InvalidResponseError } from "../errors/RequestErrors.js";


/**
 * @typedef {Object} SDKResponse
 * @property {boolean} success
 * @property {string} message
 * @property {Object|null} data
 */


/**
 * Parses and validates a backend response.
 *
 * @param {import("axios").AxiosResponse} response
 *
 * @returns {SDKResponse}
 *
 * @throws {InvalidResponseError}
 */
export function parseResponse(response) {

    try {

        if (!response || typeof response !== "object") {
            throw new Error("Response object is missing.");
        }

        const body = response.data;

        if (!body || typeof body !== "object") {
            throw new Error("Response body is missing.");
        }

        for (const field of ["success", "message", "data",]) {
            if (!(field in body)) {
                throw new Error(
                    `Missing "${field}" field.`,
                );
            }
        }

        return {
            success: body.success,
            message: body.message,
            data: body.data,
        };

    } catch (error) {

        if (error instanceof InvalidResponseError) {
            throw error;
        }

        throw new InvalidResponseError(
            error.message,
            error,
        );

    }

}

export default parseResponse;