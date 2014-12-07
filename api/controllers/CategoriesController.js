var utility = require('../services/utilities.js')
var rest = require('restler');
var baseParams = sails.config;

module.exports = {
	cacheCategoriesFromFS : function(req, res){
		var fsqUrl = "https://api.foursquare.com/v2/venues/categories?oauth_token=QRIWYVATNEXM3HVSD2SQA5QVIK3JRZF205K5TBOZSPV02G5Q&v=20141206";
    	rest.get(fsqUrl).
        on('success',function(data) {
            Categories.parseCategory(data.response.categories);
        }).
        on('complete', function(data){
            console.log('All saved');
        });
	},
	
    cacheCategoriesFromBehance : function(req, res) {
        var resultSet ={}; 
        rest.get('https://api.behance.net/v2/fields?client_id=n2jRIedu2WCI2EaUXgGMZsA6aHcGKjze').
        on('success', function(data){
            if (data.hasOwnProperty('fields')){
                resultSet['categories'] = data.fields.map(function(item){
                    return item.name;
                });
            }
            if (data.hasOwnProperty('popular')){
                resultSet['popular'] = data.popular.map(function(item){
                    return item.name;
                });
            }
        }).
        on('fail' , function(data){
           Log.error("Something went wrong");
           Log.error(data);
        }).
        on('complete', function(){
            res.json(resultSet);
        });
    }
};


  