var utility = require('../services/utilities.js')
var baseParams = sails.config;

module.exports = {
	cacheCategoriesFromFS : function(req, res){
		var fsqUrl = "https://api.foursquare.com/v2/venues/categories?oauth_token=QRIWYVATNEXM3HVSD2SQA5QVIK3JRZF205K5TBOZSPV02G5Q&v=20141206";
    	Rest.get(fsqUrl).
        on('success',function(data) {
            Categories.parseCategory(data.response.categories);
        }).
        on('complete', function(data){
            console.log('All saved');
        });
	},
	
    cacheCategoriesFromBehance : function(req, res) {
        Categories.cacheCategoriesFromBehance(function(result){
            return res.json(result);
        });
    }
};


  