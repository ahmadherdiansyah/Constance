var mongoose = require('mongoose');

var apiSchema = mongoose.Schema({
    email: String,
    by_id: String,
    api: String,
    timestamp : String
});

var api = mongoose.model('api', apiSchema);
module.exports = api;
