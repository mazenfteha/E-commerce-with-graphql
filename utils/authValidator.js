const { check } = require('express-validator')
const validationMiddleware  = require('../middlewares/validationMiddleware')

const Admin = require('../models/Admin')

const registerValidator = [
    check("name")
        .isLength({ min: 5 })
        .withMessage("Name should be at least 5 characters")
        .isLength({ max: 50 })
        .withMessage("Name can be 50 characters at most."),
    check("email")
        .notEmpty()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("Please Enter a valid Email")
        .custom(async (value) => {
            const email = await Admin.findOne({ email: value })
            if (email) {
                throw new Error("Another user is using this email.")
            }
        }),
    check("password")
        .isLength({ min: 8 })
        .withMessage("password should be at least 8 characters")
        .isLength({ max: 22 })
        .withMessage("Password can be 22 characters at most"),
    validationMiddleware
]

const loginValidator = [
    check("email")
        .notEmpty()
        .withMessage("Email is required.")
        .isEmail()
        .withMessage("Please Enter a valid Email")
        .custom(async (value) => {
            const email = await Admin.findOne({ email: value })
            if (!email) {
                throw new Error("wrong email or password.")
            }
        }),
    check("password")
        .notEmpty()
        .withMessage("password is required"),
    validationMiddleware,
];

module.exports = {
    registerValidator,
    loginValidator
}