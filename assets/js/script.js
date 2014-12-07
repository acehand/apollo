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
        console.log(data);
      }
    });
  }
});



