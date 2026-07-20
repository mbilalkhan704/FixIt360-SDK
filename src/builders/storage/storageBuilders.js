/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Storage Payload Builders
 *
 * Responsible for validating input and constructing payloads for
 * storage related operations.
 * ============================================================================
 */

import {
    validateRequiredFields,
    validateFile,
    validateFiles,
    validateCallback,
} from "../../utils/validators.js";


/**
 * Builds the payload for uploading a profile picture.
 *
 * @param {Object} data
 *
 * @returns {Object}
 */
function buildProfilePictureUpload(data) {

    validateRequiredFields(data, [
        "access_token",
        "file",
    ]);

    validateFile(data.file);

    validateCallback(data.onProgress);

    return {

        access_token: data.access_token,

        file: data.file,

        onProgress: data.onProgress,

    };

}


/**
 * Builds the payload for uploading complaint images.
 *
 * @param {Object} data
 *
 * @returns {Object}
 */
function buildComplaintImagesUpload(data) {

    validateRequiredFields(data, [
        "access_token",
        "files",
    ]);

    validateFiles(data.files);

    validateCallback(data.onProgress);

    return {

        access_token: data.access_token,

        files: data.files,

        onProgress: data.onProgress,

    };

}


export default {

    buildProfilePictureUpload,

    buildComplaintImagesUpload,

};