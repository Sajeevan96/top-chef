//Packages
var express = require("express");
var app = express();
//var bodyParser = require('body-parser');

const michelin = require("./michelin.js");
const lafourchette = require('./lafourchette.js');

//Get the restaurants (import in output.json all the restaurants if not done)
//console.log(michelin.get());

//Get all the promotions and menus of the starred restaurants 
//console.log(lafourchette.getDeal());
var json = lafourchette.getDeal();

app.get('/',function(req,res){
    res.send("Index");
})

app.get('/deals',function(req,res){
    res.send(json);
})

app.listen(8080, function(){
    console.log("Example app listening on port 8080");
})


