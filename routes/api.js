//var guru = require('./routes/guru');


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var datas = require('../models/data.js');
var crypto = require('crypto');
router.get('/', function(req, res, next) {
	jes = [{}]
    res.json([{
    	"title" : "Selamat datang di API ini",
    	"copyright" : "aherstudios.xyz",
    		
    },{
    	"judul" : "cara menggunakan",
    	"publish" : "/v1/publish/<device>/<pesan>",
    	"cari data" : "/v1/cari/<device>"
    }])
});
router.get('/cari/:topic', function(req, res, next) {
    datas.find({
        topic: req.params.topic
    }, function(err, post) {
    	function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

// This should work both there and elsewhere.
function isEmptyObject(obj) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}
        if (err) return next(err);
        if (isEmptyObject(post)){
        	res.json({"pesan" : "data tidak di temukan!"});
        };
        if (post != 0){
        	res.json(post)
        };
        console.log(req.params.topic);
    });
});
router.get('/publish/:device/:pesan', function(req, res, next) {
    var mqtt = require('mqtt')
    var client = mqtt.connect('mqtt://localhost')
    client.on('connect', function() {
        client.publish(req.params.topic, req.params.pesan)
    });
    res.json({
        "status": "sukses"
    });
});


module.exports = router;