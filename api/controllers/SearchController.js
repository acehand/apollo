var utility = require('../services/utilities.js')
var rest = require('restler');
var baseParams = sails.config;
module.exports = {
  getTags: function (req, res) {
    var url = sails.config.imaggaConfig.tag_endpoint+'?url=http%3A%2F%2Fwww.visitgarda.com%2FUpload%2Fcms%2F400_x%2FMountain%2520bike%2520sul%2520Lago%2520di%2520Garda(1).jpg';
    var imagga_request = rest.get(url, sails.config.imaggaConfig.headers);
    Log.info(imagga_request.headers);
    Log.info("requesting Image");
    imagga_request.on('success',function(result){
      Log.silly("Images Fetched");
    });
    imagga_request.on('fail', function(result) {
     Log.error('Failed Imaga Request');
     Log.info(result);
    });
    imagga_request.on('complete',function(result){
      return res.json(utility.parseImagga(result));
    });
  },

//Needs Location lat lon or Place  and String for location
  getVenuesByLocation : function(req, res) {
     req.Lat_Long = "40.7,-74";
    var venues;
    var url = 'https://api.foursquare.com/v2/venues/search' + (utilities.buildFSQuery(req));
    rest.get(url).
      on('success', function(results){
          venues = results.response.venues.map(function(item){
            return {
               name: item.name,
               id: item.id,
               location : item.location
             }
          });
      }).
      on('complete',function(results){
          return res.json(venues);
      }).
      on('fail', function(result){
        Log.error(result);
      });
  },

  getImages: function (req, res) {
    var term = "landscape travel";
    var url = baseParams.shutterStock.base_url + utilities.buildSTQuery(req.term);
    var images = rest.get(url, baseParams.shutterStock.headers);
    images.on('success',function(result){
      Images.addImage(result,term, 'SHUTTERSTOCK');
    });
    images.on('fail',function(result){
     Log.error("No results");
     console.log(result);
    });
    images.on('complete',function(result){
        return res.json({
           todo: 'getImages() is not implemented yet!'
        });  
    });
  },

  getSearchAttributes: function (req, res) {
    return res.json({
      todo: 'getSearchAttributes() is not implemented yet!'
    });
  }
};
