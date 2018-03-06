var mongoose = require('mongoose');

var userfbSchema = mongoose.Schema({
    id:String,
    email:String,
    name:String
});

var Userfb = mongoose.model('Userfb', userfbSchema);
module.exports = Userfb;
