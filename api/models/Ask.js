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
  }
};

module.exports = Ask;
