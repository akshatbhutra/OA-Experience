import type { Facets, PublicSignal, SignalResponse } from '../../../../packages/contracts/src/portfolio.js';
import type { CanonicalData } from '../fixtures/normalize.js';
export interface SignalQuery {
    q?: string;
    institution?: string[];
    institutionType?: string[];
    domain?: string[];
    technology?: string[];
    since?: string;
    until?: string;
    sort?: 'recent' | 'relevance';
    limit?: number;
}
export declare class PortfolioService {
    private readonly data;
    constructor(data: CanonicalData);
    facets(): Facets;
    signals(query: SignalQuery): SignalResponse;
    findSignal(id: string): PublicSignal | undefined;
    opportunity(signalId: string): import("../../../../packages/contracts/src/portfolio.js").OpportunityDetail | undefined;
}
