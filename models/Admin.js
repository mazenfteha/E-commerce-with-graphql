const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const admainSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail,"Please provide a valid email!"],
    },
    role :{
        type: String,
        default:'admin'
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

// Hash the password before saving
admainSchema.pre('save', async function(next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        
        const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS, 10));
        
        const hashedPassword = await bcrypt.hash(this.password, salt);
        
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

admainSchema.pre("save", function (next) {
    if (!this.isModified("password") || this.isNew) return next();
    this.passwordChangedAt = Date.now() - 1000;
    next();
});

admainSchema.methods.correctPassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}



const Admin = mongoose.model('Admin', admainSchema)

module.exports = Admin