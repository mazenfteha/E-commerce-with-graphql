const { isTokenValid } = require('../utils/jwt')
const { StatusCodes } = require('http-status-codes')
const Admin = require('../models/Admin')


const authenticationAdmin = async (req, res, next) => {
    const token = req.signedCookies.token
    if(!token) {
        throw new Error("Authentication failed");
    }
    try {
        const payload = isTokenValid({ token })
        if(!payload || !payload.adminId) {
            throw new Error("Invalid token");
        }

        const admin = await Admin.findById(payload.adminId);
        if(!admin || admin.role !== "admin") {
            throw new Error("Unauthorized access");
        }

        req.admin = admin
        console.log(req.admin)
        next();
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: error.message });
    }
}

module.exports = { authenticationAdmin }