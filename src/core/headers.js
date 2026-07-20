/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Request Header Builder
 *
 * Responsible for constructing HTTP request headers.
 * Every API request should obtain its headers from this file.
 * ============================================================================
 */

/**
 * Builds standard request headers.
 *
 * @param {Object} options
 * @param {string|null} options.accessToken
 * @param {boolean} options.isMultipart
 *
 * @returns {Object}
 */
export function buildHeaders({
    accessToken = null,
    isMultipart = false,
} = {}) {

    const headers = {
        Accept: "application/json",
    };

    if (!isMultipart) {
        headers["Content-Type"] = "application/json";
    }

    if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
    }

    return headers;
}