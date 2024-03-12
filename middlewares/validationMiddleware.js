const { validationResult  } = require('express-validator')
const { StatusCodes } = require('http-status-codes')

const validationMiddleware = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: "Bad request",
            message: errors.array(),
            statusCode: StatusCodes.BAD_REQUEST,
        });
    }
    next();
};

module.exports = validationMiddleware ;