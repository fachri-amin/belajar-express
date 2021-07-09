var express = require('express');
var router = express.Router();

//middleware
const authenticateToken = require('../middleware/authenticateToken');

/* GET users listing. */
router.use('/', authenticateToken);
router.get('/', function(req, res, next) {
    res.json({message: 'ini index post'});
});

module.exports = router;
