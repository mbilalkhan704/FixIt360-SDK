/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Base SDK Error
 *
 * Every custom SDK error extends this class.
 * ============================================================================
 */

export class ApiError extends Error {

    static CODE = "API_ERROR";

    constructor(message, cause = null) {

        super(message);

        this.name = this.constructor.name;

        this.code = this.constructor.CODE;

        this.cause = cause;

        Error.captureStackTrace?.(
            this,
            this.constructor,
        );
    }
}

export default ApiError;