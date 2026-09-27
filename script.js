
/* ============================================================
   Job Tracker – Shared JavaScript
   Handles data storage, rendering, and form logic.
   ============================================================ */

// ---------- SEED DATA ----------
const SEED_JOBS = [
  { id: '1', title: 'Frontend Developer', company: 'Acme Corp', status: 'applied', location: 'Remote', date: '2025-03-10', notes: 'React required.' },
  { id: '2', title: 'Backend Engineer', company: 'DataFlow', status: 'interview', location: 'Bangalore', date: '2025-03-12', notes: 'Node.js & Postgres.' },
  { id: '3', title: 'UI Designer', company: 'Pixely', status: 'offer', location: 'Remote', date: '2025-03-01', notes: 'Figma portfolio.' },
  { id: '4', title: 'DevOps Intern', company: 'CloudNine', status: 'rejected', location: 'Hybrid', date: '2025-02-20', notes: 'No visa.' },
];

// ---------- STORAGE ----------
function loadJobs() {
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

function saveJobs(jobs) {
  localStorage.setItem('jobtracker_jobs', JSON.stringify(jobs));
}

// ---------- UTILITIES ----------
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
}

function getStatusClass(status) {
  const map = { applied: 'applied', interview: 'interview', offer: 'offer', rejected: 'rejected' };
  return map[status] || 'applied';
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr + 'T00:00:00');
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text).replace(/[&<>"]/g, function (m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    if (m === '"') return '&quot;';
    return m;
  });
}

// ---------- DASHBOARD PAGE ----------
function renderDashboard() {
  const jobs = loadJobs();

  const total = jobs.length;
  const applied = jobs.filter(j => j.status === 'applied').length;
  const interview = jobs.filter(j => j.status === 'interview').length;
  const offer = jobs.filter(j => j.status === 'offer').length;
  const rejected = jobs.filter(j => j.status === 'rejected').length;

  const statsRow = document.getElementById('stats-row');
  if (statsRow) {
    statsRow.innerHTML = `
      <div class="stat-card"><div class="stat-number">${total}</div><div class="stat-label">Total</div></div>
      <div class="stat-card"><div class="stat-number">${applied}</div><div class="stat-label">Applied</div></div>
      <div class="stat-card"><div class="stat-number">${interview}</div><div class="stat-label">Interview</div></div>
      <div class="stat-card"><div class="stat-number">${offer}</div><div class="stat-label">Offer</div></div>
      <div class="stat-card"><div class="stat-number">${rejected}</div><div class="stat-label">Rejected</div></div>
    `;
  }

  const recentJobs = [...jobs].sort((a, b) => (b.date || '').localeCompare(a.date || '')).slice(0, 3);
  const container = document.getElementById('recent-jobs');
  if (container) {
    if (recentJobs.length === 0) {
      container.innerHTML = `<div class="empty-message">No applications yet. <a href="add.html">Add your first job!</a></div>`;
    } else {
      container.innerHTML = recentJobs.map(job => `
        <div class="job-card">
          <div class="job-title">${escapeHtml(job.title)}</div>
          <div class="job-company">🏢 ${escapeHtml(job.company)}</div>
          <div class="job-status ${getStatusClass(job.status)}">${job.status}</div>
          <div class="job-meta">
            <span>📅 ${formatDate(job.date)}</span>
            <span>📍 ${escapeHtml(job.location || '—')}</span>
          </div>
        </div>
      `).join('');
    }
  }
}

// ---------- ALL JOBS PAGE ----------
function renderJobsPage() {
  const jobs = loadJobs();

  const countEl = document.getElementById('jobs-count');
  if (countEl) {
    countEl.textContent = `${jobs.length} application${jobs.length !== 1 ? 's' : ''} tracked`;
  }

  const container = document.getElementById('jobs-container');
  if (!container) return;

  if (jobs.length === 0) {
    container.innerHTML = `<div class="empty-message">No jobs found. <a href="add.html">Add your first job</a></div>`;
    return;
  }

  container.innerHTML = jobs.map(job => `
    <div class="job-card" data-job-id="${job.id}">
      <div class="job-title">${escapeHtml(job.title)}</div>
      <div class="job-company">🏢 ${escapeHtml(job.company)}</div>
      <div class="job-status ${getStatusClass(job.status)}">${job.status}</div>
      <div class="job-meta">
        <span>📅 ${formatDate(job.date)}</span>
        <span>📍 ${escapeHtml(job.location || '—')}</span>
      </div>
      <div class="job-actions">
        <button class="edit-btn" data-id="${job.id}">Edit</button>
        <button class="delete-btn" data-id="${job.id}">Delete</button>
      </div>
    </div>
  `).join('');

  // attach event listeners
  container.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      // store edit id in sessionStorage and navigate to add page
      sessionStorage.setItem('editJobId', id);
      window.location.href = 'add.html';
    });
  });

  container.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      if (confirm('Delete this job application?')) {
        const currentJobs = loadJobs();
        const updated = currentJobs.filter(j => j.id !== id);
        saveJobs(updated);
        renderJobsPage(); // re-render
      }
    });
  });
}

// ---------- ADD / EDIT JOB PAGE ----------
function initAddJobPage() {
  const form = document.getElementById('job-form');
  const titleEl = document.getElementById('form-title');
  const subheadEl = document.getElementById('form-subhead');
  const submitBtn = document.getElementById('submit-btn');

  const editId = sessionStorage.getItem('editJobId');
  let editingJob = null;

  if (editId) {
    const jobs = loadJobs();
    editingJob = jobs.find(j => j.id === editId);
    if (editingJob) {
      titleEl.textContent = 'Edit Job';
      subheadEl.textContent = 'Update application details';
      submitBtn.textContent = 'Update Job';

      document.getElementById('job-title').value = editingJob.title || '';
      document.getElementById('job-company').value = editingJob.company || '';
      document.getElementById('job-status').value = editingJob.status || 'applied';
      document.getElementById('job-location').value = editingJob.location || '';
      document.getElementById('job-date').value = editingJob.date || '';
      document.getElementById('job-notes').value = editingJob.notes || '';
    } else {
      sessionStorage.removeItem('editJobId');
    }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('job-title').value.trim();
    const company = document.getElementById('job-company').value.trim();
    const status = document.getElementById('job-status').value;
    const location = document.getElementById('job-location').value.trim();
    const date = document.getElementById('job-date').value;
    const notes = document.getElementById('job-notes').value.trim();

    if (!title || !company) {
      alert('Title and Company are required.');
      return;
    }

    const jobs = loadJobs();

    if (editingJob) {
      // Update existing
      const index = jobs.findIndex(j => j.id === editingJob.id);
      if (index !== -1) {
        jobs[index] = {
          ...jobs[index],
          title, company, status, location,
          date: date || jobs[index].date,
          notes,
        };
      }
    } else {
      // Add new
      jobs.push({
        id: generateId(),
        title,
        company,
        status,
        location,
        date: date || new Date().toISOString().split('T')[0],
        notes,
      });
    }

    saveJobs(jobs);
    sessionStorage.removeItem('editJobId');
    window.location.href = 'jobs.html';
  });
}

// ---------- INITIALIZATION HELPERS ----------
// Each page calls the appropriate function after DOM is ready.