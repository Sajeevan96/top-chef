//Packages
var express = require("express");
var app = express();
var fs = require("fs");
//var bodyParser = require('body-parser');

const michelin = require("./michelin.js");
const lafourchette = require('./lafourchette.js');

/*function get(callback){
    json = michelin.get();
    callback(json);
}
get(function(json){
    json = lafourchette.getDeal();
})*/
var json = lafourchette.getDeal();
//var json = JSON.parse(fs.readFileSync('output.json'.toString()));

app.get('/',function(req,res){
    res.send("Index");
})
app.get('/deals',function(req,res){    
    res.send(json);
})
app.listen(8080, function(){
    console.log("Example app listening on port 8080");
})