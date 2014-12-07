module.exports  = {
	parseImagga : function(result){
		return result["results"][0]["tags"];
	},
	
	getTopTags : function(result){
		var max = 10,second_max = max,relevantTags=[];
		var tags = result["results"][0]['tags'];
		
		for (i = 0; i < 2; i++){
			relevantTags.push(tags[i]['tag']);
		}
		return relevantTags;
	},


	parseCategoryObject : function(category, parent_category_id){
		if (typeof parent_category_id === 'undefined') {parent_category_id = '';}
		category_record = {
			name : category.name,
			category_id : category.id,
			short_name : category.shortName,
			parent_category_id : parent_category_id
		};
		return category_record;
	}
}