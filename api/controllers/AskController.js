/**
 * AskController
 *
 * @description :: Server-side logic for managing asks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req, res) {
		if (req.session.passport && req.session.passport.user) {
			User.findOne({
				id: req.session.passport.user
			}, function(err, user){
				if (user) {
					res.view('ask/index');
				} else {
					console.log('here');
					res.redirect('/login');
				}
			});
		} else {
			res.redirect('/login');
		}
	},
	getRequests: function(req, res) {
		var lat = parseFloat(req.query.lat);
		var lon = parseFloat(req.query.lon);
		box = createBoundingBox(lat,lon);
		Ask.find({
			where: {
				lat: {
					'<=' : box.y1,
					'>=' : box.y2
				},
				lon: {
					'<=' : box.x2,
					'>=' : box.x1
				}
			}
		}, function(err, results){
			res.json(results);
		});
	},
	createRequest: function(req, res) {
		var socket = req.socket;
		var io = sails.io;
		var lat = req.query.lat;
		var lon = req.query.lon;
		var search = req.query.search;
		var user_id = req.session.passport.user;
		Ask.create({
			lat: lat,
			lon: lon,
			search: search,
			user_id: user_id
		}, function(err, result){
			io.sockets.emit('createRequest', 'new');
			res.json(result);
		});
	},
	show: function(req, res) {
		var id = req.params.id
		Ask.findOne({id: id}, function(err, result){
			res.view('ask/show',{ask: result});
			// res.json(results);
		});
	}
};



function createBoundingBox(lat, lon) {
  var R = 6371;  // earth radius in km
  var radius = 0.1; // km
  var x1 = lon - degrees(radius/R/Math.cos(radians(lat)));
  var x2 = lon + degrees(radius/R/Math.cos(radians(lat)));
  var y1 = lat + degrees(radius/R);
  var y2 = lat - degrees(radius/R);
  return {x1: x1, x2: x2, y1:y1, y2:y2};
}

// Converts from degrees to radians.
function radians(degrees) {
  return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
function degrees(radians) {
  return radians * 180 / Math.PI;
};
