/**
 * ============================================================================
 * FixIt360 SDK — Login Example
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

        console.log("Login successful:", loginResponse.data);

        const { access, refresh } = loginResponse.data;

        const profileResponse = await sdk.accounts.profile.getProfile({
            access_token: access,
        });

        console.log("Profile:", profileResponse.data);

        const refreshResponse = await sdk.accounts.auth.refreshToken({
            refresh,
        });

        console.log("Refreshed tokens:", refreshResponse.data);

        await sdk.accounts.auth.logout({
            access_token: access,
            refresh,
        });

        console.log("Logged out successfully.");

    } catch (error) {

        console.error(
            `Login flow failed [${error.code ?? "UNKNOWN"}]:`,
            error.message,
        );

    }

}

run();