import { loadFixtures } from '../apps/api/src/fixtures/load-fixtures.js';
const data = loadFixtures();
console.log(`Validated fixtures: ${data.institutions.length} institutions, ${data.signals.length} public signals, ${data.opportunities.size} subscriber opportunities.`);
for (const institution of data.institutions) console.log(`- ${institution.name}: ${data.signals.filter(signal => signal.institution.slug === institution.slug).length} signals${institution.prototypeFixture ? ' (prototype fixture)' : ''}`);
