# Data Model: One Piece Wiki

## Character

Represents a person or entity returned by the selected One Piece API.

| Field | Meaning | Rule |
|---|---|---|
| `id` | Stable API identifier used to open the profile | Required for selection and profile lookup; accept the documented representation |
| `name` | Display name | Required to list, search, and label a profile |
| `job` | Character's role/job, when supplied | Optional and nullable |
| `size` | Character size, when supplied | Optional and nullable |
| `birthday` | Character birthday, when supplied | Optional and nullable |
| `age` | Character age, when supplied | Optional and nullable |
| `bounty` | Character bounty, when supplied | Optional and nullable |
| `status` | Character status, when supplied | Optional and nullable |
| `crew` | Associated crew data, when supplied | Optional, nullable, and validated independently |
| `fruit` | Associated fruit data, when supplied | Optional, nullable, and validated independently |

The API documents the fields above but observed responses are not uniform:
values may be absent, null, or inconsistent with the documented type. Validate
the identifier and display name before exposing an item; treat other data as
optional and normalize only values that can be safely displayed. Do not infer
canon facts or invent fallback values for missing fields. Consult the endpoint
contract in [characters-api.md](./contracts/characters-api.md).

## Character Profile

The presentation of a Character and its available facts. It includes the
provider as the data source and field- or group-level editorial spoiler
classification. Content with potential plot impact remains hidden until it is
reviewed and explicitly revealed. The API does not document image, chapter
citations, narrative summaries, or spoiler metadata; the application must not
imply it supplies these.

## Search Result

A set of Characters matching a visitor's name query. Matching is
case-insensitive, ignores leading/trailing whitespace, and normalizes
diacritics. An empty query represents the unfiltered catalog; a query with no
matches represents the empty-result state.

## Query and presentation states

Catalog and profile lookups each expose loading, success, empty, and error
states. An error state retains a retry action. These are interaction states,
not persistent wiki data.

## Relationships

- A Character has one profile.
- A Search Result contains zero or more Characters.
- A Character Profile presents one Character and zero or more available facts.
