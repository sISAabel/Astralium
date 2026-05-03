const express = require('express');

const {
  attendEvent
} = require('../controllers/userEvents.controller');

const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/attend', authMiddleware, attendEvent);

module.exports = router;