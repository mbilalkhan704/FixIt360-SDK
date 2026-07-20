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

import {
    InvalidResponseError,
} from "../errors/RequestErrors.js";

/**
 * Parses and validates a backend response.
 *
 * @param {import("axios").AxiosResponse} response
 *
 * @returns {{
 *      success: boolean,
 *      message: string,
 *      data: any,
 * }}
 */
export function parseResponse(response) {

    if (!response || typeof response !== "object") {
        throw new InvalidResponseError(
            "Response object is missing."
        );
    }

    const body = response.data;

    if (!body || typeof body !== "object") {
        throw new InvalidResponseError(
            "Response body is missing."
        );
    }

    if (!("success" in body)) {
        throw new InvalidResponseError(
            'Missing "success" field.'
        );
    }

    if (!("message" in body)) {
        throw new InvalidResponseError(
            'Missing "message" field.'
        );
    }

    if (!("data" in body)) {
        throw new InvalidResponseError(
            'Missing "data" field.'
        );
    }

    return {
        success: body.success,
        message: body.message,
        data: body.data,
    };
}

export default parseResponse;