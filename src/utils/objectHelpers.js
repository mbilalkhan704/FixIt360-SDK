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
 * Removes undefined values from an object.
 *
 * Null values are preserved because the backend may interpret them
 * differently from omitted fields.
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
 * Returns a new object containing only the specified keys.
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
 * Returns a new object without the specified keys.
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
 * Creates a deep clone of an object.
 *
 * Uses the native structuredClone when available.
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