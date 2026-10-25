import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { loadJobs, saveJobs, generateId } from '../storage.js';

const emptyForm = { title: '', company: '', status: 'applied', location: '', date: '', notes: '' };

// This one page is used for both "Add" (/add) and "Edit" (/edit/:id)
export default function AddJob() {
  const { id } = useParams();                 // only exists on /edit/:id
  const navigate = useNavigate();
  const editingJob = id ? loadJobs().find(j => j.id === id) : null;

  // "form" holds what is typed in the inputs
  const [form, setForm] = useState(editingJob || emptyForm);

  // One handler for all inputs: the input's name matches the key in "form"
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const title = form.title.trim();
    const company = form.company.trim();
    if (!title || !company) {
      alert('Title and Company are required.');
      return;
    }

    const cleaned = { ...form, title, company, location: form.location.trim(), notes: form.notes.trim() };
    const jobs = loadJobs();

    if (editingJob) {
      saveJobs(jobs.map(j => (j.id === editingJob.id ? { ...j, ...cleaned, date: form.date || j.date } : j)));
    } else {
      const today = new Date().toISOString().split('T')[0];
      saveJobs([...jobs, { ...cleaned, id: generateId(), date: form.date || today }]);
    }

    navigate('/jobs');
  }

  return (
    <div className="card">
      <h1>{editingJob ? 'Edit Job' : 'Add Job'}</h1>
      <div className="subhead">
        {editingJob ? 'Update application details' : 'Track a new application'}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Job Title *</label>
            <input id="title" name="title" type="text" required placeholder="e.g. Frontend Developer"
              value={form.title} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="company">Company *</label>
            <input id="company" name="company" type="text" required placeholder="e.g. Acme Corp"
              value={form.company} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select id="status" name="status" value={form.status} onChange={handleChange}>
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input id="location" name="location" type="text" placeholder="Remote, Hybrid..."
              value={form.location} onChange={handleChange} />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date Applied</label>
          <input id="date" name="date" type="date" value={form.date} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea id="notes" name="notes" placeholder="Any extra details..."
            value={form.notes} onChange={handleChange} />
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.8rem' }}>
          <button type="submit" className="btn" style={{ flex: 1 }}>
            {editingJob ? 'Update Job' : 'Save Job'}
          </button>
          <Link to="/jobs" className="btn btn-outline" style={{ flex: 1 }}>Cancel</Link>
        </div>
      </form>
    </div>
  );
}
