/**
 * SearchController
 *
 * @description :: Server-side logic for managing searches
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var utility = require('../services/utilities.js')
var http = require('http');
var rest = require('restler');
module.exports = {
  getTags: function (req, res) {
    var url = sails.config.imaggaConfig.tag_endpoint+'?url=http%3A%2F%2Fwww.visitgarda.com%2FUpload%2Fcms%2F400_x%2FMountain%2520bike%2520sul%2520Lago%2520di%2520Garda(1).jpg';
    var imagga_request = rest.get(url, sails.config.imaggaConfig.headers);
    console.log(imagga_request.headers);
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


  /**
   * `SearchController.getImages()`
   */
  getImages: function (req, res) {
    return res.json({
      todo: 'getImages() is not implemented yet!'
    });
  },


  /**
   * `SearchController.getSearchAttributes()`
   */
  getSearchAttributes: function (req, res) {
    return res.json({
      todo: 'getSearchAttributes() is not implemented yet!'
    });
  }
};

