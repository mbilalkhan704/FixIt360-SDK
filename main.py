from pathlib import Path

# Root directory (directory where this script is located)
ROOT = Path(__file__).parent.resolve()

# Folder structure
directories = [
    "src",
    "src/config",
    "src/core",
    "src/utils",
    "src/errors",
    "src/apis",
    "src/types",
    "examples",
]

# File structure
files = [
    "package.json",
    "README.md",
    "LICENSE",
    ".gitignore",

    "src/index.js",

    "src/config/config.js",

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

    "src/apis/userApi.js",
    "src/apis/volunteerApi.js",
    "src/apis/complaintApi.js",
    "src/apis/reportApi.js",
    "src/apis/imageApi.js",
    "src/apis/adminApi.js",

    "src/types/typedefs.js",

    "examples/loginExample.js",
    "examples/volunteerExample.js",
    "examples/complaintExample.js",
]


def create_directories():
    for directory in directories:
        path = ROOT / directory
        path.mkdir(parents=True, exist_ok=True)
        print(f"[DIR ] {path.relative_to(ROOT)}")


def create_files():
    for file in files:
        path = ROOT / file

        # Ensure parent directory exists
        path.parent.mkdir(parents=True, exist_ok=True)

        # Create only if it doesn't exist
        if not path.exists():
            path.touch()
            print(f"[FILE] {path.relative_to(ROOT)}")
        else:
            print(f"[SKIP] {path.relative_to(ROOT)} (already exists)")


def main():
    print(f"Generating FixIt360 SDK structure in:\n{ROOT}\n")

    create_directories()
    create_files()

    print("\nDone!")
    print("Project structure successfully generated.")


if __name__ == "__main__":
    main()