# FixIt360 SDK

This SDK is still being actively developed alongside the FixIt360 backend as part of an ongoing Final Year Project. Endpoints and payload shapes may still change, so it isn't recommended for use outside the FixIt360 ecosystem yet.

A JavaScript SDK for the FixIt360 backend, a civic complaint management platform. It covers authentication (including Google OAuth), complaints, volunteer operations, admin workflows, and Cloudinary file uploads, all through a simple promise-based API.

## Features

Accounts handle registration, login (email/password or Google OAuth), token refresh, password reset and change, and profile management.

Complaints support creating, updating, deleting, and listing, along with image management and geolocation data.

Volunteers can apply, manage their availability, resign, and request reactivation.

Admins can review volunteer applications, manage active volunteers, and handle reactivation requests, with filtering by status and reviewing/approving/deactivating admin.

Storage uploads are handled automatically. Profile pictures and complaint images go to Cloudinary behind the scenes, with progress callbacks if you need them.

Errors follow a consistent typed hierarchy (`NetworkError`, `ServerError`, `InvalidRequestDataError`, and so on) so you can handle failures predictably instead of guessing at error shapes.

Every response, success or business-logic failure, resolves to the same `{ success, message, data }` shape.

Full TypeScript declarations ship alongside the SDK, so you get autocomplete and type-checking in editors whether your project is JS or TS.

## Installation

The package isn't published to npm yet, so install it directly from the repository:

```bash
npm install git+https://github.com/mbilalkhan704/FixIt360-SDK.git
```

## Quick Start

```javascript
import FixIt360SDK from "fixit360-sdk";

const sdk = new FixIt360SDK({
    baseURL: "http://127.0.0.1:8000",  // local Django dev server, swap for production when deploying
    timeout: 30000,          // optional, defaults to 30000ms
    withCredentials: false,  // optional, defaults to false
});

const { data } = await sdk.accounts.auth.login({
    email: "bilal@example.com",
    password: "Password@123",
});

console.log(data.access, data.refresh);
```

The SDK needs to be initialized with `new FixIt360SDK({...})` (or a later call to `sdk.initializeSDK({...})`) before making any request. Calling an API method beforehand throws `SDKNotInitializedError`.

## TypeScript Support

The package ships hand-written `.d.ts` declarations (see `types/`), wired up via `package.json`'s `exports` field. If your editor's TypeScript server doesn't pick them up automatically, restart it after installing.

```typescript
import FixIt360SDK, { NetworkError } from "fixit360-sdk";

const sdk = new FixIt360SDK({ baseURL: "https://api.fixit360.org" });
//    ^ fully typed, autocomplete on sdk.accounts, sdk.complaints, etc.
```

## API Overview

Every SDK instance exposes four top-level namespaces:

```javascript
sdk.accounts     // auth, password, profile
sdk.complaints   // complaint CRUD + image management
sdk.volunteer    // volunteer lifecycle
sdk.admin        // admin-only volunteer oversight
```

### Accounts

```javascript
sdk.accounts.auth.register({
  first_name,        // required
  last_name,         // required
  email,             // required
  gender,            // required
  date_of_birth,     // required
  password,          // required
  confirm_password,  // required
  phone_number,      // optional
});

sdk.accounts.auth.login({
  email,      // required
  password,   // required
});

sdk.accounts.auth.googleLogin({
  credential,   // required, Google ID token credential
});
// If the matching account was previously deactivated/resigned, the response
// carries reactivated: true instead of created, and a fresh email verification
// code is sent. If no account exists for the Google email, this resolves with
// success: false rather than throwing.

sdk.accounts.auth.refreshToken({
  refresh_token,    // required
});

sdk.accounts.auth.logout({
  access_token,    // required
  refresh_token,   // required
});

sdk.accounts.auth.resendEmailOTP({
  access_token,   // required
});

sdk.accounts.auth.verifyEmail({
  access_token,   // required
  otp,            // required
});

sdk.accounts.password.forgotPassword({
  email,    // required
});

sdk.accounts.password.verifyPasswordResetOTP({
  email,    // required
  otp,      // required
});

sdk.accounts.password.resetPassword({
  verification_token,    // required
  new_password,          // required
  confirm_new_password,  // required
});

sdk.accounts.password.confirmPassword({
  access_token,   // required
  password,       // required
});

sdk.accounts.password.changePassword({
  access_token,           // required
  verification_token,     // required
  new_password,           // required
  confirm_new_password,   // required
});

sdk.accounts.profile.getProfile({
  access_token,   // required
});

sdk.accounts.profile.updateProfile({
  access_token,     // required
  first_name,       // optional
  last_name,        // optional
  phone_number,     // optional
  date_of_birth,    // optional
  gender,           // optional
  profile_picture,  // optional: File | Blob
  onProgress,       // optional: upload progress callback
});
```

### Complaints

```javascript
sdk.complaints.list();
sdk.complaints.listMine({ access_token });
sdk.complaints.listByUser({ access_token, user_id });
sdk.complaints.get({ access_token, complaint_id });

sdk.complaints.create({
  access_token,
  title,
  description,
  category,
  latitude,
  longitude,
  address,
  files,   // File[], required, uploaded and attached atomically
});

sdk.complaints.update({
  access_token,
  complaint_id,
  title,                 // optional
  description,           // optional
  latitude,              // optional (send together with longitude)
  longitude,             // optional (send together with latitude)
  address,               // optional
  keepPhotoIds,          // optional: number[], existing photo IDs to keep unchanged
  newFiles,               // optional: File[], new photos to add
  replacements,           // optional: { photo_id, file }[], existing photos to replace with a new file
  primaryPhotoId,         // optional: marks an existing (kept or replaced) photo as primary, by photo_id
  primaryNewFileIndex,    // optional: marks a photo from newFiles as primary, by index
  onProgress,             // optional: upload progress callback
});
// primaryPhotoId and primaryNewFileIndex are mutually exclusive, supplying
// both throws InvalidRequestDataError. Any existing photo not referenced in
// keepPhotoIds or replacements is deleted server-side.

sdk.complaints.delete({ access_token, complaint_id, deletion_reason });

sdk.complaints.images.add({
  access_token,
  complaint_id,
  files,              // File[], subject to the complaint's 5-photo limit
  primaryFileIndex,   // optional: index into files marking the primary photo
  onProgress,         // optional: upload progress callback
});

sdk.complaints.images.replace({ access_token, complaint_id, image_id, file });
sdk.complaints.images.delete({ access_token, complaint_id, image_id });
```

If you pass `files` to `create` or `images.add`, the SDK uploads them to Cloudinary for you. There's no separate upload step to manage yourself.

### Volunteer

```javascript
sdk.volunteer.getVolunteerStatus({
  access_token,   // required
});
// Use the returned status to decide what UI to show or where to
// direct the user next (e.g. show an "Apply" screen, a pending-review
// state, an active volunteer dashboard, or a reactivation flow).

sdk.volunteer.apply({
  access_token,        // required
  motivation,          // required
  occupation,          // required
  experience,          // optional
  skills,              // optional
  emergency_contact,   // required
  availabilities,      // required
});

sdk.volunteer.getProfile({
  access_token,   // required
});

sdk.volunteer.updateAvailabilities({
  access_token,     // required
  availabilities,   // required
});
// This replaces the full availabilities record, not a partial merge.

sdk.volunteer.resign({
  access_token,   // required
  reason,         // required
});

sdk.volunteer.requestReactivation({
  access_token,   // required
  reason,         // optional
});
```

### Admin

```javascript
sdk.admin.volunteer.listVolunteerApplications({
  access_token,   // required
  status,         // optional: "pending" | "approved" | "rejected"
  reviewed_by,    // optional: admin ID, or "me" for the currently authenticated admin
});

sdk.admin.volunteer.getVolunteerApplication({
  access_token,     // required
  application_id,   // required
});

sdk.admin.volunteer.reviewVolunteerApplication({
  access_token,     // required
  application_id,   // required
  status,           // required: "approved" | "rejected"
  review_reason,    // optional when approving, required when rejecting
});

sdk.admin.volunteer.listVolunteers({
  access_token,     // required
  status,           // optional: "active" | "inactive"
  approved_by,      // optional: admin ID, or "me"
  deactivated_by,   // optional: admin ID, or "me"
});

sdk.admin.volunteer.getVolunteer({
  access_token,   // required
  volunteer_id,   // required
});

sdk.admin.volunteer.deactivateVolunteer({
  access_token,   // required
  volunteer_id,   // required
  reason,         // required
});

sdk.admin.volunteer.listVolunteerReactivationRequests({
  access_token,   // required
  status,         // optional: "pending" | "approved" | "rejected"
  reviewed_by,    // optional: admin ID, or "me"
});

sdk.admin.volunteer.getVolunteerReactivationRequest({
  access_token,   // required
  request_id,     // required
});

sdk.admin.volunteer.reviewVolunteerReactivationRequest({
  access_token,   // required
  request_id,     // required
  status,         // required: "approved" | "rejected"
  review_reason,  // optional when approving, required when rejecting
});
```

All list filters above are optional; an empty `results` array in the response means no matches, not an error.

## File Uploads and Progress Tracking

Any method that takes a `file`/`files` or `profile_picture` argument also accepts an optional `onProgress` callback. The payload shape differs slightly depending on whether one file or several are uploading:

```javascript
// Single file (profile picture)
await sdk.accounts.profile.updateProfile({
    access_token,
    profile_picture: file,
    onProgress: ({ progress, loadedBytes, totalBytes }) => {
        console.log(`${progress}% (${loadedBytes}/${totalBytes} bytes)`);
    },
});

// Multiple files (complaint photos)
await sdk.complaints.create({
    // ...
    files: [file1, file2, file3],
    onProgress: ({
        progress,                // overall percent across all files
        currentFile,             // 1-based index of the file currently uploading
        totalFiles,
        loadedBytes,             // total bytes uploaded so far, across all files
        totalBytes,
        currentFileProgress,     // percent complete for the current file
        currentFileLoadedBytes,
        currentFileTotalBytes,
    }) => {
        console.log(`File ${currentFile}/${totalFiles}, overall ${progress}%`);
    },
});
```

Uploads go through your backend first to get a signed Cloudinary URL, then upload directly to Cloudinary from there. Your access token and Cloudinary secrets never touch each other.

## Response Shape

A successful call resolves to:

```javascript
{
    success: true,
    message: "Human-readable message",
    data: { /* endpoint-specific payload */ }
}
```

Backend business errors (4xx responses) come back in the same shape with `success: false` instead of throwing. The SDK only throws for things outside normal request/response handling: SDK misuse, invalid input, network failures, timeouts, malformed responses, and 5xx server errors.

## Error Handling

Every thrown error extends a common `ApiError` base class and is importable directly from the package for `instanceof` checks, alongside its machine-readable `code`:

```javascript
import FixIt360SDK, {
    ApiError,
    NetworkError,
    ServerError,
    InvalidRequestDataError,
} from "fixit360-sdk";

try {
    await sdk.accounts.auth.login({ email, password });
} catch (error) {
    if (error instanceof NetworkError) {
        // handle connectivity issues specifically
    } else if (error instanceof ApiError) {
        console.error(`[${error.code}] ${error.message}`);
    } else {
        throw error; // not an SDK error
    }
}
```

| Error | Code | Thrown when |
|---|---|---|
| `SDKNotInitializedError` | `SDK_NOT_INITIALIZED` | An API call is made before the SDK is initialized |
| `InvalidRequestDataError` | `INVALID_REQUEST_DATA` | Request data is missing required fields, or is otherwise invalid (e.g. no fields provided to update, an unsupported combination of arguments like `primaryPhotoId` + `primaryNewFileIndex`, or a malformed file/date) |
| `InvalidSDKConfigurationError` | `INVALID_SDK_CONFIGURATION` | `initializeSDK()` is called with an invalid `baseURL`, `timeout`, or `withCredentials` |
| `NetworkError` | `NETWORK_ERROR` | The request couldn't reach the server |
| `RequestTimeoutError` | `REQUEST_TIMEOUT` | The request exceeded the configured timeout |
| `InvalidResponseError` | `INVALID_RESPONSE` | The server or Cloudinary returned an unexpected shape |
| `ServerError` | `SERVER_ERROR` | The backend returned a 5xx response |

> **Note:** `InvalidRequestDataError` has been updated. It now also covers cases beyond missing fields, e.g. `InvalidRequestDataError.atLeastOneRequired()` for "nothing to update" and `InvalidRequestDataError.unsupportedOperation()` for invalid argument combinations, not just literally-missing required fields.

Every error instance also has a `toJSON()` method, useful for logging or sending to an error-tracking service without losing structure.

## Examples

Working examples live in [`examples/`](./examples):

- [`loginExample.js`](./examples/loginExample.js): authentication, profile fetch, token refresh, logout
- [`volunteerExample.js`](./examples/volunteerExample.js): applying, checking status, updating availability

## Project Structure

```
FixIt360-SDK/
├── src/
│   ├── index.js              # Public SDK entry point
│   ├── config/                # SDK configuration & endpoint definitions
│   ├── core/                  # Axios client, request/response/header handling
│   ├── apis/                  # Public API modules (accounts, complaints, volunteer, admin, storage)
│   ├── builders/               # Payload validation & construction
│   ├── internal/               # Internal-only helpers (Cloudinary upload pipeline)
│   ├── errors/                 # Typed SDK error classes
│   ├── utils/                  # Date, object, and validation utilities
│   └── typedefs/                # Shared JSDoc typedefs (source of truth for types/*.d.ts)
├── types/                      # Hand-written .d.ts declarations for TypeScript consumers
├── examples/                   # Runnable usage examples
├── LICENSE
├── package.json
└── README.md
```

## Requirements

Node.js 18 or later, and a running FixIt360 backend (Django REST Framework) to point the SDK at.

## License

See [LICENSE](./LICENSE).

## Contributing

This SDK is under active development alongside the [FixIt360 backend](https://github.com/mbilalkhan704/FixIt360-backend) as part of an ongoing Final Year Project. Expect breaking changes before a stable v1. Issues and pull requests are welcome.