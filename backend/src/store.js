/* ============================================================
   Tiny data layer: keeps jobs in data/jobs.json
   (a real project would use a database; the controller code
   would stay the same - only this file would change)
   ============================================================ */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'jobs.json');

// Same sample jobs as the frontend
const SEED_JOBS = [
  { id: '1', title: 'Frontend Developer', company: 'Acme Corp', status: 'applied', location: 'Remote', date: '2025-03-10', notes: 'React required.' },
  { id: '2', title: 'Backend Engineer', company: 'DataFlow', status: 'interview', location: 'Bangalore', date: '2025-03-12', notes: 'Node.js & Postgres.' },
  { id: '3', title: 'UI Designer', company: 'Pixely', status: 'offer', location: 'Remote', date: '2025-03-01', notes: 'Figma portfolio.' },
  { id: '4', title: 'DevOps Intern', company: 'CloudNine', status: 'rejected', location: 'Hybrid', date: '2025-02-20', notes: 'No visa.' },
];

export async function readJobs() {
  if (!existsSync(DATA_FILE)) {
    await writeJobs(SEED_JOBS);   // first run: create the file with sample data
    return [...SEED_JOBS];
  }
  const text = await readFile(DATA_FILE, 'utf-8');
  return JSON.parse(text);
}

export async function writeJobs(jobs) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(jobs, null, 2));
}
