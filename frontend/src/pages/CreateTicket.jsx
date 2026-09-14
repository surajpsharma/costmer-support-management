import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Ticket } from 'lucide-react';
import toast from 'react-hot-toast';
import { createTicket } from '../services/api';

const PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];

const initialForm = {
  customer_name: '',
  customer_email: '',
  subject: '',
  description: '',
  priority: 'Medium',
};

export default function CreateTicket() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.customer_name.trim()) e.customer_name = 'Customer name is required';
    if (!form.customer_email.trim()) {
      e.customer_email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(form.customer_email)) {
      e.customer_email = 'Enter a valid email address';
    }
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.description.trim()) e.description = 'Description is required';
    else if (form.description.trim().length < 10) e.description = 'Description must be at least 10 characters';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      const res = await createTicket(form);
      const ticketId = res.data.data.ticket_id;
      toast.success(`Ticket ${ticketId} created successfully!`);
      navigate(`/tickets/${ticketId}`);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to create ticket. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="page-wrapper">
      <div className="container form-wrapper">
        {/* Back */}
        <button id="create-back-btn" className="back-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>

        <div className="card form-card">
          <div className="form-title">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div className="navbar-logo-icon">
                <Ticket size={16} color="#fff" />
              </div>
              <h1>Create Support Ticket</h1>
            </div>
            <p>Fill out the form below to submit a new customer support request.</p>
          </div>

          <form id="create-ticket-form" onSubmit={handleSubmit} noValidate>
            <div className="form-grid">

              {/* Name + Email */}
              <div className="form-grid form-grid-2" style={{ marginBottom: 0 }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="customer_name">Customer Name *</label>
                  <input
                    id="customer_name"
                    name="customer_name"
                    type="text"
                    className={`form-input ${errors.customer_name ? 'error' : ''}`}
                    placeholder="John Doe"
                    value={form.customer_name}
                    onChange={handleChange}
                    autoComplete="name"
                  />
                  {errors.customer_name && <span className="form-error">{errors.customer_name}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="customer_email">Customer Email *</label>
                  <input
                    id="customer_email"
                    name="customer_email"
                    type="email"
                    className={`form-input ${errors.customer_email ? 'error' : ''}`}
                    placeholder="john@example.com"
                    value={form.customer_email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                  {errors.customer_email && <span className="form-error">{errors.customer_email}</span>}
                </div>
              </div>

              {/* Subject */}
              <div className="form-group">
                <label className="form-label" htmlFor="subject">Subject *</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  className={`form-input ${errors.subject ? 'error' : ''}`}
                  placeholder="Brief summary of the issue"
                  value={form.subject}
                  onChange={handleChange}
                />
                {errors.subject && <span className="form-error">{errors.subject}</span>}
              </div>

              {/* Priority */}
              <div className="form-group">
                <label className="form-label" htmlFor="priority">Priority</label>
                <select
                  id="priority"
                  name="priority"
                  className="form-select"
                  value={form.priority}
                  onChange={handleChange}
                >
                  {PRIORITIES.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div className="form-group">
                <label className="form-label" htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  className={`form-textarea ${errors.description ? 'error' : ''}`}
                  placeholder="Describe the issue in detail — include any error messages, steps to reproduce, and expected vs. actual behavior."
                  value={form.description}
                  onChange={handleChange}
                  rows={5}
                />
                {errors.description && <span className="form-error">{errors.description}</span>}
              </div>

              {/* Actions */}
              <div className="form-actions">
                <button
                  id="create-cancel-btn"
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => navigate('/')}
                >
                  Cancel
                </button>
                <button
                  id="create-submit-btn"
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                >
                  <Send size={15} />
                  {submitting ? 'Submitting…' : 'Submit Ticket'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
