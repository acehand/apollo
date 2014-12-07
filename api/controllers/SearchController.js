var utility = require('../services/utilities.js')

var rest = require('restler');
var baseParams = sails.config;
module.exports = {
  getTags: function (req, res) {
    var url = sails.config.imaggaConfig.tag_endpoint+'?url=http%3A%2F%2Fwww.visitgarda.com%2FUpload%2Fcms%2F400_x%2FMountain%2520bike%2520sul%2520Lago%2520di%2520Garda(1).jpg';
    var imagga_request = rest.get(url, sails.config.imaggaConfig.headers);
    console.log(imagga_request.headers);
    Log.info("requesting Image");
    imagga_request.on('success',function(result){
      console.log('Image tags Fetched');
    });
    imagga_request.on('fail', function(result) {
     console.log('Failed Imaga Request');
     console.log(result);
    });
    imagga_request.on('complete',function(result){
      return res.json(utility.parseImagga(result) );
    });
  },

  getImages: function (req, res) {
    //Add page numbers to DB later
    var search_term = '?query="landscape Travel"';
    var term = "landscape travel";
    var url = baseParams.shutterStock.base_url + search_term;
    var images = rest.get(url, baseParams.shutterStock.headers);
    images.on('success',function(result){
      // Images.addImage(result,term, 'SHUTTERSTOCK');
    });
    images.on('fail',function(result){
     console.log('No results');
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
