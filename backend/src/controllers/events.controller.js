const db = require('../config/db');

const getEvents = (req, res) => {
  const query = 'SELECT * FROM events';

  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({
        message: 'Error obteniendo eventos',
        error
      });
    }

    res.json(results);
  });
};

const getEventById = (req, res) => {
  const eventId = req.params.id;

  const query = 'SELECT * FROM events WHERE id = ?';

  db.query(query, [eventId], (error, results) => {
    if (error) {
      return res.status(500).json({
        message: 'Error obteniendo evento',
        error
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: 'Evento no encontrado'
      });
    }

    res.json(results[0]);
  });
};

const createEvent = (req, res) => {
  const { name, type, date, description, points } = req.body;

  const query = `
    INSERT INTO events (name, type, date, description, points)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [name, type, date, description || '', points || 0],
    (error, result) => {
      if (error) {
        return res.status(500).json({
          message: 'Error creando evento',
          error
        });
      }

      res.status(201).json({
        id: result.insertId,
        name,
        type,
        date,
        description,
        points
      });
    }
  );
};

const updateEvent = (req, res) => {
  const eventId = req.params.id;

  const { name, type, date, description, points } = req.body;

  const query = `
    UPDATE events
    SET name = ?, type = ?, date = ?, description = ?, points = ?
    WHERE id = ?
  `;

  db.query(
    query,
    [name, type, date, description, points, eventId],
    (error, result) => {
      if (error) {
        return res.status(500).json({
          message: 'Error actualizando evento',
          error
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: 'Evento no encontrado'
        });
      }

      res.json({
        message: 'Evento actualizado correctamente'
      });
    }
  );
};

const deleteEvent = (req, res) => {
  const eventId = req.params.id;

  const query = 'DELETE FROM events WHERE id = ?';

  db.query(query, [eventId], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: 'Error eliminando evento',
        error
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Evento no encontrado'
      });
    }

    res.json({
      message: 'Evento eliminado correctamente'
    });
  });
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
};