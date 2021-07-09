const Promise = require("bluebird")
const jsonwebtoken = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET

const generateJwt = payload => {
    return jsonwebtoken.sign(payload, JWT_SECRET)
}

const generateHash = password => {
    return Promise.promisify(bcrypt.hash)(password, 10)
}

const compareHash = (password, hash) => {
    return Promise.promisify(bcrypt.compare)(password, hash)
}

module.exports = {
    JWT_SECRET,
    generateJwt,
    generateHash,
    compareHash
}