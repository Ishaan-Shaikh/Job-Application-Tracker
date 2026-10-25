import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/jobs', label: 'All Jobs' },
  { to: '/add', label: 'Add Job' },
  { to: '/about', label: 'About' },
];

// NavLink automatically adds the class "active" to the link of the
// current page, so the existing CSS (.nav-links a.active) just works.
export default function Navbar() {
  return (
    <nav>
      <div className="logo"><span>📋</span> JobTrack</div>
      <div className="nav-links">
        {links.map(link => (
          <NavLink key={link.to} to={link.to} end>
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
