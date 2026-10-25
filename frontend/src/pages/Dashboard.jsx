import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard.jsx';
import JobCard from '../components/JobCard.jsx';
import { loadJobs } from '../storage.js';

export default function Dashboard() {
  const jobs = loadJobs();
  const countByStatus = status => jobs.filter(j => j.status === status).length;
  const recentJobs = [...jobs]
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    .slice(0, 3);

  return (
    <div className="card">
      <h1>Dashboard</h1>
      <div className="subhead">Overview of your job applications</div>

      <div className="stats-row">
        <StatCard number={jobs.length} label="Total" />
        <StatCard number={countByStatus('applied')} label="Applied" />
        <StatCard number={countByStatus('interview')} label="Interview" />
        <StatCard number={countByStatus('offer')} label="Offer" />
        <StatCard number={countByStatus('rejected')} label="Rejected" />
      </div>

      <h2 style={{ marginTop: '2rem' }}>Recent applications</h2>
      <div className="jobs-grid">
        {recentJobs.length === 0 ? (
          <div className="empty-message">
            No applications yet. <Link to="/add">Add your first job!</Link>
          </div>
        ) : (
          recentJobs.map(job => <JobCard key={job.id} job={job} />)
        )}
      </div>
    </div>
  );
}
