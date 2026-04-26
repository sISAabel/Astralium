const express = require('express');
const validateEvent = require('../middlewares/validateEvent');

const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/events.controller');

const router = express.Router();

router.get('/', getEvents);

router.get('/:id', getEventById);

router.post('/', validateEvent, createEvent);

router.put('/:id', validateEvent, updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;