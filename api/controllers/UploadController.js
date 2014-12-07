/**
 * UploadController
 *
 * @description :: Server-side logic for managing uploads
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var rest = require('restler');

module.exports = {

  list_buckets : function() {
    rest.get("https://api.astra.io/v0/bucket", {'headers': {'Astra-Secret': 'TnpyVVp9iESwpsE6GfcMADfDdQr6BvoC'}}).
    on('complete', function(result) {
      if (result instanceof Error) {
        Log('Error:', result.message);
        // this.retry(5000); // try again after 5 sec
      } else {
        Log("Complete: " + result);
        // Log(String(result.body));
        for (var key in result) {
          if (result.hasOwnProperty(key)) {
            console.log(result[key]);
          }
        }
       }
     }).
    on('success', function(results){
      Log("Success: " + results.boday)
    })
  },

  list_bucket_names : function() {
    rest.get("https://api.astra.io/v0/bucket", {'headers': {'Astra-Secret': 'TnpyVVp9iESwpsE6GfcMADfDdQr6BvoC'}}).
    on('complete', function(result) {
      if (result instanceof Error) {
        Log('Error:', result.message);
        //this.retry(5000); // try again after 5 sec
      } else {
        Log('Data:' + String(result.data));
      }
    }).
    on('success', function(results){
      names = results.data.map(function(bucket){
            return bucket.name
          });
      Log('Names: ' + String(names))
    })
  },

  create_bucket : function(bucket_name) {
    rest.post("https://api.astra.io/v0/bucket", {'headers': {'Astra-Secret': 'TnpyVVp9iESwpsE6GfcMADfDdQr6BvoC'}, 'data': {'name': bucket_name}}).
    on('complete', function(result) {
      if (result instanceof Error) {
        Log('Error:', result.message);
        // this.retry(5000); // try again after 5 sec
      } else {
        Log(result);
      }
     })
  },

  read_bucket : function(bucket_name) {
    rest.get("https://api.astra.io/v0/bucket/" + bucket_name, {'headers': {'Astra-Secret': 'TnpyVVp9iESwpsE6GfcMADfDdQr6BvoC'}}).
    on('complete', function(result) {
      if (result instanceof Error) {
        Log('Error:', result.message);
        // this.retry(5000); // try again after 5 sec
      } else {
        Log(result);
      }
     })
  },

  upload_picture : function(bucket_name, file_name, file_location) {
    rest.post("https://api.astra.io/v0/bucket/" + bucket_name + "/object", 
      {'headers': {'Astra-Secret': 'TnpyVVp9iESwpsE6GfcMADfDdQr6BvoC'}, 'type': 'image', 'name': file_name, 'file': '@' + file_location}).
    on('complete', function(result) {
      if (result instanceof Error) {
        Log('Error:', result.message);
        // this.retry(5000); // try again after 5 sec
      } else {
        Log(result);
      }
     })
  },

  // delete_bucket:function(bucket_name){
  // unirest.get("https://api.astra.io/v0/bucket/" + bucket_name)
  // .headers({ 'Astra-Secret': 'TnpyVVp9iESwpsE6GfcMADfDdQr6BvoC'})
  // .end(function (response) {
  //   Log(response.body);
  // })
  // };

};

// module.exports = UploadController;
