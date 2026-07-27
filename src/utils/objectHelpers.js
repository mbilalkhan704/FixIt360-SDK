/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Object Helpers
 *
 * Utility functions for manipulating JavaScript objects before sending them
 * to the backend.
 * ============================================================================
 */


/**
 * Returns a new object with all `undefined` properties removed.
 *
 * Properties whose values are `null` are preserved, as the backend
 * may interpret `null` differently from omitted fields.
 *
 * @param {Object} object
 *
 * @returns {Object}
 */
export function removeUndefinedFields(object) {

    return Object.fromEntries(
        Object.entries(object).filter(
            ([, value]) => value !== undefined
        )
    );

}


/**
 * Returns a new object containing only the specified properties.
 *
 * Keys that do not exist on the source object are ignored.
 *
 * @param {Object} object
 * @param {string[]} keys
 *
 * @returns {Object}
 */
export function pick(object, keys) {

    return Object.fromEntries(
        keys
            .filter(key => key in object)
            .map(key => [key, object[key]])
    );

}


/**
 * Returns a new object with the specified properties omitted.
 *
 * @param {Object} object
 * @param {string[]} keys
 *
 * @returns {Object}
 */
export function omit(object, keys) {

    return Object.fromEntries(
        Object.entries(object)
            .filter(
                ([key]) => !keys.includes(key)
            )
    );

}


/**
 * Returns a deep clone of the supplied value.
 *
 * Uses the native `structuredClone` implementation when available,
 * falling back to JSON serialization otherwise.
 *
 * @param {*} value
 *
 * @returns {*}
 */
export function deepClone(value) {

    if (typeof structuredClone === "function") {
        return structuredClone(value);
    }

    return JSON.parse(JSON.stringify(value));

}