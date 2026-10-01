import fs from 'node:fs';
import path from 'node:path';
import { jsonrepair } from 'jsonrepair';
import { normalizeCitizens, normalizeSynthetic } from './normalize.js';
export function loadFixtures(root = process.cwd()) {
    const read = (file) => {
        const source = fs.readFileSync(path.join(root, file), 'utf8');
        try {
            return JSON.parse(source);
        }
        catch (error) {
            if (!file.startsWith('Citizens '))
                throw error;
            try {
                return JSON.parse(jsonrepair(source));
            }
            catch {
                throw new Error(`Fixture validation failed for ${file}: invalid JSON near the source record boundary. ${error instanceof Error ? error.message : String(error)}`);
            }
        }
    };
    const citizens = normalizeCitizens(read('Citizens 2 - Business Priorities and Budget Release Logic.json'), read('Citizens  8A Final Opportunity Packaging_2026-09-03.json'));
    const commerce = normalizeSynthetic(read('fixtures/commerce-bank.json'));
    const synovus = normalizeSynthetic(read('fixtures/synovus.json'));
    const all = [citizens, commerce, synovus];
    const signals = all.flatMap(item => item.signals);
    const duplicateIds = signals.filter((signal, index) => signals.findIndex(other => other.id === signal.id) !== index);
    if (duplicateIds.length)
        throw new Error(`Conflicting canonical signal IDs: ${duplicateIds.map(item => item.id).join(', ')}`);
    const opportunities = new Map(all.flatMap(item => item.opportunities.map(opportunity => [opportunity.opportunityId, opportunity])));
    return { institutions: all.map(item => item.institution), signals, opportunities };
}
