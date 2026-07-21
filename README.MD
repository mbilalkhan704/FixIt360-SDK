# FixIt360 SDK

This SDK is still being actively developed alongside the FixIt360 backend as part of an ongoing Final Year Project. Endpoints and payload shapes may still change, so it isn't recommended for use outside the FixIt360 ecosystem yet.

A JavaScript SDK for the FixIt360 backend, a civic complaint management platform. It covers authentication, complaints, volunteer operations, admin workflows, and Cloudinary file uploads, all through a simple promise-based API.

## Features

Accounts handle registration, login, Google OAuth, token refresh, password reset and change, and profile management.

Complaints support creating, updating, deleting, and listing, along with image management and geolocation data.

Volunteers can apply, manage their availability, resign, and request reactivation.

Admins can review volunteer applications, manage active volunteers, and handle reactivation requests.

Storage uploads are handled automatically. Profile pictures and complaint images go to Cloudinary behind the scenes, with progress callbacks if you need them.

Errors follow a consistent typed hierarchy (`NetworkError`, `ServerError`, `InvalidRequestDataError`, and so on) so you can handle failures predictably instead of guessing at error shapes.

Every response, success or business-logic failure, resolves to the same `{ success, message, data }` shape.

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

The SDK needs to be initialized with `new FixIt360SDK({...})` before making any request. Calling an API method beforehand throws `SDKNotInitializedError`.

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
  password,          // required
  confirm_password,  // required
  phone_number,      // required
});

sdk.accounts.auth.login({
  email,      // required
  password,   // required
});

sdk.accounts.auth.googleLogin({
  id_token,   // required
});

sdk.accounts.auth.refreshToken({
  refresh,    // required
});

sdk.accounts.auth.logout({
  access_token,   // required
  refresh,        // required
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
  verification_token,    // required
  new_password,          // required
  confirm_new_password,  // required
});

sdk.accounts.profile.getProfile({
  access_token,   // required
});

sdk.accounts.profile.updateProfile({
  access_token,   // required
  first_name,     // required
  phone_number,   // required
  file,           // required
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
  files,               // File[] (min 1, max 5) — required, uploaded and attached atomically
  primaryFileIndex,    // optional: index into files marking the primary photo; defaults to first if omitted
});

sdk.complaints.update({
  access_token,
  complaint_id,
  title,               // optional
  description,         // optional
  latitude,             // optional (send together with longitude)
  longitude,            // optional (send together with latitude)
  address,              // optional
  keepPhotoIds,         // optional: number[] — existing photo IDs to keep unchanged
  newFiles,              // optional: File[] — new photos to add
  replacements,          // optional: { photo_id, file }[] — existing photos to replace with a new file
  primaryPhotoId,        // optional: marks an existing kept/replaced photo (by photo_id) as primary
  primaryNewFileIndex,   // optional: marks a photo from newFiles (by index) as primary
});
// Note: any existing photo not referenced in keepPhotoIds or replacements is deleted server-side.
// At least one of the text fields or an image change must be provided.

sdk.complaints.delete({ access_token, complaint_id });

sdk.complaints.images.add({
  access_token,
  complaint_id,
  files,              // File[] (min 1, max 5)
  primaryFileIndex,   // optional: index into files marking the primary photo
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
  access_token,     // required
  availabilities,   // required
});

sdk.volunteer.getProfile({
  access_token,   // required
});

sdk.volunteer.updateAvailabilities({
  access_token,     // required
  availabilities,   // required
});
// This is a PUT request — it replaces the full availabilities record,
// not a partial merge. If a day's key is passed with an empty value,
// that day is saved as no availability; it does NOT preserve whatever
// was previously set for that day.

sdk.volunteer.resign({
  access_token,   // required
  reason,         // required
});

sdk.volunteer.requestReactivation({
  access_token,   // required
  reason,         // required
});
```

### Admin

```javascript
sdk.admin.volunteer.listVolunteerApplications({
  access_token,   // required
  status,         // optional
  reviewed_by,    // optional
});

sdk.admin.volunteer.getVolunteerApplication({
  access_token,     // required
  application_id,   // required
});

sdk.admin.volunteer.reviewVolunteerApplication({
  access_token,     // required
  application_id,   // required
  status,           // required
});

sdk.admin.volunteer.listVolunteers({
  access_token,     // required
  status,           // optional
  approved_by,      // optional
  deactivated_by,   // optional
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
  status,         // optional
  reviewed_by,    // optional
});

sdk.admin.volunteer.getVolunteerReactivationRequest({
  access_token,   // required
  request_id,     // required
});

sdk.admin.volunteer.reviewVolunteerReactivationRequest({
  access_token,   // required
  request_id,     // required
  status,         // required
});
```

## File Uploads and Progress Tracking

Any method that takes a `file` or `files` argument also accepts an optional `onProgress` callback:

```javascript
await sdk.accounts.profile.updateProfile({
    access_token,
    file: profilePictureFile,
    onProgress: (percent) => console.log(`Uploading: ${percent}%`),
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

Backend business errors (4xx responses) come back in the same shape with `success: false` instead of throwing. The SDK only throws for things outside normal request/response handling: network failures, timeouts, malformed responses, and 5xx server errors.

## Error Handling

Every thrown error extends a common `ApiError` base class and carries a `code` you can branch on:

| Error | Code | Thrown when |
|---|---|---|
| `SDKNotInitializedError` | `SDK_NOT_INITIALIZED` | An API call is made before `new FixIt360SDK(...)` |
| `InvalidRequestDataError` | `INVALID_REQUEST_DATA` | Request data is missing required fields, or is otherwise invalid (e.g. no fields provided to update, or an unsupported combination of arguments) |
| `NetworkError` | `NETWORK_ERROR` | The request couldn't reach the server |
| `RequestTimeoutError` | `REQUEST_TIMEOUT` | The request exceeded the configured timeout |
| `InvalidResponseError` | `INVALID_RESPONSE` | The server or Cloudinary returned an unexpected shape |
| `ServerError` | `SERVER_ERROR` | The backend returned a 5xx response |

> **Note:** `IncompleteRequestDataError` has been renamed to `InvalidRequestDataError` (code changed from `INCOMPLETE_REQUEST_DATA` to `INVALID_REQUEST_DATA`). It now also covers cases beyond missing fields — e.g. `atLeastOneRequired()` for "nothing to update" and `unsupportedOperation()` for invalid argument combinations — not just literally-missing required fields.

```javascript
try {
    await sdk.accounts.auth.login({ email, password });
} catch (error) {
    console.error(`[${error.code}] ${error.message}`);
}
```

## Examples

Working examples live in [`examples/`](./examples):

- [`loginExample.js`](./examples/loginExample.js): authentication, profile fetch, token refresh, logout
- [`complaintExample.js`](./examples/complaintExample.js): creating a complaint with images, listing, updating
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
│   └── types/                  # Shared JSDoc typedefs
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

This SDK is under active development alongside the [FixIt360 backend](https://github.com/mbilalkhan704/project-fixit360) as part of an ongoing Final Year Project. Expect breaking changes before a stable v1. Issues and pull requests are welcome.