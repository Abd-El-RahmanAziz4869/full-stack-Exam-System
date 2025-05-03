const express = require('express');
const router = express.Router();
const { validation } = require('../middlewares/validation');
const { registerSchema, loginSchema } = require('../validation/authValidation');
const { register, login } = require('../controllers/users');

router.post('/register', register);
router.post('/login', login);

module.exports = router;