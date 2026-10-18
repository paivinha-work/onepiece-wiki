# External Contract: One Piece Characters API

This contract describes the third-party service selected in the feature
specification. It is based on the provider's published documentation and
point-in-time endpoint checks; it is not a service-level guarantee.

## Service

- Provider documentation: [api-onepiece.com](https://documentation.api-onepiece.com/en)
- Base URL: `https://api.api-onepiece.com/v2`
- Authentication: none documented for these GET requests.
- Usage limits: unpublished; request responsibly.

## Operations

### List characters

`GET /characters/en`

- Success response: JSON array of character records.
- Pagination and server-side search: not documented. Treat this as the full
  catalog; filter by name in the client after successful retrieval.
- Do not assume the current number or order of records is stable.

### Read a character

`GET /characters/en/{id}`

- Success response: JSON character record.
- An observed unknown ID returned JSON `null` with HTTP 200. Treat `null` as a
  not-found result, not as an empty valid profile.

## Character fields

The documentation describes `id`, `name`, `job`, `size`, `birthday`, `age`,
`bounty`, `status`, and nested `crew` and `fruit` information. Validate response
data before use: optional fields may be absent or null, and observed field
representations do not always match the documented types. Required data for a
selectable character is a usable identifier and non-empty display name. Ignore
or safely omit malformed optional fields.

Do not assume the API provides images, canon citations, summaries, or spoiler
metadata unless the provider adds and documents those fields.

## HTTP, CORS, and errors

- The endpoints are GET-only in the observed contract. A tested cross-origin GET
  succeeded with an `Access-Control-Allow-Origin` response; verify the deployed
  origin during implementation.
- An unknown route returned HTTP 404 with an HTML body in an observed check.
- No stable error-body schema, rate-limit policy, pagination scheme, or uptime
  guarantee was found.
- Treat non-success HTTP status, invalid JSON, unexpected payload shape, and
  network failure as recoverable request errors. Present the user-facing error
  state and retry behavior required by the feature spec.

## Attribution and use

The API listing describes the service as unofficial and fan-made, intended for
educational and development use, and recommends checking rights before
commercial use. No formal data license or explicit attribution requirement was
found in the reviewed documentation. Identify the provider in the interface or
about/source information, and confirm current terms and rights before public or
commercial distribution.

## Sources

- [API listing and FAQ](https://www.freepublicapis.com/one-piece-api)
- [Provider API documentation](https://documentation.api-onepiece.com/en)
- [Character endpoint documentation](https://documentation.api-onepiece.com/en/13-character)
- [Character catalog endpoint](https://api.api-onepiece.com/v2/characters/en)
- [Character detail example](https://api.api-onepiece.com/v2/characters/en/1)
