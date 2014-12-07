var utility = require('../services/utilities.js')
     rest = require('restler'),
    baseParams = sails.config;
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
     var params = {};
    params.Lat_Long = "48.858093,2.294694";
    params.venue = req.query.venue;
    var venues, imagesByVenue=[];
    var url = 'https://api.foursquare.com/v2/venues/search' + (utilities.buildFSQuery(params));
    Log.info(url);
    rest.get(url).
      on('success', function(results){
      }).
      on('complete',function(results){
         results.response.venues.forEach(function(venue,index,array){
            var name = venue.name;
            console.log(array);
            utilities.getImagesInVenue(venue.id, function(result){
              if (typeof result !== 'undefined') imagesByVenue.push({name:name, images:result});
              if (index == array.length-1) {
                  console.log('all done');
                  return res.json(imagesByVenue);
               }
            });
          });
      }).
      on('fail', function(result){
        Log.error(result);
      });
  },

  getImagesInVenue : function (req,res){
    req.id = '4d1e3d2a16cfb60cadd84661';
    req.name = "Cake Joy";
    var url = 'https://api.foursquare.com/v2/venues/'+req.id+'/photos?oauth_token=QRIWYVATNEXM3HVSD2SQA5QVIK3JRZF205K5TBOZSPV02G5Q&v=20141207';
    var photos;
    rest.get(url).
      on('fail',function(response){
        Log.error(response);
      }).
      on('success', function(result){
        if (result.response.photos) {
          photos = result.response.photos;
          if (photos.count > 0) {
            Images.addFromFS(photos.items, req.id, req.name, 'FOURSQUARE');
          }
        }
      });
  },

  getImages: function (req, res) {
    var query_term = req.query.search_term
    var term = "?per_page=1&query="+query_term;
    var url = baseParams.shutterStock.base_url + term;
    var images = rest.get(url, baseParams.shutterStock.headers);
    var req_image;
    images.on('success',function(result){
      if (result.total_count > 0) {
        req_image = result.data[0].assets.small_thumb
      }
      // Images.addImage(result,term, 'SHUTTERSTOCK');
    });
    images.on('fail',function(result){
     Log.error("No results");
     console.log(result);
    });
    images.on('complete',function(result){
        return res.json(req_image.url);
    });
  },

  getSearchAttributes: function (req, res) {
    return res.json({
      todo: 'getSearchAttributes() is not implemented yet!'
    });
  }, 

  getLocationsRef : function(req,res){
    if (req.hasOwnProperty('name')) {
      url = 'http://gd.geobytes.com/AutoCompleteCity?callback=?&q='+req.name;
      rest.get(url).on('complete',function(result){
          res.json(result);
      });
    } 
  }
};


function getImagesInVenue (req,res){
  req.id = '4d1e3d2a16cfb60cadd84661';
  req.name = "Cake Joy";
  var url = 'https://api.foursquare.com/v2/venues/'+req.id+'/photos?oauth_token=QRIWYVATNEXM3HVSD2SQA5QVIK3JRZF205K5TBOZSPV02G5Q&v=20141207';
  var photos;
  rest.get(url).
    on('fail',function(response){
      Log.error(response);
    }).
    on('success', function(result){
      if (result.response.photos) {
        photos = result.response.photos;
        if (photos.count > 0) {
          Images.addFromFS(photos.items, req.id, req.name, 'FOURSQUARE');
        }
      }
    });
}
