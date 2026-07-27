/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Cloudinary Upload Response Parser
 *
 * Converts Cloudinary responses into SDK response objects.
 *
 * Internal SDK use only.
 * ============================================================================
 */


import { InvalidResponseError } from "../../errors/RequestErrors.js";


/**
 * @typedef {Object} ProfilePictureUploadResponse
 * @property {boolean} success
 * @property {string} message
 * @property {{profile_picture_key: string}} data
 */

/**
 * @typedef {Object} ComplaintImagesUploadResponse
 * @property {boolean} success
 * @property {string} message
 * @property {{complaint_image_keys: string[]}} data
 */


/**
 * Parses a Cloudinary profile picture upload response into
 * the SDK's standard response format.
 *
 * @param {Object} response
 *
 * @returns {ProfilePictureUploadResponse}
 *
 * @throws {InvalidResponseError}
 */
export function parseProfilePictureUploadResponse(response) {

    if (!response || !response.public_id) {
        throw new InvalidResponseError(
            "Cloudinary response is missing public_id."
        );
    }

    return {
        success: true,
        message: "Profile picture uploaded successfully.",
        data: {
            profile_picture_key: response.public_id,
        },
    };

}


/**
 * Parses Cloudinary complaint image upload responses into
 * the SDK's standard response format.
 *
 * @param {Object[]} responses
 *
 * @returns {ComplaintImagesUploadResponse}
 *
 * @throws {InvalidResponseError}
 */
export function parseComplaintImagesUploadResponse(responses) {

    if (!Array.isArray(responses) || responses.length === 0) {
        throw new InvalidResponseError(
            "Cloudinary response array is missing or empty."
        );
    }

    const complaint_image_keys = responses.map((response) => {

        if (!response || !response.public_id) {
            throw new InvalidResponseError(
                "Cloudinary response is missing public_id."
            );
        }

        return response.public_id;

    });

    return {
        success: true,
        message: "Complaint images uploaded successfully.",
        data: {
            complaint_image_keys,
        },
    };

}