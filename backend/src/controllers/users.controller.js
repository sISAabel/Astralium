const db = require('../config/db');

const getUsers = (req, res) => {
  const query = 'SELECT id, username, email, points, created_at FROM users';

  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({
        message: 'Error obteniendo usuarios',
        error
      });
    }

    res.json(results);
  });
};

const getUserById = (req, res) => {
  const userId = req.params.id;

  const query = `
    SELECT id, username, email, points, created_at
    FROM users
    WHERE id = ?
  `;

  db.query(query, [userId], (error, results) => {
    if (error) {
      return res.status(500).json({
        message: 'Error obteniendo usuario',
        error
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      });
    }

    res.json(results[0]);
  });
};

const createUser = (req, res) => {
  const { username, email, password } = req.body;

  const query = `
    INSERT INTO users (username, email, password)
    VALUES (?, ?, ?)
  `;

  db.query(
    query,
    [username, email, password],
    (error, result) => {
      if (error) {
        return res.status(500).json({
          message: 'Error creando usuario',
          error
        });
      }

      res.status(201).json({
        id: result.insertId,
        username,
        email,
        points: 0
      });
    }
  );
};

module.exports = {
  getUsers,
  getUserById,
  createUser
};