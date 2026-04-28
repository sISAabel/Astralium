const express = require('express');

const {
  getUsers,
  getUserById,
  createUser
} = require('../controllers/users.controller');

const validateUser = require('../middlewares/validateUser');

const router = express.Router();

router.get('/', getUsers);

router.get('/:id', getUserById);

router.post('/', validateUser, createUser);

module.exports = router;