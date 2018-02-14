var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

function get_id_restaurant(name,address,zipcode,callback){
	name_get = name.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
	var url = "https://m.lafourchette.com/api/restaurant-prediction?name=" + name_get;
	var id;
	request({
		url: url,
		json : true
	}, function(error, response, body){
		//console.log(body);
		if(body != null){
			try{
				if(body.length > 0){
					body.forEach(function(element){
						if(/*element.name === name &&*/ element.address.postal_code === zipcode){
							id = element.id;
							//console.log(element.address.postal_code);
							callback(id);
						}
					});
				}
			} catch(error){
				console.log(error);
			}
		}	
	});
}

function get_nameLaFourchette(id,callback){
	var url = "https://m.lafourchette.com/api/restaurant/" + id;
	//console.log(url);
	request({url:url, json:true}, function(error, response, body){
		if(!error){
			name_lafourchette = body.name;
		}
		callback(name_lafourchette);
	})
}

function get_restaurant_promo_info(id,name_lafourchette,callback){
	name_get = name_lafourchette.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
	name_get = name_get.replace(/'/g, "-");
	name_get = name_get.replace(/ /g, "-");
	name_get = name_get.toLowerCase();
	var url = "https://www.lafourchette.com/restaurant/" + name_get + "/" + id;
	var menus_promo = [];
	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);
			$('.saleType').each(function (i, element) {
                var title_menu = $(element).children('h3[class=saleType-title]').text();
                var description_menu = $(element).children('p').text();
				menus_promo.push([title_menu,description_menu]);
            });
			//console.log(menus_promo)
			callback(menus_promo,url);
		}
	});
}

function send_data_json(){
	var compteur = 0;
	var file = JSON.parse(fs.readFileSync('output.json').toString());
	file.forEach(function(element){
		get_id_restaurant(element.name,element.address,element.zipcode,function(id){
			get_nameLaFourchette(id,function(name_lafourchette){
				get_restaurant_promo_info(id,name_lafourchette,function(menus_promo,url){
					element.urlLafourchette = url;
					element.menu = menus_promo;
					//console.log(element);

					fs.writeFile('output.json', JSON.stringify(file), 'utf8', function(error){
						if(error) {
							return 0; 
							//console.log(error);
						} else{
							compteur++;
							console.log("Restaurant " + compteur + " uploaded");
						}
					})

				})
			})
		})
	})
}

send_data_json();

module.exports = {send_data_json : send_data_json};