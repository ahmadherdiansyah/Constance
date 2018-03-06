var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/User");
var apis = require("../models/api");
var rel = require("../models/rel");
var userController = {};
var crypto = require('crypto');
// Restrict access to root page
userController.home = function(req, res) {
  if (req.user == null) {
    res.redirect('/')
  }
  else{
    var email = crypto.createHash('sha1').update(req.user.email).digest("hex");  
  var email_fix = crypto.createHash('sha256').update(email).digest("hex");
    apis.find({ email: email},function(err, api){
        if(err) return next(err);
        rel.find({ email: email },function(err, topic){
        //if(err) return next(err);
        //res.json(topic);
        //res.render('topic',{ user : req.user,title :"C-Dashboard | Topic", topic : topic });
        res.render('user', { user : req.user,title :"C-Dashboard | Home", api : api,topic: topic });
    });
        
    });
  }
};

// Go to registration page
userController.register = function(req, res) {
  if (req.user != null) {
    res.redirect('/users')
  }
  else{
  res.render('register',{ title: 'Login | IoT API' });  
  }
};

// Post registration
userController.doRegister = function(req, res) {
  User.register(new User({ username : req.body.username, email: req.body.email, name: req.body.first_name && req.body.last_name }), req.body.password, function(err, user) {
    if (err) {
      return res.render('register', { user : user ,title :"Home | Users" });
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/users');
    });
  });
};

// Go to login page
userController.login = function(req, res) {
  if (req.user != null) {
    res.redirect('/users')
  }
  else{
  res.render('login',{ title: 'Login | IoT API' });  
  }
};

// Post login
userController.doLogin = function(req, res , next) {
/* look at the 2nd parameter to the below call */
  passport.authenticate('local', function(err, user, info ) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/'); }
    req.logIn(user, function(err,apir) {
      if (err) { return next(err); }
      return res.redirect('/users');
    });
  })(req, res, next);
};

// logout
userController.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

module.exports = userController;