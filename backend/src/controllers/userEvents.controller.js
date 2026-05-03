const db = require('../config/db');

const attendEvent = (req, res) => {
  const userId = req.user.id;
  const { eventId } = req.body;

  const checkQuery = `
    SELECT * FROM user_events
    WHERE user_id = ? AND event_id = ?
  `;

  db.query(checkQuery, [userId, eventId], (error, results) => {
    if (error) {
      return res.status(500).json({
        message: 'Error verificando asistencia',
        error
      });
    }

    if (results.length > 0) {
      return res.status(400).json({
        message: 'El usuario ya asistió a este evento'
      });
    }

    const insertQuery = `
      INSERT INTO user_events (user_id, event_id)
      VALUES (?, ?)
    `;

    db.query(insertQuery, [userId, eventId], (error) => {
      if (error) {
        return res.status(500).json({
          message: 'Error registrando asistencia',
          error
        });
      }

      const pointsQuery = `
        UPDATE users
        SET points = points + (
          SELECT points
          FROM events
          WHERE id = ?
        )
        WHERE id = ?
      `;

      db.query(pointsQuery, [eventId, userId], (error) => {
        if (error) {
          return res.status(500).json({
            message: 'Error actualizando puntos',
            error
          });
        }

        res.json({
          message: 'Asistencia registrada y puntos añadidos'
        });
      });
    });
  });
};

module.exports = {
  attendEvent
};