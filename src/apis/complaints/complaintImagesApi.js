/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Complaint Images API
 *
 * Handles complaint image operations.
 * ============================================================================
 */


/**
 * @import {ApiResponse} from "../../types/typedefs.js"
 * @import {
 *      AddComplaintImagesRequest,
 *      ReplaceComplaintImageRequest,
 *      DeleteComplaintImageRequest
 * } from "../../types/typedefs.js"
 */


import ENDPOINTS from "../../config/endpoints.js";
import { post, patch, del } from "../../core/request.js";
import { buildAuthorizationHeaders } from "../../core/headers.js";
import StorageApi from "../storage/storageApi.js";
import ComplaintBuilders from "../../builders/complaints/complaintBuilders.js";
import { validateFile, validateFiles, validatePrimaryIndex, validateRequiredFields } from "../../utils/validators.js";
import { MIN_COMPLAINT_PHOTOS, MAX_COMPLAINT_PHOTOS } from "../../config/constants.js";


/**
 * Adds images to a complaint.
 *
 * Authentication:
 *     Required
 *
 * @param {AddComplaintImagesRequest} data
 *
 * @returns {Promise<ApiResponse>}
 */
async function addImagesApi(data) {

    validateRequiredFields(data, [
        "access_token",
        "complaint_id"
    ]);

    validateFiles(data.files, {
        min: MIN_COMPLAINT_PHOTOS,
        max: MAX_COMPLAINT_PHOTOS,
    });

    if (data.primaryNewFileIndex !== undefined) {
        validatePrimaryIndex(
            Array.isArray(data.files) ? data.files : [],
            data.primaryNewFileIndex
        );
    }

    const uploadResponse = await StorageApi.uploadComplaintImages({
        access_token: data.access_token,
        files: data.files,
        onProgress: data.onProgress,
    });

    return post({
        endpoint: ENDPOINTS.COMPLAINTS.ADD_IMAGES(
            data.complaint_id
        ),
        headers: buildAuthorizationHeaders({
            accessToken: data.access_token,
        }),
        payload: ComplaintBuilders.buildAddImages({
            image_keys: uploadResponse.data.complaint_image_keys,
            primary_index: data.primaryNewFileIndex,
        }),
    });

}


/**
 * Replaces a complaint image.
 *
 * Authentication:
 *     Required
 *
 * @param {ReplaceComplaintImageRequest} data
 *
 * @returns {Promise<ApiResponse>}
 */
async function replaceImageApi(data) {

    validateRequiredFields(data, [
        "access_token",
        "complaint_id",
        "image_id"
    ])

    validateFile(data.file);

    const uploadResponse = await StorageApi.uploadComplaintImages({
        access_token: data.access_token,
        files: [data.file],
        onProgress: data.onProgress,
    });

    return patch({
        endpoint: ENDPOINTS.COMPLAINTS.REPLACE_IMAGE(
            data.complaint_id,
            data.image_id
        ),
        headers: buildAuthorizationHeaders({
            accessToken: data.access_token,
        }),
        payload: ComplaintBuilders.buildReplaceImage({
            new_image_key: uploadResponse.data.complaint_image_keys[0],
        }),
    });

}


/**
 * Deletes a complaint image.
 *
 * Authentication:
 *     Required
 *
 * @param {DeleteComplaintImageRequest} data
 *
 * @returns {Promise<ApiResponse>}
 */
async function deleteImageApi(data) {

    validateRequiredFields(data, [
        "access_token",
        "complaint_id",
        "image_id"
    ])

    return del({
        endpoint: ENDPOINTS.COMPLAINTS.DELETE_IMAGE(
            data.complaint_id,
            data.image_id,
        ),
        headers: buildAuthorizationHeaders({
            accessToken: data.access_token,
        }),
    });

}


export default {
    add: addImagesApi,
    replace: replaceImageApi,
    delete: deleteImageApi,
};