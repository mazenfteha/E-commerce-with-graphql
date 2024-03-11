const jwt = require("jsonwebtoken");
//first create Token
const createToken = ({ payload }) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
    return token
}

//neededPayload
const neededPayload = (data) => {
    return {
        adminId: data._id,
        adminEmail: data.email,
        role: data.role
    }
}

// verifyToken
const isTokenValid = ({ token }) => {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload;
}

// attachCookieToResponse
const attachCookieToResponse = ({ res, payload }) => {
    const token = createToken({ payload });
    const day = 1000 * 60 * 60 * 24;
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + day),
        signed: true,
    });
};

module.exports = {
    neededPayload,
    isTokenValid,
    attachCookieToResponse,
}