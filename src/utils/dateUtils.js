/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Date Utilities
 *
 * Helper functions for formatting dates before sending them to the backend.
 * ============================================================================
 */

import {
    IncompleteRequestDataError,
} from "../errors/RequestErrors.js";


/**
 * Converts a JavaScript Date into YYYY-MM-DD.
 *
 * Example:
 * 2026-07-20
 *
 * @param {Date|string} value
 *
 * @returns {string}
 */
export function toRequestDate(value) {

    if (!value) {
        throw new IncompleteRequestDataError("date");
    }

    const date =
        value instanceof Date
            ? value
            : new Date(value);

    if (Number.isNaN(date.getTime())) {
        throw new TypeError(
            "Invalid date supplied."
        );
    }

    return date
        .toISOString()
        .split("T")[0];
}


/**
 * Converts any backend ISO date into a JavaScript Date.
 *
 * @param {string|null} value
 *
 * @returns {Date|null}
 */
export function toDate(value) {

    if (!value) {
        return null;
    }

    return new Date(value);
}


/**
 * Returns today's date in request format.
 *
 * YYYY-MM-DD
 */
export function today() {

    return toRequestDate(new Date());
}