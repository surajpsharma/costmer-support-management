import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Inbox, TrendingUp } from 'lucide-react';
import TicketCard from '../components/TicketCard';
import { getTickets } from '../services/api';

const STATUS_FILTERS = ['All', 'Open', 'In Progress', 'Closed'];
const PRIORITY_FILTERS = ['All Priorities', 'Critical', 'High', 'Medium', 'Low'];

// Debounce hook
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function Home() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState({ total: 0, open: 0, inProgress: 0, closed: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeStatus, setActiveStatus] = useState('All');
  const [activePriority, setActivePriority] = useState('All Priorities');

  const debouncedSearch = useDebounce(search, 350);

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (activeStatus !== 'All') params.status = activeStatus;
      if (activePriority !== 'All Priorities') params.priority = activePriority;
      if (debouncedSearch) params.search = debouncedSearch;

      const res = await getTickets(params);
      setTickets(res.data.data);
      setStats(res.data.stats);
    } catch (err) {
      console.error('Failed to fetch tickets:', err);
    } finally {
      setLoading(false);
    }
  }, [activeStatus, activePriority, debouncedSearch]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return (
    <main className="page-wrapper">
      <div className="container">

        {/* ── Page Header ─────────────────────────────── */}
        <div className="page-header">
          <div className="page-header-left">
            <h1>Support Dashboard</h1>
            <p>Manage and resolve customer tickets efficiently</p>
          </div>
          <button
            id="home-new-ticket-btn"
            className="btn btn-primary"
            onClick={() => navigate('/create')}
          >
            <Plus size={16} />
            New Ticket
          </button>
        </div>

        {/* ── Stats Grid ───────────────────────────────── */}
        <div className="stats-grid">
          <div className="card stat-card">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Tickets</div>
          </div>
          <div className="card stat-card">
            <div className="stat-value" style={{ WebkitTextFillColor: 'var(--status-open)', backgroundImage: 'none' }}>
              {stats.open}
            </div>
            <div className="stat-label">Open</div>
          </div>
          <div className="card stat-card">
            <div className="stat-value" style={{ WebkitTextFillColor: 'var(--status-progress)', backgroundImage: 'none' }}>
              {stats.inProgress}
            </div>
            <div className="stat-label">In Progress</div>
          </div>
          <div className="card stat-card">
            <div className="stat-value" style={{ WebkitTextFillColor: 'var(--status-closed)', backgroundImage: 'none' }}>
              {stats.closed}
            </div>
            <div className="stat-label">Closed</div>
          </div>
        </div>

        {/* ── Controls ─────────────────────────────────── */}
        <div className="controls-bar">
          {/* Search */}
          <div className="search-wrapper">
            <Search size={15} className="search-icon" />
            <input
              id="ticket-search-input"
              type="text"
              className="search-input"
              placeholder="Search by name, email, ticket ID, or subject…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search tickets"
            />
          </div>

          {/* Status Filter */}
          <div className="filter-tabs" role="tablist" aria-label="Filter by status">
            {STATUS_FILTERS.map((s) => (
              <button
                key={s}
                id={`filter-status-${s.replace(' ', '-').toLowerCase()}`}
                role="tab"
                aria-selected={activeStatus === s}
                className={`filter-tab ${activeStatus === s ? 'active' : ''}`}
                onClick={() => setActiveStatus(s)}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Priority Filter */}
          <select
            id="filter-priority-select"
            className="form-select"
            style={{ width: 'auto', padding: '9px 40px 9px 14px' }}
            value={activePriority}
            onChange={(e) => setActivePriority(e.target.value)}
            aria-label="Filter by priority"
          >
            {PRIORITY_FILTERS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* ── Ticket Grid ──────────────────────────────── */}
        {loading ? (
          <div className="spinner-wrapper">
            <div className="spinner" />
          </div>
        ) : tickets.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <Inbox size={30} />
            </div>
            <h3>No tickets found</h3>
            <p>
              {search || activeStatus !== 'All'
                ? 'Try adjusting your search or filter.'
                : 'Create your first support ticket to get started.'}
            </p>
            {!search && activeStatus === 'All' && (
              <button
                id="empty-create-ticket-btn"
                className="btn btn-primary"
                onClick={() => navigate('/create')}
              >
                <Plus size={16} />
                Create Ticket
              </button>
            )}
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <TrendingUp size={14} style={{ color: 'var(--text-muted)' }} />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Showing {tickets.length} ticket{tickets.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="tickets-grid">
              {tickets.map((ticket) => (
                <TicketCard key={ticket._id} ticket={ticket} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
