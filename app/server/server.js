//Packages
var express = require("express");
var app = express();
var fs = require("fs");

const michelin = require("./michelin.js");
const lafourchette = require('./lafourchette.js');

var json = lafourchette.getDeal();


app.get('/',function(req,res){
    res.send("Index");
})
app.get('/deals',function(req,res){    
    res.send(json);
})
app.listen(8080, function(){
    console.log("Example app listening on port 8080");
    console.log("Use the npm start command line into client folder");
})