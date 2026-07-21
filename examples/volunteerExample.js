/**
 * ============================================================================
 * FixIt360 SDK — Volunteer Example
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

        const statusResponse = await sdk.volunteer.getVolunteerStatus({
            access_token,
        });

        console.log("Volunteer status:", statusResponse.data);

        const applyResponse = await sdk.volunteer.apply({
            access_token,
            availability: [
                { day: "monday", start_time: "09:00", end_time: "13:00" },
                { day: "wednesday", start_time: "14:00", end_time: "18:00" },
            ],
        });

        console.log("Application submitted:", applyResponse.data);

        const profileResponse = await sdk.volunteer.getProfile({
            access_token,
        });

        console.log("Volunteer profile:", profileResponse.data);

        const updateResponse = await sdk.volunteer.updateAvailability({
            access_token,
            availability: [
                { day: "friday", start_time: "10:00", end_time: "16:00" },
            ],
        });

        console.log("Availability updated:", updateResponse.data);

    } catch (error) {

        console.error(
            `Volunteer flow failed [${error.code ?? "UNKNOWN"}]:`,
            error.message,
        );

    }

}

run();