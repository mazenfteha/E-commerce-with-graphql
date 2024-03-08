const express = require('express')
const router = express.Router()
const passport = require('passport');

require('../controllers/authController')
const isLoggedIn = require('../../middlewares/isLoggedIn')

router.get('/auth', (req, res)=> {
    res.send('<a href="/auth/google">Authenticate with Google </a>');
})

router.get('/auth/google',
    passport.authenticate('google', {scope: [
        'email',
        'profile',
    ]})
)


router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/failure'
}));

router.get('/auth/failure', (req, res) => {
    res.send('Authentication failed');
});

router.get('/protected',isLoggedIn ,(req, res) => {
    res.send('You are authenticated!!');
});

router.get('/logout', function(req, res, next) {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/auth')
    });
});


module.exports = router 