/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Cloudinary FormData Builder
 *
 * Builds the multipart FormData required by Cloudinary uploads.
 *
 * Internal SDK use only.
 * ============================================================================
 */


/**
 * @typedef {Object} CloudinaryUploadData
 * @property {File|Blob} file
 * @property {string} public_id
 * @property {string} api_key
 * @property {number|string} timestamp
 * @property {string} signature
 * @property {string} folder
 * @property {string} [context]
 */


/**
 * Builds the multipart `FormData` payload required for a
 * Cloudinary upload.
 *
 * @param {CloudinaryUploadData} data
 *
 * @returns {FormData}
 */
export default function buildFormData(data) {

    const formData = new FormData();

    formData.append(
        "file",
        data.file,
    );

    formData.append(
        "public_id",
        data.public_id,
    );

    formData.append(
        "api_key",
        data.api_key,
    );

    formData.append(
        "timestamp",
        data.timestamp,
    );

    formData.append(
        "signature",
        data.signature,
    );

    formData.append(
        "folder",
        data.folder,
    );

    if (data.context !== undefined && data.context !== null) {
        formData.append(
            "context",
            data.context,
        );
    }

    return formData;

}