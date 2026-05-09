const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (username, email, password)
      VALUES (?, ?, ?)
    `;

    db.query(query, [username, email, hashedPassword], (error, result) => {
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
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error en el registro',
      error
    });
  }
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';

  db.query(query, [email], async (error, results) => {
    if (error) {
      return res.status(500).json({
        message: 'Error iniciando sesión',
        error
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        message: 'Credenciales inválidas'
      });
    }

    const user = results[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Credenciales inválidas'
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN
      }
    );

    res.json({
      message: 'Login correcto',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        points: user.points,
        role: user.role
      }
    });
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  loginUser
};