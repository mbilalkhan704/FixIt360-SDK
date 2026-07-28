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
 * @typedef {import('../../typedefs/common.js').ApiResponse} ApiResponse
 * @typedef {import('../../typedefs/common.js').PaginatedResult} PaginatedResult
 * @typedef {import('../../typedefs/common.js').OnUploadProgress} OnUploadProgress
 * @typedef {import('../../typedefs/complaints/complaint.js').ComplaintDetail} ComplaintDetail
 * @typedef {import('../../typedefs/complaints/complaint.js').ComplaintSummary} ComplaintSummary
 * @typedef {import('../../typedefs/complaints/complaint.js').CreateComplaintParams} CreateComplaintParams
 * @typedef {import('../../typedefs/complaints/complaint.js').GetComplaintParams} GetComplaintParams
 * @typedef {import('../../typedefs/complaints/complaint.js').UpdateComplaintParams} UpdateComplaintParams
 * @typedef {import('../../typedefs/complaints/complaint.js').DeleteComplaintParams} DeleteComplaintParams
 * @typedef {import('../../typedefs/complaints/complaint.js').ListComplaintsByUserParams} ListComplaintsByUserParams
 * @typedef {import('../../typedefs/complaints/complaint.js').ListMyComplaintsParams} ListMyComplaintsParams
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
 * List all public complaints (no authentication required).
 * @returns {Promise<ApiResponse<PaginatedResult<ComplaintSummary>>>}
 */
async function listComplaintsApi(data) {

    return get({
        endpoint: ENDPOINTS.COMPLAINTS.LIST,
    });

}


/**
 * List complaints filed by the authenticated user.
 * @param {ListMyComplaintsParams} params
 * @returns {Promise<ApiResponse<PaginatedResult<ComplaintSummary>>>}
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
 * List complaints filed by a specific user.
 * @param {ListComplaintsByUserParams} params
 * @returns {Promise<ApiResponse<PaginatedResult<ComplaintSummary>>>}
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


/**
 * Retrieve a single complaint by ID.
 * @param {GetComplaintParams} params
 * @returns {Promise<ApiResponse<ComplaintDetail|null>>}
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
 * Create a new complaint with attached photos.
 * @param {CreateComplaintParams} params
 * @returns {Promise<ApiResponse<ComplaintDetail>>}
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
 * Update a complaint's fields and/or its set of photos (add, replace, keep).
 * @param {UpdateComplaintParams} params
 * @returns {Promise<ApiResponse<ComplaintDetail>>}
 */
async function updateComplaintApi(data) {

    validateRequiredFields(data, [
        "access_token",
        "complaint_id",
    ]);

    const hasNew = Array.isArray(data.newFiles) && data.newFiles.length > 0;
    const hasReplacements = Array.isArray(data.replacements) && data.replacements.length > 0;

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
        throw new InvalidRequestDataError(
            "At least one field must be updated."
        );
    }

    let newImageKeys = [];
    let replacementImageKeys = [];

    if (hasImageChanges) {

        const keptCount = Array.isArray(data.keepPhotoIds) ? data.keepPhotoIds.length : 0;
        const replacementCount = Array.isArray(data.replacements) ? data.replacements.length : 0;
        const newCount = Array.isArray(data.newFiles) ? data.newFiles.length : 0;
        const finalPhotoCount = keptCount + replacementCount + newCount;

        if (finalPhotoCount < 1) {
            throw new InvalidRequestDataError(
                "At least one photo is required."
            );
        }

        if (finalPhotoCount > MAX_COMPLAINT_PHOTOS) {
            throw new InvalidRequestDataError(
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

            const uploadedKeys = uploadResponse.data.complaint_image_keys;
            newImageKeys = uploadedKeys.slice(0, newCount);
            replacementImageKeys = uploadedKeys.slice(newCount);
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
 * Delete a complaint.
 * @param {DeleteComplaintParams} params
 * @returns {Promise<ApiResponse<null>>}
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


export default {
    list: listComplaintsApi,
    listMine: listMineApi,
    listByUser: listByUserApi,
    get: getComplaintApi,
    create: createComplaintApi,
    update: updateComplaintApi,
    delete: deleteComplaintApi,
};