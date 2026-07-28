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
 * @typedef {import('../../typedefs/common.js').ApiResponse} ApiResponse
 * @typedef {import('../../typedefs/common.js').ValidationErrors} ValidationErrors
 * @typedef {import('../../typedefs/common.js').OnUploadProgress} OnUploadProgress
 * @typedef {import('../../typedefs/complaints/complaintImages.js').AddComplaintImagesParams} AddComplaintImagesParams
 * @typedef {import('../../typedefs/complaints/complaintImages.js').AddComplaintImagesData} AddComplaintImagesData
 * @typedef {import('../../typedefs/complaints/complaintImages.js').DeleteComplaintImageParams} DeleteComplaintImageParams
 * @typedef {import('../../typedefs/complaints/complaintImages.js').DeleteComplaintImageData} DeleteComplaintImageData
 * @typedef {import('../../typedefs/complaints/complaintImages.js').ReplaceComplaintImageParams} ReplaceComplaintImageParams
 * @typedef {import('../../typedefs/complaints/complaintImages.js').ReplaceComplaintImageData} ReplaceComplaintImageData
 */


import ENDPOINTS from "../../config/endpoints.js";
import { post, patch, del } from "../../core/request.js";
import { buildAuthorizationHeaders } from "../../core/headers.js";
import StorageApi from "../storage/storageApi.js";
import ComplaintBuilders from "../../builders/complaints/complaintBuilders.js";
import { validateFile, validateFiles, validatePrimaryIndex, validateRequiredFields } from "../../utils/validators.js";
import { MIN_COMPLAINT_PHOTOS, MAX_COMPLAINT_PHOTOS } from "../../config/constants.js";


/**
 * Add one or more photos to an existing complaint. Fails if the complaint's
 * 5-photo limit would be exceeded.
 * @param {AddComplaintImagesParams} params
 * @returns {Promise<ApiResponse<AddComplaintImagesData>|ApiResponse<ValidationErrors>>}
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
 * Replace an existing complaint photo in place with a new file.
 * @param {ReplaceComplaintImageParams} params
 * @returns {Promise<ApiResponse<ReplaceComplaintImageData>>}
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
 * Delete a single photo from a complaint.
 * @param {DeleteComplaintImageParams} params
 * @returns {Promise<ApiResponse<DeleteComplaintImageData>>}
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