# AccountSignal Portfolio Prototype

Local-only TypeScript prototype for the AccountSignal financial-services intelligence feed.

## Run

```powershell
npm install
npm run validate:fixtures
npm run dev
```

The API listens on `http://localhost:4000` and the Vite web app listens on `http://localhost:5173`. `npm run dev` starts both; the web proxy forwards `/api` and `/health` to the API.

Useful checks:

```powershell
npm run test
npm run build
npm run dev:api
npm run dev:web
```

The API loads the supplied Citizens Step 2 and Step 8A files plus synthetic, clearly labeled Commerce Bank and Synovus fixtures. The original Citizens files are never modified. The local demo entitlement is the `x-demo-entitlement: subscriber` header, set by the Public/Demo subscriber switch in the web app. No production authentication, secrets, database, cloud resource, or external service is required.
