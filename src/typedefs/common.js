/**
 * @file Common/shared type definitions used across the FixIt360 SDK.
 */

/**
 * Standard response envelope returned by every SDK call.
 * @template T
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Whether the request succeeded.
 * @property {string} message - Human-readable status/result message.
 * @property {T} data - Payload for the endpoint, or `null` when there is none.
 */

/**
 * Django REST Framework-style paginated list envelope.
 * @template T
 * @typedef {Object} PaginatedResult
 * @property {number} count - Total number of items across all pages.
 * @property {?string} next - URL of the next page, or `null` if there isn't one.
 * @property {?string} previous - URL of the previous page, or `null` if there isn't one.
 * @property {T[]} results - Items on the current page.
 */

/**
 * Field-level validation error map, as returned by DRF serializers on failed requests.
 * Keys are field names; values are either an array of error strings or a nested object
 * (e.g. per-item errors inside an array field like `availabilities`).
 * @typedef {Object.<string, (string[]|Object)>} ValidationErrors
 */

/**
 * Progress callback invoked while a request uploads one or more files.
 * @callback OnUploadProgress
 * @param {Object} progress
 * @param {number} progress.progress - Overall percentage complete (0-100).
 * @param {number} progress.currentFile - Index (1-based) of the file currently uploading.
 * @param {number} progress.totalFiles - Total number of files being uploaded.
 * @param {number} progress.loadedBytes - Bytes uploaded so far (may briefly exceed totalBytes).
 * @param {number} progress.totalBytes - Total bytes to upload.
 * @returns {void}
 */

/**
 * Days of the week accepted by availability endpoints.
 * @typedef {("monday"|"tuesday"|"wednesday"|"thursday"|"friday"|"saturday"|"sunday")} Weekday
 */

/**
 * A single volunteer availability slot.
 * @typedef {Object} AvailabilitySlot
 * @property {number} [id] - Slot ID. Present when returned from the server, omitted on input.
 * @property {Weekday} day - Day of the week.
 * @property {string} start_time - Start time. `"HH:mm"` on input, `"HH:mm:ss"` in responses.
 * @property {string} end_time - End time. `"HH:mm"` on input, `"HH:mm:ss"` in responses.
 */

/**
 * SDK initialization config.
 * @typedef {Object} SDKConfig
 * @property {string} baseURL - Base URL of the FixIt360 API.
 * @property {number} timeout - Request timeout in milliseconds.
 * @property {boolean} withCredentials - Whether requests send cookies/credentials.
 */

/**
 * Machine-readable error code carried by every thrown SDK error (`error.code`).
 * @typedef {("API_ERROR"|"SDK_NOT_INITIALIZED"|"INVALID_REQUEST_DATA"|"INVALID_SDK_CONFIGURATION"|"NETWORK_ERROR"|"REQUEST_TIMEOUT"|"INVALID_RESPONSE"|"SERVER_ERROR")} ErrorCode
 */

export { };
