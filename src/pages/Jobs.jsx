import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import JobCard from '../components/JobCard.jsx';
import { loadJobs, saveJobs } from '../storage.js';

export default function Jobs() {
  // useState remembers the list of jobs. When setJobs() is called,
  // React automatically redraws this page with the new list.
  const [jobs, setJobs] = useState(loadJobs);
  const navigate = useNavigate();

  function handleDelete(id) {
    if (!confirm('Delete this job application?')) return;
    const updated = jobs.filter(j => j.id !== id);
    saveJobs(updated);  // save to localStorage
    setJobs(updated);   // update the screen
  }

  function handleEdit(id) {
    navigate('/edit/' + id);
  }

  return (
    <div className="card">
      <h1>All Jobs</h1>
      <div className="subhead">
        {jobs.length} application{jobs.length !== 1 ? 's' : ''} tracked
      </div>

      <div className="jobs-grid">
        {jobs.length === 0 ? (
          <div className="empty-message">
            No jobs found. <Link to="/add">Add your first job</Link>
          </div>
        ) : (
          jobs.map(job => (
            <JobCard key={job.id} job={job} onEdit={handleEdit} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
}
