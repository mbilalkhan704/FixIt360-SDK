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


/**
 * Parses a profile picture upload response.
 *
 * @param {Object} response
 *
 * @returns {Object}
 */
export function parseProfilePictureUploadResponse(response) {

    return {

        success: true,

        message: "Profile picture uploaded successfully.",

        data: {

            profile_picture_key:
                response.public_id,

            profile_picture_url:
                response.secure_url,

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

    return {

        success: true,

        message: "Complaint images uploaded successfully.",

        data: {

            complaint_images:

                responses.map((response) => ({

                    complaint_image_key:
                        response.public_id,

                    complaint_image_url:
                        response.secure_url,

                })),

        },

    };

}