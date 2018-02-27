var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

function get_number_pages(url, callback){	
	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);
			var number = $('.mr-pager-item').eq(-4).text();
			callback(number);
		}
	});
}

function get_urls_in_resultpage(url, callback){
	var urls_array = [];
	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);
			$('a[class=poi-card-link]').each(function (i, element) {
                urls_array.push('https://restaurant.michelin.fr' + $(element).attr('href'));
            });
            callback(urls_array);
		}
	});
}

function get_page(url, callback){
	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);
			var name = $('.poi_intro-display-title').first().text();
			var adresse = $('.thoroughfare').first().text();
			var code_postal = $('.postal-code').first().text();
			var ville = $('.locality').first().text(); 
			var description = $('.node_poi-cooking-types').first().text();
			var chef = $('.field--name-field-chef').children('.field__items').first().text();
			var star = 1;
            if ($('span').hasClass('icon-cotation2etoiles')) {
                star = 2;
            } if ($('span').hasClass('icon-cotation3etoiles')) {
                star = 3;
			}

			var restaurant = {
                "name": name.substring(7,name.length-4),
                "address": adresse,
                "zipcode": code_postal,
				"city": ville,
				"number_stars": star,
                "description": description.substring(11,description.length-8),
                "chef": chef, 
                "url": url
            };
            callback(restaurant);
		}
	});
}

function scraping(url){
	var starred_restaurants = [];
	get_number_pages(url, function(number){
		var i = 1; //Number of the page
		var counter = 0;
		for (var i = 1; i < +number + 1; i++) {
			get_urls_in_resultpage(url + '/page-' + i.toString(), function(urls_array){
				urls_array.forEach(function(element){
					get_page(element, function(restaurant){
						starred_restaurants.push(restaurant);
						//console.log(restaurant);
						fs.writeFile('output.json', JSON.stringify(starred_restaurants), 'utf8', function(error){
							if(error) {
								return console.log(error);
							} else{
								counter++;
								console.log("Restaurant " + counter + " added");
							}
						})
					});
				});
			});	
		}
	});	
}

function get(){
	if (!fs.existsSync('./output.json')) {
		scraping('https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin');
		console.log('Scrapping started, please retry the same command if you want to see the data in command prompt.');
    } else{
		var obj = JSON.parse(fs.readFileSync('output.json', 'utf8'));
		return obj;
	}
	//console.log(obj);
}
get();
module.exports = {get : get};