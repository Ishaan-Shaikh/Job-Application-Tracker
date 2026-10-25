import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Jobs from './pages/Jobs.jsx';
import AddJob from './pages/AddJob.jsx';
import About from './pages/About.jsx';

// The Navbar and Footer are written once and stay on every page.
// <Routes> swaps the middle part depending on the URL.
export default function App() {
  return (
    <div className="app-container">
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/add" element={<AddJob key="add" />} />
        <Route path="/edit/:id" element={<AddJob key="edit" />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <Footer />
    </div>
  );
}
