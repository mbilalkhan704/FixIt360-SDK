/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Validators
 *
 * Common validation helpers used throughout the SDK.
 * ============================================================================
 */


import { InvalidRequestDataError } from "../errors/RequestErrors.js";


/**
 * Validates that all required fields are present.
 *
 * A field is considered missing if its value is `undefined`,
 * `null`, or an empty string.
 *
 * @param {Object} data
 * @param {string[]} requiredFields
 *
 * @throws {InvalidRequestDataError}
 */
export function validateRequiredFields(data, requiredFields) {

    const missingFields = [];

    for (const field of requiredFields) {
        const value = data[field];
        if (value === undefined || value === null || value === "") {
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
 * Returns whether the supplied value is present.
 *
 * Values of `undefined`, `null`, and empty strings are
 * considered missing.
 *
 * @param {*} value
 *
 * @returns {boolean}
 */
export function hasValue(value) {

    return !(value === undefined || value === null || value === "");

}


/**
 * Returns whether the supplied value is a plain object.
 *
 * Arrays and `null` are not considered objects.
 *
 * @param {*} value
 *
 * @returns {boolean}
 */
export function isObject(value) {

    return (value !== null && typeof value === "object" && !Array.isArray(value));

}


/**
 * Returns whether the supplied value is an array.
 *
 * @param {*} value
 *
 * @returns {boolean}
 */
export function isArray(value) {

    return Array.isArray(value);

}


/**
 * Returns whether the supplied value is a non-empty string.
 *
 * Strings containing only whitespace are considered empty.
 *
 * @param {*} value
 *
 * @returns {boolean}
 */
export function isNonEmptyString(value) {

    return (typeof value === "string" && value.trim().length > 0);

}


/**
 * Validates that the supplied value is a File or Blob.
 *
 * @param {*} file
 *
 * @throws {InvalidRequestDataError}
 */
export function validateFile(file) {

    if (typeof File !== "undefined" && file instanceof File) {
        return;
    }

    if (typeof Blob !== "undefined" && file instanceof Blob) {
        return;
    }

    throw new InvalidRequestDataError(
        "Expected a File or Blob.",
    );
}


/**
 * Validates an array of File or Blob objects.
 *
 * Ensures the array length is within the configured bounds
 * and that every element is a valid File or Blob.
 *
 * @param {*} files
 * @param {{min?: number, max?: number}} [options]
 *
 * @throws {InvalidRequestDataError}
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
 * Validates an optional callback function.
 *
 * If provided, the value must be a function. `undefined`
 * is allowed.
 *
 * @param {*} callback
 *
 * @throws {InvalidRequestDataError}
 */
export function validateCallback(callback) {

    if (callback === undefined) {
        return;
    }

    if (typeof callback !== "function") {
        throw new InvalidRequestDataError(
            "Expected callback to be a function.",
        );
    }

}


/**
 * Validates an array of availability slots.
 *
 * Ensures each slot contains `start_time` and `end_time`
 * strings, and that `start_time` is strictly before
 * `end_time`.
 *
 * This mirrors the backend's per-slot time-order validation
 * without duplicating backend-specific duration limits.
 *
 * @param {{day: string, start_time: string, end_time: string}[]} slots
 *
 * @throws {InvalidRequestDataError}
 */
export function validateAvailabilitySlots(slots) {

    if (!Array.isArray(slots) || slots.length === 0) {
        throw new InvalidRequestDataError(
            'Expected "availabilities" to be a non-empty array of availability slots. ' +
            'Example: [{ day: "monday", start_time: "16:00", end_time: "18:00" }].'
        );
    }

    for (const slot of slots) {
        if (!slot || typeof slot.start_time !== "string" || typeof slot.end_time !== "string") {
            throw new InvalidRequestDataError(
                "Each availability slot requires start_time and end_time.",
            );
        }

        if (slot.start_time >= slot.end_time) {
            throw new InvalidRequestDataError(
                `start_time (${slot.start_time}) must be before end_time (${slot.end_time}).`,
            );
        }
    }

}


/**
 * Validates that the supplied primary index is within the
 * bounds of the given array.
 *
 * @param {Array} array
 * @param {number} primaryIndex
 *
 * @throws {InvalidRequestDataError}
 */
export function validatePrimaryIndex(array, primaryIndex) {

    if (!Number.isInteger(primaryIndex) || primaryIndex < 0 || primaryIndex >= array.length) {
        throw new InvalidRequestDataError(
            "primaryIndex is out of bounds of the array.",
            "primaryIndex"
        );
    }

}