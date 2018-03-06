var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var index = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');
var app = express();
//load mongoose
var mongoose = require('mongoose');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;
mongoose.Promise = global.Promise;
var crypto = require('crypto');

//hubungkan ke Mongodb
mongoose.connect('mongodb://localhost/data')  
  .then(() => console.log('Berhasil terhubung dengan MongoDB'))
  .catch((err) => console.error(err));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var user = require('./models/User');
var userfb = require('./models/Userfb');

passport.use(new LocalStrategy(
  function(username, password, done) {
    var pass = crypto.createHash('sha1').update(password).digest("hex");
    var pass2 = crypto.createHash('sha256').update(pass).digest("hex");
    user.findOne({ username: username, password: pass2 }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      
      return done(null, user);
    });
  }
));//passport.serializeUser(user.serializeUser());
//passport.deserializeUser(user.deserializeUser());
passport.use(new FacebookStrategy({
    clientID: "402191946869476",
    clientSecret: "69307010cf842119684ed6a5a715ef8d",
    callbackURL: "https://api.aherstudios.xyz/auth/facebook/callback",
    profileFields:['id','displayName','emails','gender','birthday']
    }, function(accessToken, refreshToken, profile, done) {
        console.log(profile);
        var me = new user({
            social_id: profile.id,
            provider: profile.provider,
            birthday: profile._json.birthday,
            gender: profile.gender,
            email:profile._json.emails,
            name:profile.displayName
        });

        /* save if new */
        user.findOne({social_id:me.social_id}, function(err, u) {
            if(!u) {
                me.save(function(err, me) {
                    if(err) return done(err);
                    done(null,me);
                });
            } else {
                console.log(u);
                done(null, u);
            }
        });
  }
));
passport.use(new GoogleStrategy({
    clientID: "108992684181-gvro7mg3bal2eb3q1q84t9fj72t6ulvd.apps.googleusercontent.com" ,
    clientSecret: "DHIMsLTWHZYNJc5YzqNyF2TU",
    callbackURL: "https://api.aherstudios.xyz/auth/google/callback",
    //passReqToCallback   : true
    profileFields:['id','displayName','emails']
  },
  function( accessToken, refreshToken, profile, done) {
        //console.log(profile);
        var gog = new user({
            social_id: profile.id,
            email:profile.emails[0].value,
            provider: profile.provider,
            birthday: profile.birthday,
            gender: profile.gender,
            name:profile.displayName
        });

        /* save if new */
         user.findOne({social_id:gog.social_id}, function(err, u) {
            if(!u) {
                gog.save(function(err, me) {
                    if(err) return done(err);
                    done(null,me);
                });
            } else {
                console.log(u);
                done(null, u);
            }
        }); 
       //user.findOrCreate({ email: profile.email }, function (err, user) {
        // return done(err, user);
       //});
  }
));
passport.serializeUser(function(user, done) {
    console.log(user);
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    user.findById(id, function(err, user) {
        done(err, user);
    });
});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/', index);
app.use('/users', users);
app.use('/v1', api); 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //var err = new Error('Not Found');
  //err.status = 404;
  //next(err);
  res.render('error',{ title : " 404 | Error",pesan : "404 not found"});
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error',{title : "500 | Error",pesan : "500 internal server error"});
  res.render(err.message);
});

module.exports = app;
