/**
* Ask.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var Ask = {
  schema: true,

  attributes: {
    lat: 'float',
    lon: 'float',
    search: 'string',
    user_id: 'string',
    fulfilled: 'boolean'
  },

  searchByLocation: function(lat,lon, radius) {
    radius = radius || 100;
    box = createBoundingBox(lat,lon);
    return this.find({
      where: {
        lat: {
          '<=' : box.x2,
          '>=' : box.x1
        },
        lon: {
          '<=' : box.y1,
          '>=' : box.y2
        }
      }
    });
  }
};

module.exports = Ask;

function createBoundingBox(lat, lon) {
  var R = 6371;  // earth radius in km
  var radius = 0.1; // km
  var x1 = lon - Math.degrees(radius/R/Math.cos(Math.radians(lat)));
  var x2 = lon + Math.degrees(radius/R/Math.cos(Math.radians(lat)));
  var y1 = lat + Math.degrees(radius/R);
  var y2 = lat - Math.degrees(radius/R);
  return {x1: x1, x2: x2, y1:y1, y2:y2};
}

// Converts from degrees to radians.
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};
