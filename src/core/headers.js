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
 * @typedef {Object} AuthorizationHeaders
 * @property {string} Accept
 * @property {string} [Content-Type]
 * @property {string} [Authorization]
 */


/**
 * Builds the standard HTTP request headers.
 *
 * Adds the `Authorization` header when an access token is
 * provided. Omits the `Content-Type` header for multipart
 * requests so it can be set automatically by the HTTP client.
 *
 * @param {Object} [options]
 * @param {string|null} [options.accessToken]
 * @param {boolean} [options.isMultipart=false]
 *
 * @returns {AuthorizationHeaders}
 */
export function buildAuthorizationHeaders({ accessToken = null, isMultipart = false, } = {}) {

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