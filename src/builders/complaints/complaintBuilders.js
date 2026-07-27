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


import { validateRequiredFields } from "../../utils/validators.js";
import { removeUndefinedFields } from "../../utils/objectHelpers.js";
import { InvalidRequestDataError } from "../../errors/RequestErrors.js"


/**
 * Builds the request payload for creating a complaint.
 *
 * Validates the required complaint fields and constructs the
 * image payload from the uploaded image keys, marking the
 * primary image when specified.
 *
 * @param {Object} data
 * @param {string[]} imageKeys
 *
 * @returns {Object}
 *
 * @throws {InvalidRequestDataError}
 */
function buildCreateComplaint(data, imageKeys) {

    validateRequiredFields(data, [
        "title",
        "description",
        "category",
        "latitude",
        "longitude",
        "address",
    ]);

    if (!Array.isArray(imageKeys) || imageKeys.length === 0) {
        throw InvalidRequestDataError.atLeastOneRequired("complaint image");
    }

    const images = imageKeys.map((key, index) => {
        const image = { new_image_key: key };
        if (data.primaryFileIndex === index) {
            image.is_primary = true;
        }
        return image;
    });

    return removeUndefinedFields({
        title: data.title,
        description: data.description,
        category: data.category,
        latitude: data.latitude,
        longitude: data.longitude,
        address: data.address,
        images,
    });

}


/**
 * Builds the request payload for updating a complaint.
 *
 * Constructs the `images` action array from the supplied
 * image operations, mirroring the backend's final-desired-state
 * contract. Existing images omitted from both `keepPhotoIds`
 * and `replacements` are deleted by the backend.
 *
 * @param {Object} data
 * @param {Object} [options]
 * @param {string[]} [options.newImageKeys]
 * @param {string[]} [options.replacementImageKeys]
 *
 * @returns {Object}
 *
 * @throws {InvalidRequestDataError}
 */
function buildUpdateComplaint(data, { newImageKeys = [], replacementImageKeys = [] } = {}) {

    const textPayload = removeUndefinedFields({
        title: data.title,
        description: data.description,
        latitude: data.latitude,
        longitude: data.longitude,
        address: data.address,
    });

    const hasKeep = Array.isArray(data.keepPhotoIds) && data.keepPhotoIds.length > 0;
    const hasReplacements = Array.isArray(data.replacements) && data.replacements.length > 0;
    const hasNew = newImageKeys.length > 0;
    const hasImageChanges = hasKeep || hasReplacements || hasNew;
    const hasTextChanges = Object.keys(textPayload).length > 0;

    if (!hasTextChanges && !hasImageChanges) {
        throw InvalidRequestDataError.atLeastOneRequired("complaint field");
    }

    const payload = { ...textPayload };

    if (hasImageChanges) {

        const images = [];

        if (hasKeep) {
            data.keepPhotoIds.forEach((photoId) => images.push({ photo_id: photoId }));
        }

        if (hasReplacements) {
            data.replacements.forEach((replacement, index) => {
                images.push({
                    photo_id: replacement.photo_id,
                    new_image_key: replacementImageKeys[index],
                });
            });
        }

        const newItemsStartIndex = images.length;

        if (hasNew) {
            newImageKeys.forEach((key) => images.push({ new_image_key: key }));
        }

        if (data.primaryPhotoId !== undefined) {
            const target = images.find((img) => img.photo_id === data.primaryPhotoId);
            if (target) target.is_primary = true;
        } else if (data.primaryNewFileIndex !== undefined && hasNew) {
            const target = images[newItemsStartIndex + data.primaryNewFileIndex];
            if (target) target.is_primary = true;
        }

        payload.images = images;

    }

    return payload;

}


function buildDeleteComplaint(data) {

    return {
        deletion_reason: data.deletion_reason
    };

}


function buildAddImages(data) {

    validateRequiredFields(data, [
        "image_keys",
    ]);

    const images = data.image_keys.map((key, index) => {
        const image = { new_image_key: key };
        if (data.primary_index === index) {
            image.is_primary = true;
        }
        return image;
    });

    return { images };

}


function buildReplaceImage(data) {

    validateRequiredFields(data, [
        "new_image_key",
    ]);

    return {
        new_image_key: data.new_image_key,
    };

}


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