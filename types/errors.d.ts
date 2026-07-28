import type { ErrorCode } from "./common";

export declare class ApiError extends Error {
    static readonly CODE: ErrorCode;
    readonly name: string;
    readonly code: ErrorCode;
    readonly cause?: unknown;
    constructor(message: string, cause?: unknown);
    toJSON(): { name: string; code: ErrorCode; message: string; cause?: unknown };
}

export declare class SDKNotInitializedError extends ApiError {
    constructor(message?: string | null, cause?: unknown);
}

export declare class InvalidRequestDataError extends ApiError {
    readonly fields: string[];
    constructor(message?: string, fields?: string | string[] | null);
    static unsupportedOperation(message: string): InvalidRequestDataError;
    static missingFields(fields: string | string[]): InvalidRequestDataError;
    static atLeastOneRequired(subject?: string): InvalidRequestDataError;
}

export declare class InvalidSDKConfigurationError extends ApiError {
    constructor(message?: string | null, cause?: unknown);
}

export declare class NetworkError extends ApiError {
    constructor(message?: string | null, cause?: unknown);
}

export declare class RequestTimeoutError extends ApiError {
    constructor(message?: string | null, cause?: unknown);
}

export declare class InvalidResponseError extends ApiError {
    constructor(message?: string | null, cause?: unknown);
}

export declare class ServerError extends ApiError {
    constructor(message?: string | null, cause?: unknown);
}