# Local Prototype Integration Handoff

- Backend: `apps/api`; run `npm run dev:api`; port `4000`; health `GET /health`; build via root `npm run build`.
- Frontend: `apps/web`; run `npm run dev:web`; port `5173`; build via `npm run build`; API seam is `apps/web/src/api.ts`.
- API routes: `GET /api/v1/portfolio/signals`, `/filters`, `/summary`, and `GET /api/v1/portfolio/signals/:signalId/opportunity`; public detail returns 403; subscriber header returns detail.
- Database: none; normalized in-memory fixtures only. No seed data or migrations.
- Fixtures: supplied Citizens Step 2 and Step 8A plus `fixtures/commerce-bank.json` and `fixtures/synovus.json`.
- Services: API and web; all local prototype-only.
