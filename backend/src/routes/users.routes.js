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

module.exports = router;