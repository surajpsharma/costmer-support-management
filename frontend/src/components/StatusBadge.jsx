import { Circle, Clock, CheckCircle2 } from 'lucide-react';

const STATUS_CONFIG = {
  Open: {
    className: 'badge badge-open',
    icon: <Circle size={7} fill="currentColor" />,
    label: 'Open',
  },
  'In Progress': {
    className: 'badge badge-progress',
    icon: <Clock size={10} />,
    label: 'In Progress',
  },
  Closed: {
    className: 'badge badge-closed',
    icon: <CheckCircle2 size={10} />,
    label: 'Closed',
  },
};

const PRIORITY_CONFIG = {
  Low: { className: 'badge badge-priority-low', label: 'Low' },
  Medium: { className: 'badge badge-priority-medium', label: 'Medium' },
  High: { className: 'badge badge-priority-high', label: 'High' },
  Critical: { className: 'badge badge-priority-critical', label: '🔴 Critical' },
};

export function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG['Open'];
  return (
    <span className={config.className}>
      {config.icon}
      {config.label}
    </span>
  );
}

export function PriorityBadge({ priority }) {
  const config = PRIORITY_CONFIG[priority] || PRIORITY_CONFIG['Medium'];
  return <span className={config.className}>{config.label}</span>;
}
