$(function(){
  var latitude = null, longitude = null;
  getLocation();

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
  }

  $('#searchForm').on('submit', function(e) {
    doSearch();
    e.preventDefault;
    e.stopPropagation;
  });

  function doSearch() {
    var searchTerm = $('#searchInput').val();
    $.ajax({
      url: '/search/getVenuesByLocation?lat_long=' + latitude + "," + longitude + "&venue=" + searchTerm,
      dataType: "JSON",
      success: function(data) {
        var  images = parseFSQImages(data.images);
        console.log(images);
      }
    });
  }
});

function parseFSQImages(data){
  var small_thumb_size = "100x100",
      large_thumb_size = 'original',
      preview_size = "350x350",
      image_records = [];
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
      };
      image_records.push(record);
    });
    return image_records;
}
