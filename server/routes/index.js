/// <reference path="../../typings/node/node.d.ts"/>
/**
 * User Routes
 */

'use strict';

var indexController = require('../controllers/index');
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;
var done = false;
var newName = '';
var uploadFile;

var routes = function(app) {


    app.use(multer({
        dest: './uploads/',
        rename: function(fieldname, filename) {
            newName = filename + Date.now();
            return newName;
        },
        onFileUploadStart: function(file) {
            console.log(file.originalname + ' is starting ...');
        },
        onFileUploadComplete: function(file) {
            uploadFile = file;
            console.log(file.fieldname + ' uploaded to  ' + file.path);
            done = true;
        }
    }));



//    // Dynamically load all routes
//    fs.readdirSync(__dirname).forEach(function(file) {
//        // Dont load this index.js file
//        if (!/index/.test(file)) {
//            var route = path.join(__dirname, file);
//            require(route)(app);
//        }
//    });






    app.get('/', function(req, res) {
        res.render('index', {
            title: 'Home',
            env: process.env.NODE_ENV || 'development'
        });
    });

    app.post('/upload', function(req, res) {
        if (done == true) {
            console.log(req.files);
            res.json(newName);
            res.end();
        }
    });
    
    
    
    app.get('/calc/:file/:type/:node', function(req, res) {
        var type = req.params.type;
        var file = req.params.file;
        var node=req.params.node;
        
        var libs=['graph','a1'];
        var als=['R','B','G'];
  
        var last = exec('server/libs/a2 ' +als[type]+ ' ./uploads/'+file+'.txt '+node);
        last.stdout.on('data', function(data) {
            console.log('标准输出：' + data);
            //data='n0:Node0:210:181:3 n1:Node1:180:39:3 n2:Node2:177:190:3 n3:Node3:76:158:3 n4:Node4:166:245:3 n5:Node5:238:75:3 n6:Node6:100:204:3 n7:Node7:134:224:3 n8:Node8:180:280:3 n9:Node9:27:252:3\nedge0:n9:n7 edge1:n7:n5 edge2:n7:n8 edge3:n7:n6 edge4:n8:n5 edge5:n8:n6 edge6:n5:n6 edge7:n5:n4 edge8:n6:n4 edge9:n4:n3 edge10:n4:n1 edge11:n3:n2 edge12:n3:n1 edge13:n2:n1';
            
            res.json(convert2Json(data));
        });

        // last.on('exit', function (code) { 
        //   console.log('子进程已关闭，代码：' + code); 
        //   res.end();
        // });  
    });

};


function convert2Json(text) {
        var lines = text.split('\n');
            var nodes = lines[0].split(" ");
            console.log(nodes);
            var vets = lines[1].split(" ");
            var sigData = {
                nodes: [],
                edges: []
            };

            for (var i = 0; i < nodes.length - 1; i++) {
                var node = nodes[i].split(':');
                var sigNode = {
                    id: node[0],
                    label: node[1],
                    x: node[2],
                    y: node[3],
                    size: node[4],
                    color:node[5]
                };
                sigData.nodes.push(sigNode);
            }
            for (var j = 0; j < vets.length - 1; j++) {
                var edge = vets[j].split(':');
                var sigEdge = {
                    id: edge[0],
                    source: edge[1],
                    target: edge[2]
                };
                sigData.edges.push(sigEdge);
            }
            return sigData;
    }
module.exports = routes;
