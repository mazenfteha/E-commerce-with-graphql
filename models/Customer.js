const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role :{
        type: String,
        default:'customer'
    },
    provider: {
        type: String,  
        required: true,
    },
    providerId: {
        type: String, 
        required: true,
    },
    accessToken: {
        type: String, 
        required: true,
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



const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer