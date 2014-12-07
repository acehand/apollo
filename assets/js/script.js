$(function(){
  var latitude = null, longitude = null;
  getLocation();

  // Immediately start connecting
  socket = io.connect();
  var requests = $('.total_requests');

  // Attach a listener which fires when a connection is established:
  socket.on('connect', function socketConnected() {

    typeof console !== 'undefined' &&
    console.log(
      'Socket is now connected and globally accessible as `socket`.\n' +
      'e.g. to send a GET request to Sails via Socket.io, try: \n' +
      '`socket.get("/foo", function (response) { console.log(response); })`'
    );

    socket.on('createRequest', function(response){
      socket.get('/ask/getRequests?lat=40.7284341&lon=-73.99114', function(response){
        console.log('requests message');
        requests.text(response.length);
      });
    });

    socket.get('/ask/getRequests?lat=40.7284341&lon=-73.99114', function(response){
      console.log('requests');
      requests.text(response.length);
    });

    // Attach a listener which fires every time the server publishes a message:
    socket.on('message', function newMessageFromSails ( message ) {

      typeof console !== 'undefined' &&
      console.log('New message received from Sails ::\n', message);

    });
  });

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
    if ($('#map-canvas').length) { initialize(); }
  }

  $('#searchForm').on('submit', function(e) {
    doSearch();
    var askBox = $("#askHolder");
    askBox.find('a').attr("href","/ask?search=" + $('#searchInput').val());
    askBox.show();
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

  var geocoder;
  var map;
  var marker;
  var infowindow = new google.maps.InfoWindow();

  function initialize() {
      geocoder = new google.maps.Geocoder();
      var myLatlng = new google.maps.LatLng(latitude,longitude);
          var mapOptions = {
              zoom: 14,
              center: myLatlng,
              mapTypeId: google.maps.MapTypeId.ROADMAP
          }
      map = new google.maps.Map(document.getElementById('map-canvas'),
                                    mapOptions);

      marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Your Location',
        draggable:true // Makes the marker draggable
      });

      // adds an event listener on the marker.
      // The event is fired when the marker is dropped in this case
      google.maps.event.addListener(marker, 'dragend', function() {
          codeLatLng(marker);
      });

      $('#createRequestButton').on('click', function(e){
        console.log('here');
        var latlng = marker.getPosition();
        console.log(latlng);
        searchTerm = getParameterByName('search');
        function getParameterByName(name) {
          name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
          var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
              results = regex.exec(location.search);
          return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
        // $.ajax({
        //   url: '/ask/createRequest?lat=' +latitude+ '&lon=' +longitude+ '&search=' + searchTerm,
        //   dataType: 'JSON',
        //   success: function(data) {
        //     // created!
        //   }
        // });
        e.preventDefault();
        e.stopPropagation();
      }).trigger('click');
  }

  function codeLatLng(marker) {
    var latlng = marker.getPosition();
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          infowindow.open(map, marker);
        } else {
          alert('No results found');
        }
      } else {
        alert('Geocoder failed due to: ' + status);
      }
    });
  }

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

});
