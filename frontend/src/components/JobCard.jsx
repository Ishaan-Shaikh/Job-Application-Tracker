import { formatDate, getStatusClass } from '../storage.js';

// onEdit / onDelete are optional props. If they are not passed
// (like on the Dashboard), the Edit/Delete buttons are not shown.
export default function JobCard({ job, onEdit, onDelete }) {
  return (
    <div className="job-card">
      <div className="job-title">{job.title}</div>
      <div className="job-company">🏢 {job.company}</div>
      <div className={'job-status ' + getStatusClass(job.status)}>{job.status}</div>
      <div className="job-meta">
        <span>📅 {formatDate(job.date)}</span>
        <span>📍 {job.location || '—'}</span>
      </div>

      {onEdit && onDelete && (
        <div className="job-actions">
          <button className="edit-btn" onClick={() => onEdit(job.id)}>Edit</button>
          <button className="delete-btn" onClick={() => onDelete(job.id)}>Delete</button>
        </div>
      )}
    </div>
  );
}
