var express = require('express');
var router = express.Router();
var auth = require("../controllers/AuthController.js");
var user = require("../models/User"),
    rel = require("../models/rel"),
    api = require("../models/api"),
    device = require("../models/device");
var crypto = require('crypto');
// restrict index for logged in user only
router.get('/', auth.home);

// route to register page
router.get('/register', auth.register);

// route for register action
router.post('/register', auth.doRegister);

// route to login page
router.get('/login', auth.login);

// route for login action
router.post('/login', auth.doLogin);

// route for logout action
router.get('/logout', auth.logout);

// route for home page
router.get('/home',function (req,res,next) {
  if (req.user == null ) {
    res.redirect('/')
  }
  else{
  res.render('user', { user : req.user,title :"C-Dashboard | Home" });  
  }
});
router.get('/profile',function(req,res,next){
  if (req.user == null) {
    res.redirect('/')
  }
  else{
  res.render('profile', { user : req.user,title :"C-Dashboard | Home" });
  }
});
/*router.post('/profile',function(req,res,next) {
// This would likely be inside of a PUT request, since we're updating an existing document, hence the req.params.userId.
// Find the existing resource by ID
user.findById(req.params.userId, (err, user) => {  
    // Handle any possible database errors
    if (err) {
        res.status(500).send(err);
    } else {
        // Update each attribute with any possible attribute that may have been submitted in the body of the request
        // If that attribute isn't in the request body, default back to whatever it was before.
        user.first_name = req.body.first_name || user.first_name;
        user.last_name = req.body.last_name || user.last_name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;

        // Save the updated document back to the database
        user.save((err, user) => {
            if (err) {
                res.status(500).send(err)
            }
            res.status(200).send(user);
        });
    }
});
});
*/
router.post('/profile/:id', function(req, res, next){
  if (req.user == null) {
    res.redirect('/')
  }
  else{
  var pass = crypto.createHash('sha1').update(req.body.password).digest("hex");  
    var pass2 = crypto.createHash('sha256').update(pass).digest("hex"); 
    user.findByIdAndUpdate(req.params.id,{ username: req.body.username, email: req.body.email, name: req.body.first_name + " " + req.body.last_name, password: pass2 }, function(err, post){
        if(err) return next(err);
        res.json(post);
    }); 
  }
    
});
router.get('/topic',function (req,res,next) {
  // body...
  var emaild = crypto.createHash('sha1').update(req.user.email).digest("hex");  
  //var id_fix = crypto.createHash('sha256').update(ids).digest("hex")
  //res.json(emaild);
    rel.find({ email: emaild },function(err, topic){
        //if(err) return next(err);
        //res.json(topic);
        res.render('topic',{ user : req.user,title :"C-Dashboard | Topic", topic : topic });
    });
})
router.get('/api',function (req,res,next) {
  // body...
  var emaild = crypto.createHash('sha1').update(req.user.email).digest("hex");  
  //var id_fix = crypto.createHash('sha256').update(ids).digest("hex")
  //res.json(emaild);
    api.find({ email: emaild },function(err, api){
        //if(err) return next(err);
        //res.json(topic);
        res.render('api',{ user : req.user,title :"C-Dashboard | API", api : api });
    });
})
router.post('/topic/add/:id', function(req,res,done){

    if (req.user == null) {
    res.redirect('/')
  }
  else{
  var tg = Date();
  var emails = crypto.createHash('sha1').update(req.user.email).digest("hex");  
  var email_fix = crypto.createHash('sha256').update(emails).digest("hex");
  var ids = crypto.createHash('sha1').update(req.params.id).digest("hex");  
  var id_fix = crypto.createHash('sha256').update(ids).digest("hex");
  var topic = crypto.createHash('md5').update(tg).digest("hex");  
  var topic_fix = crypto.createHash('sha256').update(topic).digest("hex");
  var top = new rel({
    email: emails,
    api: req.body.api,
    by_id: ids,
    topic: topic,
    timestamp: new Date(),
  });
  rel.findOne({topic : topic, api : req.body.api}, function (err , u) {
    // body...
    if(!u) {
      top.save(function(err, me) {
            if(err) return done(err);
             res.redirect('/users/topic')
        });
    } else {
        console.log(u);
        res.redirect('/users/topic')
    }
  });
  }
});
router.get('/api/add/:id', function(req,res,done){
  var tg = Date();
  var emails = crypto.createHash('sha1').update(req.user.email).digest("hex");  
  var email_fix = crypto.createHash('sha256').update(emails).digest("hex");
  var ids = crypto.createHash('sha1').update(req.params.id).digest("hex");  
  var id_fix = crypto.createHash('sha256').update(ids).digest("hex");
  var apir = crypto.createHash('sha1').update(tg).digest("hex");  
  var api_fix = crypto.createHash('sha256').update(apir).digest("hex");
  var apis = new api({
    email: emails,
    by_id: ids,
    api: apir,
    timestamp: new Date()
  });
  api.findOne({api : api_fix}, function(err, u) {
    if(!u) {
        apis.save(function(err, me) {
            if(err) return done(err);
            res.redirect('/users/api');
        });
        
    } 
    else {
        console.log(u);
        res.redirect('/users/api');
    }
    
});
});
router.post('/device/add/:id', function(req,res,done){

    if (req.user == null) {
    res.redirect('/')
  }
  else{
  rel.findOne({topic : req.body.topic}, function (err , topic) {
    return topic;
  });
  var tg = Date();
  var emails = crypto.createHash('sha1').update(req.user.email).digest("hex");  
  var email_fix = crypto.createHash('sha256').update(emails).digest("hex");
  var ids = crypto.createHash('sha1').update(req.params.id).digest("hex");  
  var id_fix = crypto.createHash('sha256').update(ids).digest("hex");
  var usernames = crypto.createHash('sha1').update(tg).digest("hex");  
  var password = crypto.createHash('sha1').update(usernames).digest("hex");
  rel.findOne({topic : req.body.topic}, function (err , topic) {
    var top = new device({
    email: emails,
    username: usernames,
    password: password,
    topic: req.body.topic,
    api: topic.api,
    timestamp: new Date(),
  });
    device.findOne({device : usernames}, function (err , u) {
    // body...
    if(!u) {
      top.save(function(err, me) {
            if(err) return done(err);
             res.redirect('/users/')
        });
    } else {
        console.log(u);
        res.redirect('/users')
    }
  });
  });
  }
});
module.exports = router;