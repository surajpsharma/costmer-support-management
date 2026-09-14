import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, User, Mail, Calendar, Clock, MessageSquare,
  RefreshCw, Save, AlertCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { getTicketById, updateTicket } from '../services/api';
import { StatusBadge, PriorityBadge } from '../components/StatusBadge';

const STATUSES = ['Open', 'In Progress', 'Closed'];
const PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];

function formatDate(d) {
  return new Date(d).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function NoteItem({ note }) {
  return (
    <div className="note-item">
      <div className="note-meta">
        <span className="note-author">{note.author || 'Support Agent'}</span>
        <span className="note-date">{formatDate(note.created_at)}</span>
      </div>
      <p className="note-text">{note.note_text}</p>
    </div>
  );
}

export default function TicketDetail() {
  const { ticket_id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Status/priority update
  const [newStatus, setNewStatus] = useState('');
  const [newPriority, setNewPriority] = useState('');
  const [updating, setUpdating] = useState(false);

  // Add note
  const [noteText, setNoteText] = useState('');
  const [noteAuthor, setNoteAuthor] = useState('Support Agent');
  const [addingNote, setAddingNote] = useState(false);

  // Fetch ticket
  const fetchTicket = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getTicketById(ticket_id);
      const { notes: n, ...t } = res.data.data;
      setTicket(t);
      setNotes(n || []);
      setNewStatus(t.status);
      setNewPriority(t.priority);
    } catch (err) {
      setError(err?.response?.data?.message || 'Ticket not found.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTicket(); }, [ticket_id]);

  // Update status / priority
  const handleUpdateDetails = async () => {
    if (newStatus === ticket.status && newPriority === ticket.priority) {
      toast('No changes to save.', { icon: 'ℹ️' });
      return;
    }
    setUpdating(true);
    try {
      const res = await updateTicket(ticket_id, { status: newStatus, priority: newPriority });
      const { notes: n, ...t } = res.data.data;
      setTicket(t);
      setNotes(n || []);
      toast.success('Ticket updated successfully!');
    } catch (err) {
      toast.error('Failed to update ticket.');
    } finally {
      setUpdating(false);
    }
  };

  // Add note
  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) {
      toast.error('Note cannot be empty.');
      return;
    }
    setAddingNote(true);
    try {
      const res = await updateTicket(ticket_id, {
        note_text: noteText,
        author: noteAuthor || 'Support Agent',
      });
      const { notes: n, ...t } = res.data.data;
      setTicket(t);
      setNotes(n || []);
      setNoteText('');
      toast.success('Note added!');
    } catch (err) {
      toast.error('Failed to add note.');
    } finally {
      setAddingNote(false);
    }
  };

  if (loading) {
    return (
      <main className="page-wrapper">
        <div className="container">
          <div className="spinner-wrapper"><div className="spinner" /></div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-wrapper">
        <div className="container" style={{ maxWidth: 600 }}>
          <button className="back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
          <div className="card" style={{ padding: 40, textAlign: 'center' }}>
            <AlertCircle size={48} style={{ color: 'var(--status-closed)', margin: '0 auto 16px' }} />
            <h2 style={{ marginBottom: 8 }}>Ticket Not Found</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>{error}</p>
            <button className="btn btn-primary" onClick={() => navigate('/')}>Go to Dashboard</button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page-wrapper">
      <div className="container">
        {/* Back */}
        <button id="detail-back-btn" className="back-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <div className="detail-layout">
          {/* ── Left: Ticket Info + Notes ──────────── */}
          <div>
            <div className="card detail-card">
              {/* Header */}
              <div className="detail-header">
                <div className="detail-ticket-id">{ticket.ticket_id}</div>
                <h1 className="detail-subject">{ticket.subject}</h1>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <StatusBadge status={ticket.status} />
                  <PriorityBadge priority={ticket.priority} />
                </div>
              </div>

              {/* Customer Info */}
              <div className="detail-field">
                <div className="detail-field-label">Customer</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
                  <div className="ticket-meta-item">
                    <User size={14} />
                    <span className="detail-field-value">{ticket.customer_name}</span>
                  </div>
                  <div className="ticket-meta-item">
                    <Mail size={14} />
                    <a
                      href={`mailto:${ticket.customer_email}`}
                      className="detail-field-value"
                      style={{ color: 'var(--accent-2)' }}
                    >
                      {ticket.customer_email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Timestamps */}
              <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 20 }}>
                <div className="detail-field" style={{ marginBottom: 0 }}>
                  <div className="detail-field-label">Created</div>
                  <div className="ticket-meta-item" style={{ marginTop: 4 }}>
                    <Calendar size={13} />
                    <span className="detail-field-value">{formatDate(ticket.created_at)}</span>
                  </div>
                </div>
                <div className="detail-field" style={{ marginBottom: 0 }}>
                  <div className="detail-field-label">Last Updated</div>
                  <div className="ticket-meta-item" style={{ marginTop: 4 }}>
                    <Clock size={13} />
                    <span className="detail-field-value">{formatDate(ticket.updated_at)}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="detail-field">
                <div className="detail-field-label">Description</div>
                <p className="detail-field-value" style={{ whiteSpace: 'pre-wrap' }}>
                  {ticket.description}
                </p>
              </div>

              {/* ── Notes Timeline ─────────────────────── */}
              <div className="divider" />
              <div className="notes-section">
                <div className="notes-title">
                  <MessageSquare size={14} />
                  Notes & Comments ({notes.length})
                </div>

                {notes.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 16 }}>
                    No notes yet. Add the first note below.
                  </p>
                ) : (
                  notes.map((note) => <NoteItem key={note._id} note={note} />)
                )}

                {/* Add Note Form */}
                <div className="add-note-form">
                  <div className="add-note-title">Add a Note</div>
                  <form id="add-note-form" onSubmit={handleAddNote}>
                    <div className="form-grid" style={{ gap: 12 }}>
                      <div className="form-group">
                        <label className="form-label" htmlFor="note-author">Author</label>
                        <input
                          id="note-author"
                          type="text"
                          className="form-input"
                          placeholder="Support Agent"
                          value={noteAuthor}
                          onChange={(e) => setNoteAuthor(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="note-text">Note *</label>
                        <textarea
                          id="note-text"
                          className="form-textarea"
                          placeholder="Add your note or comment here…"
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                          rows={3}
                        />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                          id="add-note-submit-btn"
                          type="submit"
                          className="btn btn-primary"
                          disabled={addingNote}
                        >
                          <MessageSquare size={14} />
                          {addingNote ? 'Adding…' : 'Add Note'}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Actions Sidebar ─────────────── */}
          <aside>
            <div className="card sidebar-card">
              <div className="sidebar-section">
                <div className="sidebar-label">Update Status</div>
                <select
                  id="detail-status-select"
                  className="form-select"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  style={{ marginBottom: 12 }}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="sidebar-section">
                <div className="sidebar-label">Update Priority</div>
                <select
                  id="detail-priority-select"
                  className="form-select"
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value)}
                  style={{ marginBottom: 12 }}
                >
                  {PRIORITIES.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <button
                id="detail-save-btn"
                className="btn btn-primary"
                style={{ width: '100%' }}
                onClick={handleUpdateDetails}
                disabled={updating}
              >
                <Save size={14} />
                {updating ? 'Saving…' : 'Save Changes'}
              </button>

              <div className="divider" />

              <button
                id="detail-refresh-btn"
                className="btn btn-ghost"
                style={{ width: '100%' }}
                onClick={fetchTicket}
              >
                <RefreshCw size={14} />
                Refresh
              </button>
            </div>

            {/* Ticket quick info */}
            <div className="card sidebar-card" style={{ marginTop: 16 }}>
              <div className="sidebar-label" style={{ marginBottom: 14 }}>Ticket Info</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: 'Ticket ID', value: ticket.ticket_id },
                  { label: 'Status', value: <StatusBadge status={ticket.status} /> },
                  { label: 'Priority', value: <PriorityBadge priority={ticket.priority} /> },
                  { label: 'Notes', value: `${notes.length} note${notes.length !== 1 ? 's' : ''}` },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{label}</span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
