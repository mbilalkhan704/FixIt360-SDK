/**
 * ============================================================================
 * FixIt360 SDK
 * ----------------------------------------------------------------------------
 * Public SDK Entry Point
 *
 * Exposes all public SDK modules.
 * ============================================================================
 */

import {
    initializeSDK,
} from "./config/config.js";

import AccountsApi from "./apis/accounts/index.js";
import ComplaintsApi from "./apis/complaints/index.js";
import VolunteerApi from "./apis/volunteer/index.js";
import AdminApi from "./apis/admin/index.js";


class FixIt360SDK {

    /**
     * Creates a new SDK instance.
     *
     * @param {Object} config
     */
    constructor(config = {}) {

        initializeSDK(config);

        this.accounts = AccountsApi;

        this.complaints = ComplaintsApi;

        this.volunteer = VolunteerApi;

        this.admin = AdminApi;

    }

}


export default FixIt360SDK;