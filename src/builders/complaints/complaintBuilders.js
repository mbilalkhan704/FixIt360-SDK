import {
    validateRequiredFields,
} from "../../utils/validators.js";

import {
    removeUndefinedFields,
} from "../../utils/objectHelpers.js";
import {
    InvalidRequestDataError
} from "../../errors/RequestErrors.js"


function buildCreateComplaint(data, imageKeys) {

    validateRequiredFields(data, [
        "title", "description", "category", "latitude", "longitude", "address",
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
 * Builds the payload for updating a complaint. Assembles the `images`
 * action array from keepPhotoIds / replacements / newFiles, mirroring
 * the backend's final-desired-state contract. Omitting an existing
 * photo_id (i.e. not listing it in keepPhotoIds or replacements)
 * deletes it server-side.
 * @param {Object} data
 * @param {Array<string>} [imageKeys]
 *
 * @returns {Object}
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


function buildDeleteComplaint() {
    return {};
}


function buildAddImages(data) {

    validateRequiredFields(data, ["image_keys"]);

    const images = data.image_keys.map((key, index) => {
        const image = { new_image_key: key };
        if (data.primary_index === index) {
            image.is_primary = true;
        }
        return image;
    });

    return { images };

}


/**
 * Builds the payload for replacing a complaint image.
 * Field name matches backend PhotoReplaceSerializer (new_image_key).
 *
 * @param {Object} data
 *
 * @returns {Object}
 */
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