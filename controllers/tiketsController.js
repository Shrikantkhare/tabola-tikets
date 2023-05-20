const tiketsModel = require('../models/tiketsModel');

const createTikets= async function(req,res){
    try {
        const { numberOfTickets } = req.body;
    // console.log(numberOfTickets);
       
        const tickets = [];
        for (let i = 0; i < numberOfTickets; i++) {
          const ticketNumbers = await generateTicketNumbers();
          // console.log(ticketNumbers);
          const ticket = new tiketsModel({ ticketNumbers });
          await ticket.save();
          tickets.push(ticket);
        }
    
        res.status(201).json({ tickets });
      } catch (err) {
        console.error('Failed to create Tambola ticket', err);
        res.status(500).json({ error: 'Failed to create Tambola ticket' });
      }
    }
    
    // Function to generate random Tambola ticket numbers
    function generateTicketNumbers() {
    
      const numbers = Array.from({ length: 90 }, (_, i) => i + 1);
      const ticketNumbers = [];
      for (let i = 0; i < 3; i++) {
        const row = [];
        for (let j = 0; j < 9; j++) {
          const index = Math.floor(Math.random() * numbers.length);
          row.push(numbers.splice(index, 1)[0]);
        }
        ticketNumbers.push(row);
      }
      return ticketNumbers;
    }

  const getTikets= async function(req, res){
    try {
      const { page = 1, limit = 10 } = req.query;
  
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const totalCount = await tiketsModel.countDocuments();
    
      const tickets = await tiketsModel.find()
        .skip(skip)
        .limit(parseInt(limit))
        .sort({ createdOn: -1 });
  
      res.status(200).json({ tickets, totalCount });
    } catch (err) {
      console.error('Failed to fetch Tambola tickets', err);
      res.status(500).json({ error: 'Failed to fetch Tambola tickets' });
    }
  }  

module.exports.createTikets = createTikets,
module.exports.getTikets= getTikets
