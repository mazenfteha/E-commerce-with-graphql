const express = require("express")
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();

const authRouter = require('./routes/authRouter');
const helloRest = require('./routes/helloRouter')


const app = express();

app.use(session({ 
    secret: process.env.SECRET, 
    resave: false, 
    saveUninitialized: false 
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(authRouter)
app.use('/api', helloRest )


module.exports = app;