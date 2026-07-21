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
 */
/**
 * @typedef {Object} ListComplaintsRequest
 */

/**
 * @typedef {Object} GetComplaintRequest
 * @property {string} access_token
 * @property {number|string} complaint_id
 */

/**
 * @typedef {Object} CreateComplaintRequest
 * @property {string} access_token
 * @property {string} title
 * @property {string} description
 * @property {number} latitude
 * @property {number} longitude
 * @property {string} category
 * @property {string} address
 * @property {Array<File|Blob>} files
 * @property {number} [primaryFileIndex] - index into files marking the primary photo; defaults to first if omitted
 * @property {function(number): void} [onProgress]
 */

/**
 * @typedef {Object} UpdateComplaintRequest
 * @property {string} access_token
 * @property {number|string} complaint_id
 * @property {string} [title]
 * @property {string} [description]
 * @property {number} [latitude]
 * @property {number} [longitude]
 * @property {string} [address]
 * @property {Array<number|string>} [keepPhotoIds] - existing photo IDs to keep unchanged; any existing photo omitted here (and not in replacements) is deleted
 * @property {Array<File|Blob>} [newFiles] - new photos to add
 * @property {Array<{photo_id: number|string, file: File|Blob}>} [replacements] - existing photos to replace with a new file
 * @property {number|string} [primaryPhotoId] - marks an existing kept or replaced photo as primary
 * @property {number} [primaryNewFileIndex] - marks a photo from newFiles (by index) as primary
 * @property {function(number): void} [onProgress]
 */

/**
 * @typedef {Object} DeleteComplaintRequest
 * @property {string} access_token
 * @property {number|string} complaint_id
 */

/**
 * @typedef {Object} ListMineRequest
 * @property {string} access_token
 */

/**
 * @typedef {Object} ListByUserRequest
 * @property {string} access_token
 * @property {number|string} user_id
 */


import ENDPOINTS from "../../config/endpoints.js";
import { get, post, patch, del } from "../../core/request.js";
import { buildAuthorizationHeaders } from "../../core/headers.js";
import ComplaintBuilders from "../../builders/complaints/complaintBuilders.js";
import { validateFiles } from "../../utils/validators.js";
import StorageApi from "../storage/storageApi.js";
import { MIN_COMPLAINT_PHOTOS, MAX_COMPLAINT_PHOTOS } from "../../config/constants.js";


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

    return get({

        endpoint: ENDPOINTS.COMPLAINTS.DETAIL(
            data.complaint_id,
        ),

        headers: buildAuthorizationHeaders(
            data.access_token,
        ),

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

        headers: buildAuthorizationHeaders(data.access_token),

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

    const hasNew = Array.isArray(data.newFiles) && data.newFiles.length > 0;
    const hasReplacements = Array.isArray(data.replacements) && data.replacements.length > 0;

    let newImageKeys = [];
    let replacementImageKeys = [];

    if (hasNew || hasReplacements) {

        const filesToUpload = [
            ...(hasNew ? data.newFiles : []),
            ...(hasReplacements ? data.replacements.map((r) => r.file) : []),
        ];

        validateFiles(filesToUpload, { min: 1, max: MAX_COMPLAINT_PHOTOS });

        const uploadResponse = await StorageApi.uploadComplaintImages({
            access_token: data.access_token,
            files: filesToUpload,
            onProgress: data.onProgress,
        });

        const uploadedKeys = uploadResponse.data.complaint_image_keys;
        const newCount = hasNew ? data.newFiles.length : 0;

        newImageKeys = uploadedKeys.slice(0, newCount);
        replacementImageKeys = uploadedKeys.slice(newCount);

    }

    return patch({

        endpoint: ENDPOINTS.COMPLAINTS.UPDATE(data.complaint_id),

        headers: buildAuthorizationHeaders(data.access_token),

        payload: ComplaintBuilders.buildUpdateComplaint(
            data,
            { newImageKeys, replacementImageKeys },
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

    return del({

        endpoint: ENDPOINTS.COMPLAINTS.DELETE(
            data.complaint_id,
        ),

        headers: buildAuthorizationHeaders(
            data.access_token,
        ),

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

        headers: buildAuthorizationHeaders(
            data.access_token,
        ),

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

    return get({

        endpoint: ENDPOINTS.COMPLAINTS.USER_LIST(
            data.user_id,
        ),

        headers: buildAuthorizationHeaders(
            data.access_token,
        ),

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