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
    e.preventDefault();
    e.stopPropagation();
  });

  function doSearch() {
    var searchTerm = $('#searchInput').val();
    $.ajax({
      url: '/search/getVenuesByLocation?lat_long=' + latitude + "," + longitude + "&venue=" + searchTerm,
      dataType: "JSON",
      success: function(data) {
        var  images = parseFSQImages(data);
        var results = "";
        images.forEach(function(image){
          results = results + "<div class='col'><img src='" + image.small_thumb + "'></div>";
        })
        $("#searchResults").html(results);
      }
    });
  }
});

function parseFSQImages(data){
  var small_thumb_size = "100x100",
      large_thumb_size = 'original',
      preview_size = "350x350",
      image_records = [];
    data.forEach(function(item){
      var image = item.images[0];
      record = {
        preview : image.prefix+preview_size+image.suffix,
        large_thumb: image.prefix+large_thumb_size+image.suffix,
        small_thumb: image.prefix+small_thumb_size+image.suffix,
        title : item.name,
        type : 'image',
        image_id : image.id,
      };
      image_records.push(record);
    });
    return image_records;
}

$(function(){
  if ($('#map-canvas').length) {
    var geocoder;
    var map;
    var infowindow = new google.maps.InfoWindow();
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
      initialize();
    }

    function initialize() {
        geocoder = new google.maps.Geocoder();
        var myLatlng = new google.maps.LatLng(latitude,longitude);
            var mapOptions = {
                zoom: 4,
                center: myLatlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
        map = new google.maps.Map(document.getElementById('map-canvas'),
                                      mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'Hello World!',
            draggable:true // Makes the marker draggable
      });

        // adds an event listener on the marker.
        // The event is fired when the marker is dropped in this case
        google.maps.event.addListener(marker, 'dragend', function() {
            codeLatLng(marker);
        });
    }

    function codeLatLng(marker) {


      var latlng = marker.getPosition();
      //var latlng = new google.maps.LatLng(lat, lng);
      geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            infowindow.setContent("<button>click</button>");
            infowindow.open(map, marker);
          } else {
            alert('No results found');
          }
        } else {
          alert('Geocoder failed due to: ' + status);
        }
      });
    }
  }
});
