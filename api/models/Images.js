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
				venue_id : '', 
				img_source : source
			}
			Images.create(record);
		});		
	},

	addFromFS : function(data, venue_id, venue_name, source) {
		small_thumb_size = "100x100";
		large_thumb_size = 'original';
		preview_size = "350x350";
		data.forEach(function(image){
			record = {
				preview : image.prefix+preview_size+image.suffix,
				large_thumb: image.prefix+large_thumb_size+image.suffix,
				small_thumb: image.prefix+small_thumb_size+image.suffix,
				title : '',
				img_source : source, 
				type : 'image',
				image_id : image.id, 
				search_term : venue_name,
				venue_id : venue_id
			}
			Images.create(record);
			Log.info("image record created");
		});
	}
};

