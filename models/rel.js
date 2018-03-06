var mongoose = require('mongoose');

var relSchema = mongoose.Schema({
    id:String,
    email:String,
    topic:String,
    by_id: String,
    api: String,
    timestamp : String
});

var rel = mongoose.model('rel', relSchema);
module.exports = rel;
