var express = require('express');
var router = express.Router();

const userValidators = require('../validators/user');
const userControllers = require('../controllers/user');
const authenticateToken = require('../middleware/authenticateToken');

/* GET users listing. */
router.post('/register', userValidators.register, userControllers.register);

router.post('/login', userValidators.login, userControllers.login);

router.use('/me', authenticateToken);
router.get('/me', userControllers.me);

module.exports = router;
