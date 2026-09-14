const Ticket = require('../models/Ticket');
const Note = require('../models/Note');

// @desc    Create a new ticket
// @route   POST /api/tickets
const createTicket = async (req, res, next) => {
  try {
    const { customer_name, customer_email, subject, description, priority } = req.body;

    const ticket = await Ticket.create({
      customer_name,
      customer_email,
      subject,
      description,
      priority: priority || 'Medium',
    });

    res.status(201).json({
      success: true,
      data: ticket,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all tickets with optional search & filter
// @route   GET /api/tickets?status=Open&search=john&priority=High
const getAllTickets = async (req, res, next) => {
  try {
    const { status, search, priority, page = 1, limit = 50 } = req.query;

    const query = {};

    // Status filter
    if (status && ['Open', 'In Progress', 'Closed'].includes(status)) {
      query.status = status;
    }

    // Priority filter
    if (priority && ['Low', 'Medium', 'High', 'Critical'].includes(priority)) {
      query.priority = priority;
    }

    // Search across name, email, subject, description, ticket_id
    if (search && search.trim()) {
      const searchRegex = { $regex: search.trim(), $options: 'i' };
      query.$or = [
        { ticket_id: searchRegex },
        { customer_name: searchRegex },
        { customer_email: searchRegex },
        { subject: searchRegex },
        { description: searchRegex },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [tickets, total] = await Promise.all([
      Ticket.find(query).sort({ created_at: -1 }).skip(skip).limit(Number(limit)),
      Ticket.countDocuments(query),
    ]);

    // Summary counts for dashboard stats
    const [openCount, inProgressCount, closedCount] = await Promise.all([
      Ticket.countDocuments({ status: 'Open' }),
      Ticket.countDocuments({ status: 'In Progress' }),
      Ticket.countDocuments({ status: 'Closed' }),
    ]);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      stats: {
        open: openCount,
        inProgress: inProgressCount,
        closed: closedCount,
        total: openCount + inProgressCount + closedCount,
      },
      data: tickets,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get a single ticket with its notes
// @route   GET /api/tickets/:ticket_id
const getTicketById = async (req, res, next) => {
  try {
    const ticket = await Ticket.findOne({ ticket_id: req.params.ticket_id });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: `Ticket ${req.params.ticket_id} not found`,
      });
    }

    const notes = await Note.find({ ticket_id: ticket.ticket_id }).sort({ created_at: 1 });

    res.status(200).json({
      success: true,
      data: { ...ticket.toObject(), notes },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update ticket status and/or add a note
// @route   PUT /api/tickets/:ticket_id
const updateTicket = async (req, res, next) => {
  try {
    const { status, priority, note_text, author } = req.body;

    const ticket = await Ticket.findOne({ ticket_id: req.params.ticket_id });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: `Ticket ${req.params.ticket_id} not found`,
      });
    }

    // Update status if provided
    if (status && ['Open', 'In Progress', 'Closed'].includes(status)) {
      ticket.status = status;
    }

    // Update priority if provided
    if (priority && ['Low', 'Medium', 'High', 'Critical'].includes(priority)) {
      ticket.priority = priority;
    }

    await ticket.save();

    // Add note if provided
    let newNote = null;
    if (note_text && note_text.trim()) {
      newNote = await Note.create({
        ticket_id: ticket.ticket_id,
        note_text: note_text.trim(),
        author: author || 'Support Agent',
      });
    }

    const notes = await Note.find({ ticket_id: ticket.ticket_id }).sort({ created_at: 1 });

    res.status(200).json({
      success: true,
      data: { ...ticket.toObject(), notes },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createTicket, getAllTickets, getTicketById, updateTicket };
