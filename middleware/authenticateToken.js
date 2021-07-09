const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, user) => {
        console.log(err);

        if (err) return res.sendStatus(403);
        req.user = user;
        console.log(req.user);
        next();
    });
}