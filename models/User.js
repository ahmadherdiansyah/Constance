var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    id:String,
    username: String,
    provider: String,
    birthday: String,
    gender: String,
    social_id: String,
    name: String,
    email: String,
    password: String
});

//UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', UserSchema);
