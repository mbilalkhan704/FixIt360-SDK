/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Complaint API
 *
 * Handles complaint related operations.
 * ============================================================================
 */


/**
 * @import {ApiResponse} from "../../types/typedefs.js"
 * @import {
 *      ListComplaintsRequest,
 *      GetComplaintRequest,
 *      CreateComplaintRequest,
 *      UpdateComplaintRequest,
 *      DeleteComplaintRequest,
 *      ListMineRequest,
 *      ListByUserRequest
 * } from "../../types/typedefs.js"
 */


import ENDPOINTS from "../../config/endpoints.js";
import { get, post, patch, del } from "../../core/request.js";
import { buildAuthorizationHeaders } from "../../core/headers.js";
import ComplaintBuilders from "../../builders/complaints/complaintBuilders.js";
import { validateFiles, validatePrimaryIndex, validateRequiredFields } from "../../utils/validators.js";
import StorageApi from "../storage/storageApi.js";
import { MIN_COMPLAINT_PHOTOS, MAX_COMPLAINT_PHOTOS } from "../../config/constants.js";
import { InvalidRequestDataError } from "../../errors/RequestErrors.js";
import complaintBuilders from "../../builders/complaints/complaintBuilders.js";


/**
 * Retrieves all complaints.
 *
 * Authentication:
 *     Required
 *
 * @param {ListComplaintsRequest} data
 *
 * @returns {Promise<ApiResponse>}
 */
async function listComplaintsApi(data) {

    return get({

        endpoint: ENDPOINTS.COMPLAINTS.LIST,

    });

}


/**
 * Retrieves a complaint.
 *
 * Authentication:
 *     Required
 *
 * @param {GetComplaintRequest} data
 *
 * @returns {Promise<ApiResponse & { data: ComplaintData }>}
 */
async function getComplaintApi(data) {

    validateRequiredFields(data, [
        "complaint_id"
    ])

    return get({

        endpoint: ENDPOINTS.COMPLAINTS.DETAIL(
            data.complaint_id,
        ),

        headers: buildAuthorizationHeaders({
            accessToken: data.access_token,
        }),

    });

}


/**
 * Creates a complaint. Photos are uploaded and included atomically
 * in the same create request (backend requires >=1 photo at creation).
 *
 * @param {CreateComplaintRequest} data
 * @returns {Promise<ApiResponse & { data: ComplaintData }>}
 */
async function createComplaintApi(data) {

    validateFiles(data.files, {
        min: MIN_COMPLAINT_PHOTOS,
        max: MAX_COMPLAINT_PHOTOS,
    });

    const uploadResponse = await StorageApi.uploadComplaintImages({
        access_token: data.access_token,
        files: data.files,
        onProgress: data.onProgress,
    });

    return post({

        endpoint: ENDPOINTS.COMPLAINTS.CREATE,

        headers: buildAuthorizationHeaders({
            accessToken: data.access_token,
        }),

        payload: ComplaintBuilders.buildCreateComplaint(
            data,
            uploadResponse.data.complaint_image_keys,
        ),

    });

}


/**
 * Updates a complaint. Supports keeping, adding, replacing, and
 * (implicitly, via omission) deleting photos in one atomic request.
 *
 * @param {UpdateComplaintRequest} data
 * @returns {Promise<ApiResponse & { data: ComplaintData }>}
 */
async function updateComplaintApi(data) {

    validateRequiredFields(data, [
        "access_token",
        "complaint_id",
    ]);

    const hasNew =
        Array.isArray(data.newFiles) &&
        data.newFiles.length > 0;

    const hasReplacements =
        Array.isArray(data.replacements) &&
        data.replacements.length > 0;

    if (data.primaryNewFileIndex !== undefined) {
        validatePrimaryIndex(
            Array.isArray(data.newFiles) ? data.newFiles : [],
            data.primaryNewFileIndex
        );
    }

    const hasTextChanges =
        data.title !== undefined ||
        data.description !== undefined ||
        data.latitude !== undefined ||
        data.longitude !== undefined ||
        data.address !== undefined;

    const hasImageChanges =
        hasNew ||
        hasReplacements ||
        Array.isArray(data.keepPhotoIds) ||
        data.primaryPhotoId !== undefined ||
        data.primaryNewFileIndex !== undefined;

    if (!hasTextChanges && !hasImageChanges) {
        throw new TypeError(
            "At least one field must be updated."
        );
    }

    let newImageKeys = [];
    let replacementImageKeys = [];

    if (hasImageChanges) {

        const keptCount = Array.isArray(data.keepPhotoIds)
            ? data.keepPhotoIds.length
            : 0;

        const replacementCount = Array.isArray(data.replacements)
            ? data.replacements.length
            : 0;

        const newCount = Array.isArray(data.newFiles)
            ? data.newFiles.length
            : 0;

        const finalPhotoCount =
            keptCount +
            replacementCount +
            newCount;

        if (finalPhotoCount < 1) {
            throw new TypeError(
                "At least one photo is required."
            );
        }

        if (finalPhotoCount > MAX_COMPLAINT_PHOTOS) {
            throw new TypeError(
                `Maximum ${MAX_COMPLAINT_PHOTOS} photos allowed.`
            );
        }

        if (hasNew || hasReplacements) {

            const filesToUpload = [
                ...(hasNew ? data.newFiles : []),
                ...(hasReplacements
                    ? data.replacements.map(
                        (replacement) => replacement.file,
                    )
                    : []),
            ];

            validateFiles(filesToUpload, {
                min: 1,
                max: MAX_COMPLAINT_PHOTOS,
            });

            const uploadResponse =
                await StorageApi.uploadComplaintImages({
                    access_token: data.access_token,
                    files: filesToUpload,
                    onProgress: data.onProgress,
                });

            const uploadedKeys =
                uploadResponse.data.complaint_image_keys;

            newImageKeys =
                uploadedKeys.slice(0, newCount);

            replacementImageKeys =
                uploadedKeys.slice(newCount);
        }

    }

    return patch({

        endpoint: ENDPOINTS.COMPLAINTS.UPDATE(
            data.complaint_id,
        ),

        headers: buildAuthorizationHeaders({
            accessToken: data.access_token,
        }),

        payload: ComplaintBuilders.buildUpdateComplaint(
            data,
            {
                newImageKeys,
                replacementImageKeys,
            },
        ),

    });

}

/**
 * Deletes a complaint.
 *
 * Authentication:
 *     Required
 *
 * @param {DeleteComplaintRequest} data
 *
 * @returns {Promise<ApiResponse>}
 */
async function deleteComplaintApi(data) {

    validateRequiredFields(data, [
        "access_token",
        "complaint_id",
        "deletion_reason"
    ])

    return del({

        endpoint: ENDPOINTS.COMPLAINTS.DELETE(
            data.complaint_id,
        ),

        headers: buildAuthorizationHeaders({
            accessToken: data.access_token,
        }),

        payload: complaintBuilders.buildDeleteComplaint(data)

    });

}


/**
 * Retrieves complaints created by the authenticated user.
 *
 * Authentication:
 *     Required
 *
 * @param {ListMineRequest} data
 *
 * @returns {Promise<ApiResponse>}
 */
async function listMineApi(data) {

    return get({

        endpoint: ENDPOINTS.COMPLAINTS.MY_LIST,

        headers: buildAuthorizationHeaders({
            accessToken: data.access_token,
        }),

    });

}


/**
 * Retrieves complaints created by a specific user.
 *
 * Authentication:
 *     Required
 *
 * @param {ListByUserRequest} data
 *
 * @returns {Promise<ApiResponse>}
 */
async function listByUserApi(data) {

    validateRequiredFields(data, [
        "access_token",
        "user_id"
    ])

    return get({

        endpoint: ENDPOINTS.COMPLAINTS.USER_LIST(
            data.user_id,
        ),

        headers: buildAuthorizationHeaders({
            accessToken: data.access_token,
        }),

    });

}


export default {

    list: listComplaintsApi,

    listMine: listMineApi,

    listByUser: listByUserApi,

    get: getComplaintApi,

    create: createComplaintApi,

    update: updateComplaintApi,

    delete: deleteComplaintApi,

};