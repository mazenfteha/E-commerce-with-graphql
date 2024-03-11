const { isTokenValid } = require('../utils/jwt')
const { StatusCodes } = require('http-status-codes')


const authenticationAdmin = async (req, res, next) => {
    const token = req.signedCookies.token
    if(!token) {
        throw new StatusCodes.UNAUTHORIZED("Authentication failed")
    }
    try {
        const payload = isTokenValid({ token })
        req.admin = { ...payload };
        next();
    } catch (error) {
        throw new StatusCodes.UNAUTHORIZED("Authentication failed")
    }
}

module.exports = { authenticationAdmin }