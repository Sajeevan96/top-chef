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

			var restaurant = {
                "name": name,
                "address": adresse,
                "zipcode": code_postal,
                "city": ville,
                "description": description,
                "chef": chef, 
                "url": url
            };
            callback(restaurant);
		}
	});
}

function scraping(url){
	var json = { "starred_restaurants": [] };
	get_number_pages(url, function(number){
		var i = 1; //Number of the page
		var counter = 0;
		while(i <= number){
			get_urls_in_resultpage(url + '/page' + i.toString(), function(urls_array){
				urls_array.forEach(function(element){
					get_page(element, function(restaurant){
						json.starred_restaurants.push(restaurant);
						fs.writeFile('output.json', JSON.stringify(json), 'utf8', function(error){
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
			i++;
		}
	});	
}

scraping('https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin');
console.log('Port 8080 ON');
