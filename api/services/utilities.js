var baseParams = sails.config;
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

	buildSTQuery : function(keywords){
		if (keywords instanceof Array) return '?query='+terms.toString();
		if (keywords.hasOwnProperty('Category')) {
			return 'category='+keywords['Category'];
		}
	},
	buildFSQuery : function(params){
		var qString = '';
		if (params.hasOwnProperty('Lat_Long')) {
			qString = 'll='+params['Lat_Long'];
		} else {
			qString = 'near='+params['location'];
		}
		if (params.hasOwnProperty('venue')) {
			qString += '&query='+params['venue'];
		}
		qString += '&intent=browse&radius=5000';
		return '?'+qString+'&oauth_token=QRIWYVATNEXM3HVSD2SQA5QVIK3JRZF205K5TBOZSPV02G5Q&v=20141207';
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
	},
	getImages: function (search_term,callBack) {
    var query_term = search_term;
    var term = "?per_page=1&query="+query_term;
    var url = baseParams.shutterStock.base_url + term;
    var images = rest.get(url, baseParams.shutterStock.headers);
    var req_image;
    images.on('success',function(result){
      if (result.total_count > 0) {
        req_image = result.data[0].assets.small_thumb;
      } else {
      	req_image = "";
      }

      // Images.addImage(result,term, 'SHUTTERSTOCK');
    });
    images.on('fail',function(result){
     Log.error("No results");
     console.log(result);
    });
    images.on('complete',function(result){
        callBack(req_image.url);
    });
  },
	getImagesInVenue : function (venue_id, callBack){
    var url = 'https://api.foursquare.com/v2/venues/'+venue_id+'/photos?oauth_token=QRIWYVATNEXM3HVSD2SQA5QVIK3JRZF205K5TBOZSPV02G5Q&v=20141207';
    var photos, images;
    rest.get(url).
      on('fail',function(response){
        Log.error(response);
      }).
      on('success', function(result){
        if (result.response.photos) {
          photos = result.response.photos;
          if (photos.count > 0) {
            Log.info('Fetching Images');
            images = photos.items;
          }
        }
      	callBack(images);
      }).
      on('complete', function(result){
      	  return;
      });
  },
}
