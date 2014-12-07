var utility = require('../services/utilities.js')
module.exports = {
	attributes : {
	},
	addToList : function(data){
	},
	parseCategory : function(categories, parent_id){
		if (typeof parent_id === 'undefined') parent_id = '';
		categories.forEach(function(category){
			category_record = utilities.parseCategoryObject(category);
			Categories.create(category_record);
			if (category.categories instanceof Array  && category.categories.length > 0){
				Categories.parseCategory(category.categories, category.name);
			}
		});
	},

	cacheCategoriesFromBehance : function(callBack) {
        var resultSet ={};
        Rest.get('https://api.behance.net/v2/fields?client_id=n2jRIedu2WCI2EaUXgGMZsA6aHcGKjze').
        on('success', function(data){
            Log.info("Success");
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
            callBack(resultSet);
        });
    }
};

