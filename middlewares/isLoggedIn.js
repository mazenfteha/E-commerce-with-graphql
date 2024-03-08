// Define isLoggedIn middleware
const isLoggedIn = (req, res, next) => {
    // Check if the user is authenticated
    if (req.isAuthenticated()) {
        // If authenticated, proceed to the next middleware or route handler
        return next();
    } else {
        // If not authenticated, redirect the user to the login page or return an error
        return res.redirect('/auth/failure');
    }
};

module.exports =  isLoggedIn;