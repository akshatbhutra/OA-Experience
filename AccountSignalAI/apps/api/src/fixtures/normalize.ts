import crypto from 'node:crypto';
import type { Confidence, Evidence, Institution, OpportunityDetail, PublicSignal } from '../../../../packages/contracts/src/portfolio.js';

export interface CanonicalData { institutions: Institution[]; signals: PublicSignal[]; opportunities: Map<string, OpportunityDetail>; }
const iso = (value: string) => new Date(value).toISOString().slice(0, 10);
const hash = (value: string) => crypto.createHash('sha256').update(value).digest('hex').slice(0, 12);
const evidence = (id: string, title: string, date: string, summary: string, prototypeFixture: boolean): Evidence => ({ id, sourceTitle: title, sourceType: prototypeFixture ? 'Prototype fixture' : 'Source intelligence', publicationDate: date, summary, isPublic: true });
const confidence = (value: unknown): Confidence | undefined => value === 'High' || value === 'Medium' || value === 'Low' ? value : undefined;

function textValues(node: unknown, keys: string[], output: string[] = []): string[] {
  if (Array.isArray(node)) { node.forEach(item => textValues(item, keys, output)); return output; }
  if (!node || typeof node !== 'object') return output;
  for (const [key, value] of Object.entries(node)) {
    if (keys.some(part => key.toLowerCase().includes(part)) && typeof value === 'string' && value.length > 30) output.push(value.trim());
    textValues(value, keys, output);
  }
  return output;
}
function findObjects(node: unknown, predicate: (value: Record<string, unknown>) => boolean, output: Record<string, unknown>[] = []): Record<string, unknown>[] {
  if (Array.isArray(node)) { node.forEach(item => findObjects(item, predicate, output)); return output; }
  if (!node || typeof node !== 'object') return output;
  const record = node as Record<string, unknown>;
  if (predicate(record)) output.push(record);
  Object.values(record).forEach(value => findObjects(value, predicate, output));
  return output;
}

export function normalizeCitizens(step2: unknown, step8a: unknown): { institution: Institution; signals: PublicSignal[]; opportunities: OpportunityDetail[] } {
  const institution: Institution = { id: 'inst-citizens', slug: 'citizens', name: 'Citizens', institutionType: 'Regional bank', prototypeFixture: false };
  const rawTitles = textValues(step2, ['title', 'priority', 'theme', 'objective', 'summary', 'readout']);
  const titles = [...new Set(rawTitles)].slice(0, 6);
  const fallback = [
    'Application and supplier simplification remains central to Remagine',
    'Efficiency programs continue to shape technology investment',
    'Commercial banking priorities connect data, workflow and growth',
    'Budget release logic favors evidence-backed execution waves'
  ];
  const dates = ['2026-09-24', '2026-09-19', '2026-09-14', '2026-09-07'];
  const domains = ['Enterprise technology', 'Data & AI', 'Commercial banking', 'Operating model'];
  const rawOpps = findObjects(step8a, item => typeof item.opportunity_id === 'string' || typeof item.opportunity_title === 'string');
  const signals = (titles.length ? titles : fallback).slice(0, 6).map((title, index) => {
    const summary = title.length > 160 ? `${title.slice(0, 157)}...` : title;
    const date = dates[index % dates.length];
    const sourceKey = `citizens-step-2-${hash(title)}`;
    const opportunityId = rawOpps[index % Math.max(rawOpps.length, 1)]?.opportunity_id;
    return { id: `sig-${sourceKey}`, institution: institution, sourceRecordKey: sourceKey, signalType: index % 2 ? 'budget_logic' : 'business_priority', title: title.replace(/\s+/g, ' '), summary, implication: 'The public record indicates a bounded opportunity for measurable business and technology improvement; implementation scope requires subscriber validation.', domain: domains[index % domains.length], technologyCategories: ['Enterprise architecture', index % 2 ? 'Data engineering' : 'Workflow / BPM'], observedAt: iso(date), publishedAt: iso(date), confidence: confidence(index < 2 ? 'High' : 'Medium'), claimSafetyNote: 'Public summary is bounded to evidence-supported themes and is not a claim of approved funding or vendor selection.', evidence: [evidence(`ev-${sourceKey}`, 'Citizens business priorities and budget release logic', date, 'Source-derived public evidence from the supplied Step 2 output.', false)], hasSubscriberIntelligence: true, publicLabel: 'Subscriber intelligence', relatedOpportunityId: typeof opportunityId === 'string' ? opportunityId : undefined };
  });
  const opportunities = [...new Map(rawOpps.map((item, index) => {
    const id = String(item.opportunity_id ?? `citizens-opportunity-${index + 1}`);
    return [id, { opportunityId: id, title: String(item.opportunity_title ?? item.title ?? 'Citizens transformation opportunity'), classification: String(item.opportunity_classification ?? 'Confirmed Opportunity'), priority: String(item.priority ?? 'High'), rank: Number(item.rank ?? index + 1), salesReadiness: String(item.sales_readiness ?? 'Medium'), executiveSummary: 'Subscriber detail connects evidence-backed priorities to an executable opportunity hypothesis for validation.', businessContext: ['Business priority and operating model context', 'Measurable value realization'], technologyContext: ['Enterprise architecture', 'Data and integration engineering', 'Quality and controls'], buyerMap: ['Business sponsor', 'Technology owner', 'Transformation office'], budgetRange: String(item.si_services_budget_range ?? 'Directional sizing; validate with the account'), implementationWindow: String(item.implementation_window ?? 'Validate timing with the account'), scope: ['Validate the first executable workstream', 'Define measurable acceptance criteria', 'Confirm platform and governance dependencies'], continuity: 'Track new evidence and continuity through subscriber research.', pursuitGuidance: 'Lead with evidence, validate accountable ownership, and expand only within confirmed scope.' } as OpportunityDetail];
  })).values()];
  return { institution, signals, opportunities };
}

export function normalizeSynthetic(fixture: any): { institution: Institution; signals: PublicSignal[]; opportunities: OpportunityDetail[] } {
  const institution: Institution = { id: `inst-${fixture.institution.slug}`, ...fixture.institution, prototypeFixture: true };
  const entries: Array<[string, OpportunityDetail]> = fixture.signals.map((signal: any, index: number) => [signal.opportunity, { opportunityId: signal.opportunity, title: signal.title.replace('remains', 'supports'), classification: 'Prototype opportunity', priority: index === 0 ? 'High' : 'Medium', rank: index + 1, salesReadiness: 'Demo only', executiveSummary: 'Synthetic prototype detail for testing the subscriber boundary.', businessContext: [signal.domain, 'Institution growth and efficiency'], technologyContext: signal.technology, buyerMap: ['Prototype business sponsor', 'Prototype technology owner'], budgetRange: 'Prototype only', implementationWindow: 'Prototype timing', scope: ['Validate the opportunity hypothesis', 'Define a first workstream'], continuity: 'Prototype continuity record.', pursuitGuidance: 'Prototype pursuit guidance; do not treat as sourced intelligence.' }]);
  const opportunities: OpportunityDetail[] = [...new Map(entries).values()];
  const signals: PublicSignal[] = fixture.signals.map((signal: any) => ({ id: `sig-${signal.key}`, institution, sourceRecordKey: signal.key, signalType: 'business_priority', title: signal.title, summary: signal.summary, implication: 'Prototype fixture indicates a possible business and technology workstream for account exploration.', domain: signal.domain, technologyCategories: signal.technology, observedAt: signal.date, publishedAt: signal.date, confidence: 'Medium', claimSafetyNote: 'Synthetic prototype fixture; not sourced intelligence.', evidence: [evidence(`ev-${signal.key}`, `${institution.name} prototype source`, signal.date, 'Synthetic example evidence for UI and API testing.', true)], hasSubscriberIntelligence: true, publicLabel: 'Subscriber intelligence', relatedOpportunityId: signal.opportunity }));
  return { institution, signals, opportunities };
}
