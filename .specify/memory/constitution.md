<!--
Sync Impact Report
Version change: unratified template -> 1.0.0 (initial ratification)
Modified principles: added I. Canonical Accuracy and Provenance; II. React and
TypeScript by Default; III. Accessible, Spoiler-Aware Discovery; IV. Verify
Behavior with Tests; V. Secure, Fast, and Focused Delivery.
Added sections: Technical Constraints; Development Workflow.
Removed sections: none.
Follow-up TODOs: none.
-->

# React+TS One Piece Wiki Constitution

## Core Principles

### I. Canonical Accuracy and Provenance
Wiki entries MUST distinguish established canon from interpretation, speculation,
and editorial explanation. Factual claims SHOULD link to the relevant manga
chapter, anime episode, official publication, or other reliable source when
available. Contributors MUST NOT present uncertain or conflicting information as
settled fact; concise original summaries and clear attribution take precedence
over reproducing source material.

### II. React and TypeScript by Default
The user interface MUST be built with React and TypeScript, with strict type
checking enabled. Components and data models MUST have clear responsibilities,
and shared character, location, episode, and other wiki data MUST use explicit
types. New abstractions or dependencies require a concrete use case and MUST
remain proportionate to the feature.

### III. Accessible, Spoiler-Aware Discovery
Core reading, navigation, and search MUST work with keyboard input, meaningful
semantics, and assistive technologies. Layouts MUST remain usable on mobile and
desktop. Entries that reveal major plot developments MUST be clearly identified,
and spoiler-sensitive content MUST be suppressible wherever it is presented.

### IV. Verify Behavior with Tests
Changes MUST include or update tests for their user-visible behavior and
important data rules. Tests SHOULD cover component behavior and integration
between navigation, search, and wiki content where those areas change. Before a
change is considered complete, the relevant tests and available type and build
checks MUST pass; failures MUST be reported rather than hidden.

### V. Secure, Fast, and Focused Delivery
The application MUST NOT expose secrets or trust unvalidated user-provided data.
Pages and assets MUST be delivered efficiently, and interactions MUST avoid
unnecessary work that harms perceived responsiveness. Implementations MUST favor
the simplest design that meets the documented user need without sacrificing
accessibility, correctness, or maintainability.

## Technical Constraints

React and TypeScript are the required frontend foundation. TypeScript strictness
MUST remain enabled; exceptions require a narrow, documented reason. Wiki
content SHOULD be kept separate from presentation so it can be validated,
referenced, searched, and updated consistently. Any artwork, quotations, or
other third-party material MUST be used with appropriate permission or within
applicable usage rights, with attribution where required.

## Development Workflow

Each feature MUST state its user-facing outcome and identify affected content,
navigation, and spoiler behavior. Implementation MUST follow existing project
patterns and include focused tests. Reviews and pre-merge checks MUST verify
type safety, relevant test/build results, responsive behavior, and accessibility
for changed interfaces. Documentation and content references MUST be updated
when behavior or factual material changes.

## Governance

This constitution governs feature specifications, plans, implementation, and
review. A change that conflicts with it MUST either be revised or be accompanied
by an explicit constitution amendment. Amendments MUST explain their rationale
and impact, update the version, and record the amendment date. Versioning uses
semantic increments: MAJOR for incompatible governance changes, MINOR for new
or materially expanded principles or requirements, and PATCH for clarifications
that do not change obligations. Reviews MUST check compliance with the
principles and technical constraints; any exception MUST be explicit, narrowly
scoped, and justified.

**Version**: 1.0.0 | **Ratified**: 2026-10-18 | **Last Amended**: 2026-10-18
