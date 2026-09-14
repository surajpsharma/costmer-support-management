import { Link, useNavigate } from 'react-router-dom';
import { Headphones, Plus, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <div className="navbar-logo-icon">
            <Headphones size={16} color="#fff" />
          </div>
          Datastraw
          <span>CRM</span>
        </Link>

        {/* Actions */}
        <div className="navbar-actions">
          <button
            id="nav-dashboard-btn"
            className="btn btn-ghost"
            onClick={() => navigate('/')}
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <LayoutDashboard size={15} />
            Dashboard
          </button>
          <button
            id="nav-new-ticket-btn"
            className="btn btn-primary"
            onClick={() => navigate('/create')}
          >
            <Plus size={16} />
            New Ticket
          </button>
        </div>
      </div>
    </nav>
  );
}
