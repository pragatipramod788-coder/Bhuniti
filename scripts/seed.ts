import { repoItems, projects, risks } from '../app/data/seed';
console.log(JSON.stringify({ seededAt:new Date().toISOString(), repository:repoItems.length, projects:projects.length, riskSignals:risks.length }, null, 2));
