/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Request Errors
 *
 * Errors related to SDK initialization, request execution,
 * network connectivity, and invalid client usage.
 * ============================================================================
 */

import ApiError from "./ApiError.js";


/**
 * SDK has not been initialized.
 */
export class SDKNotInitializedError extends ApiError {

    static CODE = "SDK_NOT_INITIALIZED";

    static DEFAULT_MESSAGE =
        "SDK has not been initialized. Call initializeSDK() before making API requests.";

    constructor(message = null, cause = null) {

        super(
            message ??
            SDKNotInitializedError.DEFAULT_MESSAGE,
            cause,
        );
    }

}


/**
 * Required request data is missing.
 */
export class InvalidRequestDataError extends ApiError {

    static CODE = "INVALID_REQUEST_DATA";

    static DEFAULT_MESSAGE =
        "Request data is invalid.";

    constructor(
        message = InvalidRequestDataError.DEFAULT_MESSAGE,
        fields = null,
    ) {

        super(message);

        this.fields = Array.isArray(fields)
            ? fields
            : fields
                ? [fields]
                : [];
    }

    static unsupportedOperation(message) {
        return new InvalidRequestDataError(message);
    }

    static missingFields(fields) {

        const list = Array.isArray(fields)
            ? fields
            : [fields];

        return new InvalidRequestDataError(
            list.length === 1
                ? `Missing required field: "${list[0]}".`
                : `Missing required fields: ${list.join(", ")}.`,
            list,
        );

    }

    static atLeastOneRequired(subject = "field") {

        return new InvalidRequestDataError(
            `At least one ${subject} is required.`,
        );

    }

}


/**
 * Invalid SDK configuration.
 */
export class InvalidSDKConfigurationError extends ApiError {

    static CODE = "INVALID_SDK_CONFIGURATION";

    static DEFAULT_MESSAGE =
        "The SDK configuration is invalid.";

    constructor(message = null, cause = null) {

        super(
            message ??
            InvalidSDKConfigurationError.DEFAULT_MESSAGE,
            cause,
        );
    }
}


/**
 * Network connection failed.
 */
export class NetworkError extends ApiError {

    static CODE = "NETWORK_ERROR";

    static DEFAULT_MESSAGE =
        "Unable to connect to the server. Please check your internet connection.";

    constructor(message = null, cause = null) {

        super(
            message ??
            NetworkError.DEFAULT_MESSAGE,
            cause,
        );
    }
}


/**
 * Request timed out.
 */
export class RequestTimeoutError extends ApiError {

    static CODE = "REQUEST_TIMEOUT";

    static DEFAULT_MESSAGE =
        "The request timed out.";

    constructor(message = null, cause = null) {

        super(
            message ??
            RequestTimeoutError.DEFAULT_MESSAGE,
            cause,
        );
    }
}


/**
 * Unexpected server response.
 */
export class InvalidResponseError extends ApiError {

    static CODE = "INVALID_RESPONSE";

    static DEFAULT_MESSAGE =
        "The server returned an unexpected response.";

    constructor(message = null, cause = null) {

        super(
            message ??
            InvalidResponseError.DEFAULT_MESSAGE,
            cause,
        );
    }
}


/**
 * Internal server error.
 */
export class ServerError extends ApiError {

    static CODE = "SERVER_ERROR";

    static DEFAULT_MESSAGE = "Internal server error";

    constructor(message = null, cause = null) {

        super(
            message ??
            ServerError.DEFAULT_MESSAGE,
            cause,
        );
    }
}