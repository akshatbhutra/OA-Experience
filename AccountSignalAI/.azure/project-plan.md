# AccountSignal Portfolio Page local prototype

**Status**: Planning
**Created**: 2026-10-01
**Mode**: Local prototype

## 1. Objective

Create a runnable local AccountSignal Portfolio Page prototype that demonstrates a multi-institution financial-services intelligence feed. The experience will use the supplied Citizens Step 2 and Step 8A JSON as source fixtures and equivalent Commerce Bank and Synovus fixtures derived from the same normalized contracts.

The prototype will prove the public-to-subscriber content boundary, not production identity, persistence, deployment, or ingestion operations. It will be implemented later; this document is the implementation contract for that work.

## 2. Scope & Requirements

### In scope

- React with Vite frontend written in TypeScript.
- Express REST API written in TypeScript.
- In-memory fixture loading at API startup; no external datastore or secrets.
- Portfolio list with institution, institution type, domain, technology category, recency, and text search filters.
- Public signal cards containing institution, title, summary, domain, observed date, source category, confidence where permitted, citations, and a generic related-opportunity indicator.
- Explicit `Public` and `Demo subscriber` modes. Demo mode is a local entitlement simulation, not authentication.
- Gated opportunity teaser for public users and opportunity detail for demo subscribers.
- Citizens, Commerce Bank, and Synovus represented through the same institution, signal, evidence, and opportunity contracts.
- Fixture validation and normalization at startup, including stable source keys and idempotent duplicate handling.

### Out of scope

- Production authentication, billing, authorization providers, or external APIs.
- Database migrations, cloud resources, deployment, background ingestion, or scheduled refresh.
- Claiming that Commerce Bank or Synovus content is sourced intelligence; those records are clearly labeled prototype fixtures.
- Reproducing every existing AccountSignal route or opportunity-detail screen.
- Exposing raw Step 8A JSON to the browser.

### Source and safety rules

- Citizens Step 2 is the source for public priorities, budget-release logic, evidence, dates, confidence, and claim-safety notes.
- Citizens Step 8A is the source for subscriber opportunity fields, including classification, rank, sales readiness, continuity, budget range, implementation window, scope, and pursuit guidance.
- Public DTOs must never contain buyer maps, budget, scope, continuity, sales-readiness, rank, internal analysis, or other subscriber fields.
- The API, rather than the frontend, enforces the public/demo projection boundary.
- Commerce Bank and Synovus fixtures must use the same schema and carry a `prototypeFixture: true` marker.

## 3. Solution Architecture

### Repository structure

```text
accountsignal-portfolio/
  apps/
    web/
      src/
        app/                 # mode state, routing, query state
        components/          # filters, cards, detail panel, empty/loading/error states
        features/portfolio/  # page composition and API hooks
        styles/
    api/
      src/
        server.ts
        routes/portfolio.ts
        services/portfolio-service.ts
        services/entitlement-service.ts
        fixtures/load-fixtures.ts
        fixtures/normalize.ts
        contracts/
        validation/
  fixtures/
    citizens-step-2.json
    citizens-step-8a.json
    commerce-bank.json
    synovus.json
  packages/contracts/src/portfolio.ts
  scripts/validate-fixtures.ts
  package.json
  tsconfig.json
  README.md
```

The workspace source files remain the canonical inputs. Fixture copies or checked-in fixture adapters must preserve source filenames and hashes in metadata so the prototype can show provenance without coupling UI code to the original nested JSON shape.

### Request flow

1. The API loads and validates all fixture files before listening.
2. Normalization maps source-specific records into canonical institutions, signals, evidence, and opportunities.
3. `GET /api/v1/portfolio/signals` filters the canonical in-memory collection and returns only the public projection.
4. The frontend owns URL/query state and requests the feed and facet metadata from the API.
5. A signal card can request its related opportunity. The service checks the explicit `x-demo-entitlement: subscriber` header (or equivalent local mode contract) before producing the subscriber DTO.
6. The frontend renders a teaser for public mode and full demo detail only after a successful entitled response.

## 4. Data & Fixture Design

### Canonical models

- `Institution`: `id`, `slug`, `name`, `institutionType`, `prototypeFixture`.
- `Signal`: `id`, `institutionId`, `sourceRecordKey`, `signalType`, `title`, `publicSummary`, `publicImplication`, `domain`, `technologyCategories`, `observedAt`, `publishedAt`, `confidence`, `claimSafetyNote`, `evidenceIds`, `relatedOpportunityId`, `visibility`.
- `Evidence`: `id`, `sourceTitle`, `sourceType`, `url`, `publicationDate`, `summary`, `isPublic`.
- `Opportunity`: private canonical record keyed by `opportunityId`; includes title, classification, priority, rank, sales readiness, executive summary, analysis, capability context, buyer map, scope, budget, implementation window, continuity, and supporting signal IDs.

### Normalization rules

- Use `bank_name` and `institution_name` to resolve Citizens records to slug `citizens`; use explicit fixture metadata for Commerce Bank and Synovus.
- Derive signal records from executive readout facts, KPI/trend records, business priorities, budget-release logic, and granular signal objects. Preserve `sourceRecordKey` from the source path or generate a deterministic key from source file, array path, and content hash.
- Map Step 8A `si_ready_sales_plays[].opportunity_id` to private opportunities and expose only `hasSubscriberIntelligence` plus a generic public label in public responses.
- Preserve citation URLs, publication dates, confidence, source type, and claim-safety text in public-safe records.
- Reject malformed fixture records, missing institution identity, missing public title/summary, invalid dates, or duplicate canonical IDs with conflicting content.
- Deduplicate exact repeated records by deterministic key and content hash; do not silently merge records with different content.

### Fixture handling

- Keep the original supplied JSON unchanged.
- Add a fixture manifest identifying source file, institution, source step, schema version, SHA-256/content hash, and `prototypeFixture` status.
- Citizens fixtures are authoritative for the demo and must include at least one related opportunity from Step 8A.
- Commerce Bank and Synovus fixtures must include at least three signals each, at least two domains, citations marked as prototype/example where not sourced, and at least one related opportunity so multi-institution filtering and gating are testable.
- The API must report fixture validation failures with the filename and source path, then exit non-zero rather than serving partial data.

## 5. API & Interaction Contract

### Endpoints

`GET /api/v1/portfolio/signals`

Query parameters: `q`, repeated `institution`, `institutionType`, repeated `domain`, repeated `technology`, `since`, `until`, `sort=recent|relevance`, and bounded `limit`.

Response: `{ items, facets, nextCursor, updatedAt }`. Each item is a public signal DTO and may include `{ hasSubscriberIntelligence: true, publicLabel: "Subscriber intelligence" }` without private opportunity content.

`GET /api/v1/portfolio/filters`

Returns available institution, institution type, domain, technology, and recency options derived from the normalized public collection.

`GET /api/v1/portfolio/summary`

Returns local prototype counts such as total institutions, public signals, and signals updated in the selected recent window.

`GET /api/v1/portfolio/signals/:signalId/opportunity`

Without the demo subscriber entitlement, return `403` with a stable `{ code: "SUBSCRIBER_ACCESS_REQUIRED", message }` body and no private fields. With entitlement, return a stable subscriber opportunity DTO containing the opportunity detail needed by the prototype panel.

`GET /health`

Returns fixture-load status and normalized record counts for local smoke tests. It must not include private opportunity content.

### Frontend behavior

- Default to `Public` mode and a recent, multi-institution feed.
- Keep filter and search state in the URL so refresh and back/forward navigation preserve the view.
- Debounce text search, show loading and empty states, and allow clearing all filters.
- Show source/provenance affordances on public cards without exposing raw internal analysis.
- In public mode, selecting a related opportunity opens a clearly gated teaser with a local “View demo subscriber detail” control.
- In demo mode, the same interaction loads the API-protected opportunity panel; errors remain visible and do not fall back to private fixture data in the browser.

## 6. Design System & UI

**Component Library**: Fluent UI v9
**Visual direction**: Dense, evidence-first financial-services intelligence workspace aligned to the existing AccountSignal opportunity experience.
**Primary surfaces**: Portfolio feed, filter/search toolbar, signal card, source/evidence drawer, access teaser, subscriber opportunity detail panel, and loading/empty/error states.
**Responsive behavior**: Desktop uses a filter rail and detail side panel; narrow screens stack filters above the feed and render detail as a full-width panel.

Use Fluent UI v9 primitives for buttons, inputs, comboboxes, checkboxes, badges, cards, drawers, tabs, and message bars. Keep public and subscriber modes visually distinct through an explicit mode toggle and access status, while preserving the same signal-card layout. Do not put sensitive subscriber fields in hidden DOM nodes; render them only after the entitled API response.

## 7. Development & Validation

### Commands

The eventual implementation must provide these root commands:

```text
npm install
npm run validate:fixtures
npm run dev
npm run dev:web
npm run dev:api
npm run build
npm run test
npm run test:e2e
```

`npm run dev` starts the API and Vite web app together, with the API on a documented local port and Vite proxying `/api` requests. `validate:fixtures` is required before `dev`, `build`, and test commands. Exact ports may be chosen during implementation but must be recorded in `README.md` and avoid hard-coded production URLs.

### Test coverage

- Unit tests for each source adapter, deterministic key generation, deduplication, date/domain filtering, and public/private DTO projection.
- API tests for default feed, every filter family, search, bounded limits, missing signal, public `403`, entitled opportunity detail, and fixture-load failure.
- Browser smoke tests for initial load, filter combination, URL persistence, empty state, public teaser, demo detail, responsive layout, and browser refresh.
- A leakage assertion serializes every public endpoint response and fails if it contains known private keys such as `buyer_map`, `budget`, `scope`, `opportunity_continuity`, `sales_readiness`, or `rank`.

## 8. Dev, QA & Production Path

For this task, only local development is implemented later. The future production path is documented for compatibility: keep fixture validation and normalization as a service boundary, replace the in-memory repository with a database repository, add real identity/entitlement resolution, and preserve the public DTO contract.

Development uses committed fixtures and deterministic tests. QA uses the same fixture manifest plus generated malformed/duplicate cases and runs API, leakage, and browser smoke suites. A future production migration must load into staging, compare normalized counts and hashes, publish atomically, retain old versions for rollback, and monitor authorization denials, citation coverage, API latency, and fixture-to-record count changes. No production deployment or migration is part of this prototype.

## 9. Acceptance Criteria

- `npm run validate:fixtures` passes for Citizens, Commerce Bank, and Synovus fixtures and reports normalized counts.
- The local app starts with one documented command and displays signals from all three institutions.
- Users can search and combine institution, domain, technology, and recency filters; the URL reflects the active query.
- Public signal cards show only approved public fields and source evidence metadata.
- Public users see a gated opportunity teaser; an API response in public mode contains no subscriber fields.
- Demo subscriber mode retrieves and renders opportunity detail through the API entitlement path, including only the contract-defined detail fields.
- The same opportunity IDs remain stable across reloading and fixture normalization.
- Invalid or conflicting fixtures fail startup/validation with actionable source paths.
- Unit, API, leakage, and browser smoke tests pass, including a responsive narrow viewport check.
- No external secrets, datastore, cloud resource, or production deployment is required.

## 10. Risks & Decisions

- The supplied files contain deeply nested, source-shaped JSON; adapters must isolate source changes from the UI contract.
- Commerce Bank and Synovus data is not supplied in this workspace; fixture records must be synthetic/equivalent and clearly labeled rather than presented as factual intelligence.
- The local demo entitlement is intentionally not security. Production must replace the header/mode simulation with verified identity and entitlement checks.
- Cursor pagination is unnecessary for the small local fixture set, but response fields should retain `nextCursor` compatibility for the later database-backed implementation.
- No code, generated app scaffold, or server is part of this planning step.