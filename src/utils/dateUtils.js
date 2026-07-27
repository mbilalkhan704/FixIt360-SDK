/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Date Utilities
 *
 * Helper functions for formatting dates before sending them to the backend.
 * ============================================================================
 */


import { InvalidRequestDataError } from "../errors/RequestErrors.js";


/**
 * Converts a date value into the backend's `YYYY-MM-DD` format.
 *
 * Accepts either a JavaScript `Date` object or a date string.
 * If a `YYYY-MM-DD` string is supplied, it is returned unchanged.
 *
 * @param {Date|string} value
 *
 * @returns {string}
 *
 * @throws {InvalidRequestDataError}
 */
export function toRequestDate(value) {

    if (!value) {
        throw InvalidRequestDataError.missingFields("date");
    }

    // Already a date-only string
    if (typeof value === "string") {
        const match = value.match(/^\d{4}-\d{2}-\d{2}$/);

        if (match) {
            return value;
        }
    }

    const date = value instanceof Date ? value : new Date(value);

    if (Number.isNaN(date.getTime())) {
        throw new InvalidRequestDataError(
            "Invalid date format. Please supply a valid JavaScript Date object or a \"YYYY-MM-DD\" string."
        );
    }

    return [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0"),
    ].join("-");

}


/**
 * Converts a backend date string into a JavaScript `Date`.
 *
 * Returns `null` when the supplied value is `null`,
 * `undefined`, or an empty string.
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
 * Returns today's date in the backend's `YYYY-MM-DD` format.
 *
 * @returns {string}
 */
export function today() {

    return toRequestDate(new Date());

}