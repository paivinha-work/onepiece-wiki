# Quickstart: One Piece Wiki

This guide validates the feature once the application implementation and its
package scripts are available. It does not prescribe production implementation
details.

## Prerequisites

- Node.js and npm versions supported by the Vite project.
- Network access to the selected One Piece API for live-data checks.
- A lockfile and package scripts created for the application.

## Run and validate

1. Run `npm ci` from the repository root.
2. Run `npm run dev` and open the local URL it prints.
3. Open the character catalog. Confirm that available characters are shown and
   missing optional fields do not appear as confirmed facts.
4. Search for a known character, including a query with different casing,
   surrounding spaces, and diacritics. Confirm the expected character can be
   opened; search for a non-existent name and confirm an empty state appears.
5. Open a character profile. Confirm spoiler-sensitive editorial content is
   identified and hidden until explicitly revealed.
6. Disconnect or block the API request and reload the catalog or profile.
   Confirm a clear error and retry action appear. Restore connectivity and retry;
   confirm the requested content loads.
7. Use only the keyboard to navigate and operate catalog, search, profile, and
   spoiler controls. Repeat at a 320-pixel viewport width and check that there
   is no horizontal overflow.
8. Run `npm run test`, `npm run typecheck`, and `npm run build`. All must pass.

## Package scripts

The application package scripts are part of implementation and must provide
these commands.

## Expected result

Catalog and profile content render from the documented API response; search,
spoiler controls, accessible navigation, and loading/empty/error/retry states
behave as required in [spec.md](./spec.md). Verify API behavior against
[characters-api.md](./contracts/characters-api.md), which records known
limitations and provider terms for implementation and contract tests.
