const mongoose = require('mongoose');

const connectDB = () => {
    mongoose
        .connect(process.env.MONGO_DB)
        .then((conn) => {
        console.log(`Database connected: ${conn.connection.host}`);
    })  .catch((error) => {
        console.log('Error while connecting to MongoDB',error.message);
    })
}

module.exports = connectDB
