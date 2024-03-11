const express = require("express")
const passport = require('passport');
const session = require('express-session');
const cookieParser = require("cookie-parser")
require('dotenv').config();

const authRouter = require('./routes/authRouter');
const adminRouter = require('./routes/authAdminRouter');
const helloRest = require('./routes/helloRouter')

const errorHandler = require('../middlewares/errorHandler')

const app = express();

app.use(cookieParser(process.env.JWT_SECRET));
app.use(session({ 
    secret: process.env.SECRET, 
    resave: true,  
    saveUninitialized: true 
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/api',adminRouter)
app.use(authRouter)
app.use('/api', helloRest )
app.use(errorHandler)


module.exports = app;