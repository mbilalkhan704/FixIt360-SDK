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
 * Builds Cloudinary upload FormData.
 *
 * @param {Object} data
 * @param {File|Blob} data.file
 * @param {string} data.public_id
 * @param {string} data.api_key
 * @param {number|string} data.timestamp
 * @param {string} data.signature
 * @param {string} data.folder
 * @param {string} [data.context]
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

    formData.append(
        "context",
        data.context,
    );

    return formData;

}