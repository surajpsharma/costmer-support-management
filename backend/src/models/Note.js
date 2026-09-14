const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    ticket_id: {
      type: String,
      required: true,
      ref: 'Ticket',
    },
    note_text: {
      type: String,
      required: [true, 'Note text is required'],
      trim: true,
    },
    author: {
      type: String,
      default: 'Support Agent',
      trim: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

module.exports = mongoose.model('Note', noteSchema);
