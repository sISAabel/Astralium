const express = require('express');
const db = require('../config/db');

const {
  attendEvent
} = require('../controllers/userEvents.controller');

const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/attend', authMiddleware, attendEvent);

router.get('/', authMiddleware, (req, res) => {
  const userId = req.user.id;

  const query = `
    SELECT event_id
    FROM user_events
    WHERE user_id = ?
  `;

  db.query(query, [userId], (error, results) => {
    if (error) {
      return res.status(500).json({
        message: 'Error obteniendo eventos del usuario',
        error
      });
    }

    const eventIds = results.map((row) => row.event_id);

    res.json(eventIds);
  });
});

module.exports = router;