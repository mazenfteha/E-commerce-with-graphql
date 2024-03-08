const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const Customer = require('../../models/Customer');
require('dotenv').config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
    new GoogleStrategy(
    {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:4000/google/callback",
        passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
        try {
            let customer = await Customer.findOne({
            providerId: profile.id,
            provider: "google",
            });

            // If the OAuth user doesn't exist, create a new one.
            if (!customer) {
            customer = new Customer({
                provider: "google",
                providerId: profile.id,
                accessToken: accessToken,
                // Map profile data to user-specific fields
                name: profile.given_name,
                email: profile.email,
            });
            } else {
            // If the user already exists, update the access token and any other necessary fields.
            customer.accessToken = accessToken;
            }
            await customer.save();
            return done(null, customer);

        } catch (err) {
            return done(err);
        }
    }
    )
);

passport.serializeUser(function (customer, done) {
    done(null, customer);
});

passport.deserializeUser(function(id, done) {
    Customer.findById(id)
    .then(customer => {
        done(null, customer);
    })
    .catch(err => {
        done(err, null);
    });
});
