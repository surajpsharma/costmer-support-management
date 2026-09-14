import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create a new ticket
export const createTicket = (data) => API.post('/tickets', data);

// Get all tickets with optional search/filter params
export const getTickets = (params = {}) => API.get('/tickets', { params });

// Get a single ticket with notes
export const getTicketById = (ticket_id) => API.get(`/tickets/${ticket_id}`);

// Update ticket status and/or add a note
export const updateTicket = (ticket_id, data) => API.put(`/tickets/${ticket_id}`, data);

export default API;
