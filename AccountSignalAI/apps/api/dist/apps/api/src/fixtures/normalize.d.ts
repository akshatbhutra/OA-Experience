import type { Institution, OpportunityDetail, PublicSignal } from '../../../../packages/contracts/src/portfolio.js';
export interface CanonicalData {
    institutions: Institution[];
    signals: PublicSignal[];
    opportunities: Map<string, OpportunityDetail>;
}
export declare function normalizeCitizens(step2: unknown, step8a: unknown): {
    institution: Institution;
    signals: PublicSignal[];
    opportunities: OpportunityDetail[];
};
export declare function normalizeSynthetic(fixture: any): {
    institution: Institution;
    signals: PublicSignal[];
    opportunities: OpportunityDetail[];
};
