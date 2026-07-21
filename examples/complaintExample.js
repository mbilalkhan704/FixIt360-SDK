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
            onProgress: (percent) => {
                console.log(`Uploading images: ${percent}%`);
            },
        });

        console.log("Complaint created:", createResponse.data);

        const complaint_id = createResponse.data.id;

        const listMineResponse = await sdk.complaints.listMine({
            access_token,
        });

        console.log("My complaints:", listMineResponse.data);

        const updateResponse = await sdk.complaints.update({
            access_token,
            complaint_id,
            description: "Updated: pothole has grown larger since last week.",
        });

        console.log("Complaint updated:", updateResponse.data);

        // Add an image to an existing complaint.
        const newFile = files[0];

        if (newFile) {

            const addImagesResponse = await sdk.complaints.images.add({
                access_token,
                complaint_id,
                files: [newFile],
            });

            console.log("Image added:", addImagesResponse.data);

        }

    } catch (error) {

        console.error(
            `Complaint flow failed [${error.code ?? "UNKNOWN"}]:`,
            error.message,
        );

    }

}

run();