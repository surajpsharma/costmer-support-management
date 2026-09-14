import { useNavigate } from 'react-router-dom';
import { User, Calendar, Mail, ArrowRight } from 'lucide-react';
import { StatusBadge, PriorityBadge } from './StatusBadge';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function TicketCard({ ticket }) {
  const navigate = useNavigate();

  return (
    <article
      id={`ticket-card-${ticket.ticket_id}`}
      className="card card-clickable ticket-card"
      onClick={() => navigate(`/tickets/${ticket.ticket_id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/tickets/${ticket.ticket_id}`)}
      aria-label={`Ticket ${ticket.ticket_id}: ${ticket.subject}`}
    >
      {/* Header */}
      <div className="card-header">
        <div>
          <div className="ticket-id">{ticket.ticket_id}</div>
          <h3 className="ticket-subject">{ticket.subject}</h3>
        </div>
        <ArrowRight size={16} style={{ color: 'var(--text-muted)', flexShrink: 0, marginTop: 4 }} />
      </div>

      {/* Description preview */}
      <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 0 }}>
        {ticket.description.length > 100
          ? ticket.description.slice(0, 100) + '…'
          : ticket.description}
      </p>

      {/* Meta */}
      <div className="ticket-meta">
        <div className="ticket-meta-item">
          <User size={12} />
          {ticket.customer_name}
        </div>
        <div className="ticket-meta-item">
          <Mail size={12} />
          {ticket.customer_email}
        </div>
        <div className="ticket-meta-item" style={{ marginLeft: 'auto' }}>
          <Calendar size={12} />
          {formatDate(ticket.created_at)}
        </div>
      </div>

      {/* Badges */}
      <div className="ticket-badges" style={{ marginTop: 10 }}>
        <StatusBadge status={ticket.status} />
        <PriorityBadge priority={ticket.priority} />
      </div>
    </article>
  );
}
