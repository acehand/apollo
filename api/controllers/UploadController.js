/**
 * UploadController
 *
 * @description :: Server-side logic for managing uploads
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var unirest = require('unirest');

var UploadController = {
  list_buckets : function() {
    unirest.get("https://api.astra.io/v0/bucket")
    .headers({ 'Astra-Secret': 'TnpyVVp9iESwpsE6GfcMADfDdQr6BvoC'})
    .end( function(response) {
      console.log(response.body);
      console.log(response.body.data[0].objects);
    });
  },

  list_bucket_names : function() {
    unirest.get("https://api.astra.io/v0/bucket")
    .headers({ 'Astra-Secret': 'TnpyVVp9iESwpsE6GfcMADfDdQr6BvoC'})
    .end( function(response) {
      var data = response.body.data;
      data.map( function(bucket) {
         console.log(bucket.name);
      });
    });
  },

  create_bucket : function(bucket_name) {
    unirest.post("https://api.astra.io/v0/bucket")
    .headers({ 'Astra-Secret': 'TnpyVVp9iESwpsE6GfcMADfDdQr6BvoC'})
    .field('name', bucket_name)
    .end( function(response) {
      console.log(response.body);
    });
  },

  read_bucket : function(bucket_name) {
    unirest.get("https://api.astra.io/v0/bucket/" + bucket_name)
    .headers({ 'Astra-Secret': 'TnpyVVp9iESwpsE6GfcMADfDdQr6BvoC'})
    .end( function(response) {
      console.log(response.body);
    });
  },

  // delete_bucket:function(bucket_name){
  // unirest.get("https://api.astra.io/v0/bucket/" + bucket_name)
  // .headers({ 'Astra-Secret': 'TnpyVVp9iESwpsE6GfcMADfDdQr6BvoC'})
  // .end(function (response) {
  //   console.log(response.body);
  // })
  // };
};

module.exports = UploadController;
