/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Validators
 *
 * Common validation helpers used throughout the SDK.
 * ============================================================================
 */

import {
    InvalidRequestDataError,
} from "../errors/RequestErrors.js";


/**
 * Ensures all required fields are present.
 *
 * @param {Object} data
 * @param {string[]} requiredFields
 */
export function validateRequiredFields(
    data,
    requiredFields,
) {

    const missingFields = [];

    for (const field of requiredFields) {

        const value = data[field];

        if (
            value === undefined ||
            value === null ||
            value === ""
        ) {
            missingFields.push(field);
        }
    }

    if (missingFields.length > 0) {
        throw InvalidRequestDataError.missingFields(
            missingFields,
        );
    }
}


/**
 * Returns true if the value exists.
 *
 * Undefined, null and empty strings are considered missing.
 *
 * @param {*} value
 *
 * @returns {boolean}
 */
export function hasValue(value) {

    return !(
        value === undefined ||
        value === null ||
        value === ""
    );
}


/**
 * Ensures the supplied value is an object.
 *
 * @param {*} value
 *
 * @returns {boolean}
 */
export function isObject(value) {

    return (
        value !== null &&
        typeof value === "object" &&
        !Array.isArray(value)
    );
}


/**
 * Ensures the supplied value is an array.
 *
 * @param {*} value
 *
 * @returns {boolean}
 */
export function isArray(value) {

    return Array.isArray(value);
}


/**
 * Returns true if a string contains non-whitespace characters.
 *
 * @param {*} value
 *
 * @returns {boolean}
 */
export function isNonEmptyString(value) {

    return (
        typeof value === "string" &&
        value.trim().length > 0
    );
}


/**
 * Ensures the supplied value is a File or Blob.
 *
 * @param {*} file
 *
 * @throws {TypeError}
 */
export function validateFile(file) {

    if (
        typeof File !== "undefined" &&
        file instanceof File
    ) {
        return;
    }

    if (
        typeof Blob !== "undefined" &&
        file instanceof Blob
    ) {
        return;
    }

    throw new TypeError(
        "Expected a File or Blob.",
    );
}


/**
 * Ensures the supplied value is a non-empty array
 * containing only valid File or Blob objects.
 *
 * @param {*} files
 *
 * @throws {TypeError}
 */
export function validateFiles(files, { min = 1, max = Infinity } = {}) {

    if (!Array.isArray(files)) {
        throw new InvalidRequestDataError(
            "Expected an array of files.",
            "files",
        );
    }

    if (files.length < min) {
        throw new InvalidRequestDataError(
            `Expected at least ${min} file${min === 1 ? "" : "s"}.`,
            "files",
        );
    }

    if (files.length > max) {
        throw new InvalidRequestDataError(
            `Expected at most ${max} files.`,
            "files",
        );
    }

    for (const file of files) {
        validateFile(file);
    }

}


/**
 * Ensures the supplied value is a callback function.
 *
 * Undefined callbacks are allowed.
 *
 * @param {*} callback
 *
 * @throws {TypeError}
 */
export function validateCallback(callback) {

    if (callback === undefined) {
        return;
    }

    if (typeof callback !== "function") {
        throw new TypeError(
            "Expected callback to be a function.",
        );
    }
}


/**
 * Ensures each availability slot has start_time strictly
 * before end_time.
 *
 * Mirrors the backend's per-slot time-order check so callers
 * get fast, clear feedback before hitting the network. Does
 * not duplicate the backend's max-duration rule, since that
 * limit lives only on the backend and could drift out of sync
 * if hardcoded here.
 *
 * @param {Array<{day: string, start_time: string, end_time: string}>} slots
 *
 * @throws {TypeError}
 */
export function validateAvailabilitySlots(slots) {

    if (!Array.isArray(slots) || slots.length === 0) {
        throw new TypeError(
            "Expected at least one availability slot.",
        );
    }

    for (const slot of slots) {

        if (
            !slot ||
            typeof slot.start_time !== "string" ||
            typeof slot.end_time !== "string"
        ) {
            throw new TypeError(
                "Each availability slot requires start_time and end_time.",
            );
        }

        if (slot.start_time >= slot.end_time) {
            throw new TypeError(
                `start_time (${slot.start_time}) must be before end_time (${slot.end_time}).`,
            );
        }

    }

}