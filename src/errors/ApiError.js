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
        super(message, cause ? { cause } : undefined);

        this.name = this.constructor.name;
        this.code = this.constructor.CODE;

        Error.captureStackTrace?.(this, this.constructor);
    }

    toJSON() {

        const json = {
            name: this.name,
            code: this.code,
            message: this.message,
        };

        if (this.cause != null) {
            json.cause = this.cause;
        }

        return json;

    }
}

export default ApiError;