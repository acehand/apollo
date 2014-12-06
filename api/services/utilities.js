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
	}
}