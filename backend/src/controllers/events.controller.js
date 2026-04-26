const events = require('../data/events');

const getEvents = (req, res) => {
  res.json(events);
};

const getEventById = (req, res) => {
  const eventId = Number(req.params.id);
  const event = events.find((event) => event.id === eventId);

  if (!event) {
    return res.status(404).json({ message: 'Evento no encontrado' });
  }

  res.json(event);
};

const createEvent = (req, res) => {
  const { name, type, date, description, points } = req.body;

  if (!name || !type || !date) {
    return res.status(400).json({
      message: 'Los campos name, type y date son obligatorios'
    });
  }

  const newEvent = {
    id: events.length + 1,
    name,
    type,
    date,
    description: description || '',
    points: points || 0
  };

  events.push(newEvent);

  res.status(201).json(newEvent);
};

module.exports = {
  getEvents,
  getEventById,
  createEvent
};