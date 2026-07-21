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
 * Parses a profile picture upload response.
 *
 * @param {Object} response
 *
 * @returns {Object}
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

            profile_picture_key:
                response.public_id,

        },

    };

}


/**
 * Parses multiple complaint image upload responses.
 *
 * @param {Array<Object>} responses
 *
 * @returns {Object}
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