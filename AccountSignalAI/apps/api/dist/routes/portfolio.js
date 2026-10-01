import { Router } from 'express';
export function portfolioRoutes(service) {
    const router = Router();
    router.get('/filters', (_req, res) => res.json(service.facets()));
    router.get('/summary', (_req, res) => res.json({ totalInstitutions: service.facets().institutions.length, publicSignals: service.signals({ limit: 50 }).items.length, updatedRecently: service.signals({ since: '2026-09-01', limit: 50 }).items.length }));
    router.get('/signals', (req, res) => {
        const list = (key) => typeof req.query[key] === 'string' ? String(req.query[key]).split(',').filter(Boolean) : Array.isArray(req.query[key]) ? req.query[key].map(String) : undefined;
        const query = { q: String(req.query.q ?? '') || undefined, institution: list('institution'), institutionType: list('institutionType'), domain: list('domain'), technology: list('technology'), since: String(req.query.since ?? '') || undefined, until: String(req.query.until ?? '') || undefined, sort: req.query.sort === 'relevance' ? 'relevance' : 'recent', limit: Number(req.query.limit ?? 20) };
        res.json(service.signals(query));
    });
    router.get('/signals/:signalId/opportunity', (req, res) => {
        if (!service.findSignal(req.params.signalId))
            return res.status(404).json({ code: 'SIGNAL_NOT_FOUND', message: 'Signal not found.' });
        if (req.header('x-demo-entitlement') !== 'subscriber')
            return res.status(403).json({ code: 'SUBSCRIBER_ACCESS_REQUIRED', message: 'Demo subscriber access is required for opportunity detail.' });
        const opportunity = service.opportunity(req.params.signalId);
        if (!opportunity)
            return res.status(404).json({ code: 'OPPORTUNITY_NOT_FOUND', message: 'No related opportunity is available.' });
        return res.json(opportunity);
    });
    return router;
}
