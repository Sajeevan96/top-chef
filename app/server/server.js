var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req,res){
    //URL that we want to scrape
    url = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin';

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            var name;
            var json = { name : ""};             
            
           $('.poi_card-display-title').each(function(){
                var data = $(this);
                console.log(data.text());
                name = data.text();
                json.name = name;

                fs.writeFile('output.json', JSON.stringify(json,null, 2),function(err){
                    console.log('File successfully written ! - Check output.json file');
                });
            })
        }
        res.send('Check your console!');
    });
});

app.listen('8081');
console.log('Port 8081 ON');
exports = module.exports = app;