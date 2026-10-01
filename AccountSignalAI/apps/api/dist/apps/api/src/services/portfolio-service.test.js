import { describe, expect, it } from 'vitest';
import { loadFixtures } from '../fixtures/load-fixtures.js';
import { PortfolioService } from './portfolio-service.js';
describe('portfolio service', () => {
    const service = new PortfolioService(loadFixtures());
    it('filters public signals without private fields', () => {
        const response = service.signals({ q: 'data', limit: 50 });
        expect(response.items.length).toBeGreaterThan(0);
        const serialized = JSON.stringify(response);
        expect(serialized).not.toMatch(/"(buyerMap|budgetRange|scope|salesReadiness|rank|continuity)"\s*:/);
    });
    it('bounds requested limits', () => expect(service.signals({ limit: 500 }).items.length).toBeLessThanOrEqual(50));
});
