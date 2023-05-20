const mongoose = require('mongoose');

const tambolaTicketSchema = new mongoose.Schema({
  ticketNumbers: [[Number]],
  createdOn: { type: Date, default: Date.now }
});

const TambolaTicket = mongoose.model('TambolaTicket', tambolaTicketSchema);

module.exports = TambolaTicket;