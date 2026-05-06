const express = require('express');

const {
  getUsers,
  getUserById,
  createUser,
  loginUser
} = require('../controllers/users.controller');

const validateUser = require('../middlewares/validateUser');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getUsers);
router.post('/', validateUser, createUser);
router.post('/login', loginUser);
router.get('/:id', authMiddleware, getUserById);
router.get('/me', authMiddleware, (req, res) => {
  const userId = req.user.id;

  db.query(
    'SELECT id, email, points FROM users WHERE id = ?',
    [userId],
    (error, results) => {
      if (error) {
        return res.status(500).json({
          message: 'Error obteniendo usuario',
          error
        });
      }

      res.json(results[0]);
    }
  );
});

module.exports = router;