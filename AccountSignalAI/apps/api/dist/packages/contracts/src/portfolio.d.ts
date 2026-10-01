export type InstitutionType = 'Regional bank' | 'National bank';
export type Confidence = 'High' | 'Medium' | 'Low';
export interface Institution {
    id: string;
    slug: string;
    name: string;
    institutionType: InstitutionType;
    prototypeFixture: boolean;
}
export interface Evidence {
    id: string;
    sourceTitle: string;
    sourceType: string;
    url?: string;
    publicationDate: string;
    summary: string;
    isPublic: true;
}
export interface PublicSignal {
    id: string;
    institution: Pick<Institution, 'slug' | 'name' | 'institutionType' | 'prototypeFixture'>;
    sourceRecordKey: string;
    signalType: string;
    title: string;
    summary: string;
    implication: string;
    domain: string;
    technologyCategories: string[];
    observedAt: string;
    publishedAt: string;
    confidence?: Confidence;
    claimSafetyNote: string;
    evidence: Evidence[];
    hasSubscriberIntelligence: boolean;
    publicLabel?: string;
    relatedOpportunityId?: string;
}
export interface OpportunityDetail {
    opportunityId: string;
    title: string;
    classification: string;
    priority: string;
    rank: number;
    salesReadiness: string;
    executiveSummary: string;
    businessContext: string[];
    technologyContext: string[];
    buyerMap: string[];
    budgetRange: string;
    implementationWindow: string;
    scope: string[];
    continuity: string;
    pursuitGuidance: string;
}
export interface Facets {
    institutions: Institution[];
    institutionTypes: string[];
    domains: string[];
    technologies: string[];
    recencyOptions: string[];
}
export interface SignalResponse {
    items: PublicSignal[];
    facets: Facets;
    nextCursor: null;
    updatedAt: string;
}
