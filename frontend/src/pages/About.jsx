export default function About() {
  return (
    <div className="card">
      <h1>About JobTrack</h1>
      <div className="subhead">Simple, clean, and to the point</div>

      <p style={{ marginBottom: '1.5rem', color: '#2e3a4e', lineHeight: 1.6 }}>
        This is a lightweight job tracking application built with HTML, CSS, JavaScript,
        <strong> React</strong> and <strong>Vite</strong>. It uses <strong>localStorage</strong> to
        save your job applications — no backend required. Navigate between pages and manage your
        job search easily.
      </p>

      <div style={{ background: '#f2f6ff', borderRadius: '1.5rem', padding: '1.5rem' }}>
        <p style={{ fontWeight: 500, marginBottom: '0.5rem' }}>✨ Features</p>
        <ul style={{ marginLeft: '1.5rem', color: '#1e2f4a', lineHeight: 1.8 }}>
          <li>Dashboard with status counts</li>
          <li>Add, edit, delete job applications</li>
          <li>Status tracking (Applied, Interview, Offer, Rejected)</li>
          <li>Data persists in your browser</li>
          <li>Fully responsive UI (Flexbox + CSS Grid)</li>
          <li>Reusable React components (Navbar, Footer, StatCard, JobCard)</li>
        </ul>
      </div>

      <p style={{ marginTop: '1.8rem', color: '#6e7d99', fontSize: '0.9rem' }}>
        Built as a 4-page front-end project with React Router, shared CSS and reusable components.
      </p>
    </div>
  );
}
