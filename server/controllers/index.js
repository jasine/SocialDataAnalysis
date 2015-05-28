/**
 * Index Controller
 */

'use strict';
//var multiparty = require('multiparty');
//var multiparty = require('connect-multiparty');
//var multipartMiddleware = multipart();
var util = require('util');
var fs = require('fs');

var indexController = function(req, res) {
  res.render('index', {
    title: 'Home',
    env: process.env.NODE_ENV || 'development'
  });
};

var uploadController=function (req, res){
	if(done==true){
    console.log(req.files);
    res.end("File uploaded.");
  }
}


module.exports = {
  index: indexController,
  upload:uploadController
};
