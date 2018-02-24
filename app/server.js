//Packages
var express = require("express");
var app = express();
//var bodyParser = require('body-parser');

const michelin = require("./michelin.js");
const lafourchette = require('./lafourchette.js');
console.log('Port 8080 ON');

//Get the restaurants (import in output.json all the restaurants if not done)
console.log(michelin.get());

//Get all the promotions and menus of the starred restaurants
console.log(lafourchette.getDeal());

