const express = require("express")
const helloRest = require('./routes/helloRouter')


const app = express();


app.use('/api', helloRest )


module.exports = app;