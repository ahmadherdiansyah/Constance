var mongoose = require('mongoose');

var DataSchema = new mongoose.Schema({  
    topic: String,
    message: String,
    timestamp: String
});

module.exports = mongoose.model('message', DataSchema); 