/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Complaint Payload Builders
 *
 * Responsible for validating input and constructing payloads for
 * complaint related operations.
 * ============================================================================
 */

import {
    validateRequiredFields,
} from "../../utils/validators.js";

import {
    removeUndefinedFields,
} from "../../utils/objectHelpers.js";
import {
    IncompleteRequestDataError
} from "../../errors/RequestErrors.js"


/**
 * Builds the payload for creating a complaint.
 *
 * @param {Object} data
 *
 * @returns {Object}
 */
function buildCreateComplaint(data) {

    validateRequiredFields(data, [
        "title",
        "description",
        "category",
        "latitude",
        "longitude",
        "address",
    ]);

    return removeUndefinedFields({

        title: data.title,

        description: data.description,

        category: data.category,

        latitude: data.latitude,

        longitude: data.longitude,

        address: data.address,

    });

}


/**
 * Builds the payload for updating a complaint.
 *
 * @param {Object} data
 *
 * @returns {Object}
 */
function buildUpdateComplaint(data) {

    const payload = removeUndefinedFields({

        title: data.title,

        description: data.description,

        category: data.category,

        latitude: data.latitude,

        longitude: data.longitude,

        address: data.address,

    });

    if (Object.keys(payload).length === 0) {
        throw new IncompleteRequestDataError(
            "At least one complaint field is required"
        );
    }

    return payload;
}


/**
 * Builds an empty payload for deleting a complaint image.
 *
 * Image identity is provided through the URL path.
 */
function buildDeleteComplaint() {

    return {};

}


/**
 * Builds the payload for adding images.
 *
 * @param {Object} data
 *
 * @returns {Object}
 */
function buildAddImages(data) {

    validateRequiredFields(data, [
        "complaint_image_keys",
    ]);

    return {

        complaint_image_keys:
            data.complaint_image_keys,

    };

}


/**
 * Builds the payload for replacing a complaint image.
 *
 * @param {Object} data
 *
 * @returns {Object}
 */
function buildReplaceImage(data) {

    validateRequiredFields(data, [
        "complaint_image_key",
    ]);

    return {

        complaint_image_key:
            data.complaint_image_key,

    };

}


/**
 * Builds the payload for deleting a complaint image.
 *
 * Exists for architectural consistency.
 *
 * @returns {Object}
 */
function buildDeleteImage() {

    return {};

}


export default {

    buildCreateComplaint,

    buildUpdateComplaint,

    buildDeleteComplaint,

    buildAddImages,

    buildReplaceImage,

    buildDeleteImage,

};