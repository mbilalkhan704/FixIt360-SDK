/**
 * ============================================================================
 * FixIt360 SDK — Complaint Example
 * ============================================================================
 */

import FixIt360SDK from "../src/index.js";

const sdk = new FixIt360SDK({
    baseURL: "http://127.0.0.1:8000/",
});

async function run() {

    try {

        const loginResponse = await sdk.accounts.auth.login({
            email: "bilal@example.com",
            password: "Password@123",
        });

        const access_token = loginResponse.data.access;

        // Assumes `files` comes from a file input in a browser environment.
        const files = []; // e.g. Array.from(fileInput.files)

        const createResponse = await sdk.complaints.create({
            access_token,
            title: "Pothole on Main Road",
            description: "Large pothole causing traffic issues near the market.",
            category: "pothole",
            latitude: 24.8607,
            longitude: 67.0011,
            address: "Main Road, Karachi",
            files,
            primaryFileIndex: 0, // first uploaded file becomes the primary photo
            onProgress: (percent) => {
                console.log(`Uploading images: ${percent}%`);
            },
        });

        console.log("Complaint created:", createResponse.data);

        const complaint_id = createResponse.data.id;
        const photos = createResponse.data.photos_detail; // [{ id, image_url, uploaded_at }, ...]

        const listMineResponse = await sdk.complaints.listMine({
            access_token,
        });

        console.log("My complaints:", listMineResponse.data);

        // Text-only update — no photo changes, so existing photos are left untouched.
        const updateResponse = await sdk.complaints.update({
            access_token,
            complaint_id,
            description: "Updated: pothole has grown larger since last week.",
        });

        console.log("Complaint updated:", updateResponse.data);

        // Combined update — keep one existing photo, add a new one, and
        // mark the new one as primary, all in a single atomic request.
        // Any existing photo whose id isn't listed in keepPhotoIds (and
        // isn't a replacement target) is deleted server-side.
        const secondFile = files[0];

        if (photos.length > 0 && secondFile) {

            const combinedUpdateResponse = await sdk.complaints.update({
                access_token,
                complaint_id,
                keepPhotoIds: [photos[0].id],
                newFiles: [secondFile],
                primaryNewFileIndex: 0,
            });

            console.log("Complaint photos updated:", combinedUpdateResponse.data);

        }

        // Add another image to the complaint (standalone, image-only).
        const newFile = files[1];

        if (newFile) {

            const addImagesResponse = await sdk.complaints.images.add({
                access_token,
                complaint_id,
                files: [newFile],
            });

            console.log("Image added:", addImagesResponse.data);

        }

        // Replace one specific existing photo with a new file.
        const replacementFile = files[2];

        if (photos.length > 0 && replacementFile) {

            const replaceImageResponse = await sdk.complaints.images.replace({
                access_token,
                complaint_id,
                image_id: photos[0].id,
                file: replacementFile,
            });

            console.log("Image replaced:", replaceImageResponse.data);

        }

        // Delete one specific photo (fails if it's the complaint's only photo).
        if (photos.length > 1) {

            const deleteImageResponse = await sdk.complaints.images.delete({
                access_token,
                complaint_id,
                image_id: photos[1].id,
            });

            console.log("Image deleted:", deleteImageResponse.data);

        }

    } catch (error) {

        console.error(
            `Complaint flow failed [${error.code ?? "UNKNOWN"}]:`,
            error.message,
        );

    }

}

run();