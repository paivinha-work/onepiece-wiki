# Tasks: One Piece Wiki

**Input**: Design documents from `/specs/001-one-piece-wiki/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md),
[research.md](./research.md), [data-model.md](./data-model.md),
[contracts/characters-api.md](./contracts/characters-api.md)

**Tests**: Include focused unit and component tests as required by the project
constitution. Test cases may be written alongside implementation; TDD is not
required.

**Organization**: Tasks are grouped by user story in priority order. Paths are
relative to the repository root.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the Vite React + TypeScript application and establish the
requested development stack.

- [x] T001 Initialize the Vite React + TypeScript application at repository root; create `package.json`, `index.html`, `vite.config.ts`, `src/main.tsx`, `src/App.tsx`, and `src/index.css`, and retain the Vite React entry point.
- [x] T002 Configure strict TypeScript checking for the application in `tsconfig.json`, `tsconfig.app.json`, and `tsconfig.node.json`; keep strict mode enabled.
- [x] T003 Configure ESLint for TypeScript and React in `eslint.config.js` and add `lint` and `typecheck` scripts to `package.json`.
- [x] T004 Install and configure Tailwind CSS v4 with the Vite plugin in `package.json`, `vite.config.ts`, and `src/index.css`.
- [x] T005 Configure Vitest and React Testing Library in `package.json`, `vitest.config.ts`, and `src/test/setup.ts`; provide `test` and `build` scripts in `package.json`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Add shared query infrastructure and a validated API boundary before
the user-facing stories.

**⚠️ CRITICAL**: All user stories depend on these shared foundations.

- [x] T006 Configure the shared TanStack Query client and provider in `src/lib/queryClient.ts`, `src/app/QueryProvider.tsx`, and `src/main.tsx`.
- [x] T007 [P] Define the normalized `Character` type and runtime payload parsing for required `id` and non-empty `name`, optional/null fields, and malformed optional values in `src/features/characters/types/character.ts`; follow `data-model.md` and `contracts/characters-api.md`.
- [x] T008 Implement typed catalog and detail GET operations against `https://api.api-onepiece.com/v2/characters/en` and `/characters/en/{id}`, including HTTP/JSON/shape error handling and a null detail response, in `src/features/characters/services/characterApi.ts`.
- [x] T009 Add unit tests for valid, incomplete, null, and malformed API payloads and HTTP failures in `tests/unit/characterApi.test.ts`.

**Checkpoint**: The application boots, lint/type-check/test/build scripts are
available, React Query is configured, and the external API boundary validates
responses.

---

## Phase 3: User Story 1 - Consultar personagens (Priority: P1) 🎯 MVP

**Goal**: Visitors can browse the character catalog and open a profile showing
available, validated facts without inventing missing data.

**Independent Test**: Load a catalog response, open one character, and verify
that the profile displays its available fields and omits missing or invalid
optional fields.

### Tests for User Story 1

- [x] T010 [P] [US1] Add component tests for catalog rendering, opening a character, profile fields, omitted optional data, and spoiler content hidden until revealed in `tests/unit/CharacterViews.test.tsx`.

### Implementation for User Story 1

- [x] T011 [US1] Implement React Query hooks for the character catalog and detail operations in `src/features/characters/hooks/useCharacters.ts` and `src/features/characters/hooks/useCharacter.ts`.
- [x] T012 [P] [US1] Create the accessible character list and selection controls in `src/features/characters/components/CharacterList.tsx`.
- [x] T013 [P] [US1] Create the character detail view with available facts and provider attribution in `src/features/characters/components/CharacterDetail.tsx`; hide content classified as spoiler until the visitor explicitly reveals it.
- [x] T014 [US1] Connect catalog and detail views in the application page in `src/pages/CharactersPage.tsx` and render it from `src/App.tsx`.

**Checkpoint**: Visitors can independently browse the API-backed catalog and
open a usable character profile.

---

## Phase 4: User Story 2 - Encontrar personagens (Priority: P2)

**Goal**: Visitors can find catalog characters by name, including names that
differ in case, surrounding whitespace, or diacritics.

**Independent Test**: Search a loaded catalog with a matching name, a normalized
variant, and a name with no match; open a result and verify the empty state.

### Tests for User Story 2

- [x] T015 [P] [US2] Add tests for case-insensitive, whitespace-trimmed, diacritic-insensitive matching, multiple matches, and no results in `tests/unit/characterSearch.test.ts`.
- [x] T016 [P] [US2] Add component tests for search input, filtered list, and empty results in `tests/unit/CharacterSearch.test.tsx`.

### Implementation for User Story 2

- [x] T017 [US2] Implement normalized name matching over the loaded catalog in `src/features/characters/services/searchCharacters.ts`.
- [x] T018 [US2] Add an accessible search field and filtered results to `src/features/characters/components/CharacterList.tsx`, preserving the unfiltered catalog for an empty query.

**Checkpoint**: Search results and empty results are independently verifiable
without changing profile data or requiring API search support.

---

## Phase 5: User Story 3 - Recuperar-se de indisponibilidade de dados (Priority: P3)

**Goal**: Visitors understand loading, empty, and error states, can retry failed
requests, and can operate catalog/profile controls by keyboard on narrow and
wide screens.

**Independent Test**: Simulate delayed, empty, failed, and recovered requests;
confirm the relevant loading/empty/error/retry states. Then navigate the catalog
and profile using only a keyboard at a 320 px viewport.

### Tests for User Story 3

- [x] T019 [P] [US3] Add tests for loading, empty catalog, error, and successful retry states in `tests/unit/CharacterRequestStates.test.tsx`.
- [x] T020 [P] [US3] Add component tests for keyboard-operable list, search, profile, and retry controls in `tests/unit/CharacterAccessibility.test.tsx`.

### Implementation for User Story 3

- [x] T021 [US3] Add accessible loading, empty, and error states with a retry action to `src/features/characters/components/CharacterList.tsx` and `src/features/characters/components/CharacterDetail.tsx`.
- [x] T022 [US3] Ensure semantic headings, labels, visible focus, and keyboard operation for the character journeys in `src/features/characters/components/CharacterList.tsx`, `src/features/characters/components/CharacterDetail.tsx`, and `src/pages/CharactersPage.tsx`.
- [x] T023 [US3] Add responsive catalog and profile layouts without horizontal overflow at 320 px in `src/index.css` and `src/features/characters/components/CharacterList.tsx`.

**Checkpoint**: Visitors receive recoverable request states and can complete
the main journeys accessibly on mobile and desktop.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Verify integrated journeys and the documented local validation
workflow.

- [x] T024 Create or update repository run and validation instructions for the Vite application scripts in `README.md`.
- [x] T025 Run `npm run test`, `npm run lint`, `npm run typecheck`, and `npm run build`; fix failures in `src/`, `tests/`, or `package.json`, then verify the scenarios in `specs/001-one-piece-wiki/quickstart.md`.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; complete before the application feature
  work.
- **Foundational (Phase 2)**: Depends on Setup and blocks all user stories.
- **User Story 1 (Phase 3)**: Depends on Phase 2; delivers the P1 MVP.
- **User Story 2 (Phase 4)**: Depends on Phase 3 because it filters the catalog
  and list component.
- **User Story 3 (Phase 5)**: Depends on Phase 3 and Phase 4 because its
  acceptance criteria cover failure/retry and keyboard operation across catalog,
  search, and profile journeys.
- **Polish (Phase 6)**: Depends on all three user stories.

### User Story Dependencies

- **US1 (P1)**: Can start after the foundational API and query infrastructure.
- **US2 (P2)**: Requires the US1 catalog and character list.
- **US3 (P3)**: Requires the catalog/profile UI from US1 and search UI from US2
  for full journey coverage; request-state handling can be integrated as those
  views are implemented.

### Parallel Opportunities

- After T006, T007 can be prepared independently; T008 consumes the parser
  defined by T007, and T009 follows T008.
- Within US1, T012 and T013 can be implemented in parallel after T011's data
  hooks are available; T010 can be developed against the planned component
  interfaces.
- Within US2, T015 and T016 can be developed in parallel; T018 depends on T017.
- Within US3, T019 and T020 can be developed in parallel; implementation tasks
  integrate the corresponding states and accessibility behavior.

## Parallel Example: User Story 1

```text
After T011:
Task: T012 - Create CharacterList.tsx
Task: T010 - Add CharacterViews.test.tsx against the specified view behavior
```

T013 may also proceed in parallel with T012 after T011 because the two view
components live in separate files.

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup and Foundational phases.
2. Implement and validate User Story 1: catalog, detail, and missing-field
   handling.
3. Stop and verify the P1 journey independently before expanding the scope.

### Incremental Delivery

1. Add User Story 2 to provide normalized client-side search.
2. Add User Story 3 to make failures recoverable and complete keyboard/mobile
   access requirements.
3. Run the full validation commands and quickstart scenarios in Polish.
