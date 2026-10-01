import express from 'express';
import cors from 'cors';
import { loadFixtures } from './fixtures/load-fixtures.js';
import { PortfolioService } from './services/portfolio-service.js';
import { portfolioRoutes } from './routes/portfolio.js';
export function createApp() {
    const data = loadFixtures();
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.get('/health', (_req, res) => res.json({ status: 'ok', fixtureLoad: 'ready', counts: { institutions: data.institutions.length, signals: data.signals.length, opportunities: data.opportunities.size } }));
    app.use('/api/v1/portfolio', portfolioRoutes(new PortfolioService(data)));
    return app;
}
if (process.env.NODE_ENV !== 'test') {
    const port = Number(process.env.API_PORT ?? 4000);
    createApp().listen(port, () => console.log(`AccountSignal API listening on http://localhost:${port}`));
}
