const express = require('express');
const router = express.Router();
const {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
} = require('../controllers/ticketsController');

// POST   /api/tickets          → Create ticket
// GET    /api/tickets          → List all tickets (search + filter)
router.route('/').post(createTicket).get(getAllTickets);

// GET    /api/tickets/:ticket_id  → Single ticket with notes
// PUT    /api/tickets/:ticket_id  → Update status / add note
router.route('/:ticket_id').get(getTicketById).put(updateTicket);

module.exports = router;
