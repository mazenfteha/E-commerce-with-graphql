const mongoose = require('mongoose');

// Define the schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
}, { timestamps: true });

// Create a Mongoose model
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;