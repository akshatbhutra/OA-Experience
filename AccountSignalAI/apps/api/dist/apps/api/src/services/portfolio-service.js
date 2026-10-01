export class PortfolioService {
    data;
    constructor(data) {
        this.data = data;
    }
    facets() { return { institutions: this.data.institutions, institutionTypes: [...new Set(this.data.institutions.map(item => item.institutionType))], domains: [...new Set(this.data.signals.map(item => item.domain))].sort(), technologies: [...new Set(this.data.signals.flatMap(item => item.technologyCategories))].sort(), recencyOptions: ['7d', '30d', '90d'] }; }
    signals(query) {
        const normalized = query.q?.toLowerCase().trim();
        let items = this.data.signals.filter(signal => !normalized || [signal.title, signal.summary, signal.domain, signal.institution.name, ...signal.technologyCategories].join(' ').toLowerCase().includes(normalized));
        if (query.institution?.length)
            items = items.filter(item => query.institution.includes(item.institution.slug));
        if (query.institutionType?.length)
            items = items.filter(item => query.institutionType.includes(item.institution.institutionType));
        if (query.domain?.length)
            items = items.filter(item => query.domain.includes(item.domain));
        if (query.technology?.length)
            items = items.filter(item => query.technology.some(value => item.technologyCategories.includes(value)));
        if (query.since)
            items = items.filter(item => item.observedAt >= query.since);
        if (query.until)
            items = items.filter(item => item.observedAt <= query.until);
        items.sort((a, b) => query.sort === 'relevance' && normalized ? Number(b.title.toLowerCase().includes(normalized)) - Number(a.title.toLowerCase().includes(normalized)) : b.observedAt.localeCompare(a.observedAt));
        return { items: items.slice(0, Math.min(Math.max(query.limit ?? 20, 1), 50)), facets: this.facets(), nextCursor: null, updatedAt: new Date().toISOString() };
    }
    findSignal(id) { return this.data.signals.find(item => item.id === id); }
    opportunity(signalId) { const signal = this.findSignal(signalId); return signal?.hasSubscriberIntelligence && signal.relatedOpportunityId ? this.data.opportunities.get(signal.relatedOpportunityId) : undefined; }
}
