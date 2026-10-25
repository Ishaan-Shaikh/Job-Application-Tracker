/* ============================================================
   Storage + helper functions (plain JavaScript, no React here)
   ============================================================ */

const SEED_JOBS = [
  { id: '1', title: 'Frontend Developer', company: 'Acme Corp', status: 'applied', location: 'Remote', date: '2025-03-10', notes: 'React required.' },
  { id: '2', title: 'Backend Engineer', company: 'DataFlow', status: 'interview', location: 'Bangalore', date: '2025-03-12', notes: 'Node.js & Postgres.' },
  { id: '3', title: 'UI Designer', company: 'Pixely', status: 'offer', location: 'Remote', date: '2025-03-01', notes: 'Figma portfolio.' },
  { id: '4', title: 'DevOps Intern', company: 'CloudNine', status: 'rejected', location: 'Hybrid', date: '2025-02-20', notes: 'No visa.' },
];

export function loadJobs() {
  const stored = localStorage.getItem('jobtracker_jobs');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.warn('Invalid stored jobs, using seed data');
    }
  }
  localStorage.setItem('jobtracker_jobs', JSON.stringify(SEED_JOBS));
  return [...SEED_JOBS];
}

export function saveJobs(jobs) {
  localStorage.setItem('jobtracker_jobs', JSON.stringify(jobs));
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
}

export function getStatusClass(status) {
  const map = { applied: 'applied', interview: 'interview', offer: 'offer', rejected: 'rejected' };
  return map[status] || 'applied';
}

export function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr + 'T00:00:00');
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
