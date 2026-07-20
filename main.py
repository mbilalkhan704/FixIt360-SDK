from pathlib import Path

# Root directory (directory containing this script)
ROOT = Path(__file__).resolve().parent

FILES = [
    "src/index.js",

    "src/config/config.js",
    "src/config/endpoints.js",

    "src/core/axiosClient.js",
    "src/core/request.js",
    "src/core/response.js",
    "src/core/headers.js",

    "src/utils/dateUtils.js",
    "src/utils/validationUtils.js",
    "src/utils/multipartUtils.js",
    "src/utils/objectUtils.js",
    "src/utils/constants.js",

    "src/errors/ApiError.js",
    "src/errors/ValidationErrors.js",
    "src/errors/AuthenticationErrors.js",
    "src/errors/ImageErrors.js",
    "src/errors/RequestErrors.js",
    "src/errors/index.js",

    "src/apis/accountsApi.js",
    "src/apis/volunteerApi.js",
    "src/apis/complaintApi.js",
    "src/apis/reportApi.js",
    "src/apis/imageApi.js",
    "src/apis/adminApi.js",
    "src/apis/index.js",

    "src/types/typedefs.js",

    "examples/loginExample.js",
    "examples/complaintExample.js",
    "examples/volunteerExample.js",
]


def main():
    created = 0
    skipped = 0

    print(f"Generating project structure in:\n{ROOT}\n")

    for file in FILES:
        path = ROOT / file

        # Create all missing parent directories
        path.parent.mkdir(parents=True, exist_ok=True)

        if path.exists():
            skipped += 1
            print(f"[SKIP] {file}")
        else:
            path.touch()
            created += 1
            print(f"[FILE] {file}")

    print("\n" + "=" * 40)
    print("Generation Complete")
    print("=" * 40)
    print(f"Files created : {created}")
    print(f"Files skipped : {skipped}")


if __name__ == "__main__":
    main()