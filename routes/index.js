var express = require('express');
var router = express.Router();
var passport = require('passport');
/*
passport.use(new GoogleStrategy({
    clientID: "108992684181-gvro7mg3bal2eb3q1q84t9fj72t6ulvd.apps.googleusercontent.com" ,
    clientSecret: "DHIMsLTWHZYNJc5YzqNyF2TU",
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ googleId: profile.id }, function (err, user) {
         return done(err, user);
       });
  }
));
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Constance IoT API' });
});
// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get('/auth/facebook', passport.authenticate('facebook', {scope:['user_birthday', 'email','user_about_me']}));
router.get('/auth/facebook/callback', passport.authenticate('facebook', 
{ successRedirect: '/users/', failureRedirect: '/login' }));
router.get('/auth/google',
  passport.authenticate('google', { scope:
    [ 'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/plus.profile.emails.read' ] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/google/callback',passport.authenticate('google',
 { successRedirect: '/users/', failureRedirect: '/login' }));
module.exports = router;
