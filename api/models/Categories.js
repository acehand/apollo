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
	}
};

