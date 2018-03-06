var mongoose = require('mongoose');

var deviceSchema = mongoose.Schema({
    email: String,
    username: String,
    password: String,
    topic: String,
    api: String,
    timestamp : String
});

var device = mongoose.model('device', deviceSchema);
module.exports = device;
