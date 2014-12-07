module.exports = {
	addImage : function(data, search_term, source){
		var image_data = data['data'], record;
		image_data.forEach(function(image_meta){
			record = {
				title : image_meta.description,
				preview : image_meta.assets.preview.url,
				large_thumb : image_meta.assets.large_thumb.url,
				small_thumb : image_meta.assets.small_thumb.url,
				search_term : search_term, 
				type : image_meta.image_type,
				image_id : image_meta.id, 
				img_source : source
			}
			Images.create(record);
		});
		
	}
};

