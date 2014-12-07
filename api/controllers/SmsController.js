/**
 * SmsController
 *
 * @description :: Server-side logic for managing sms
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var twilio = require("twilio");
var twilio_config = sails.config.twilio
var client = new twilio.RestClient(twilio_config.TWILIO_SID, twilio_config.TWILIO_TOKEN);

module.exports = {
	incoming: function(req, res){
		var body = req.body, search_term = body["Body"], image_url=sails.config.twilioConfig.default_pic;
		console.log(search_term);
		console.log(body["From"]);
		utilities.getImages(search_term,function(req_image){
			console.log(String(req_image));
			if ((typeof req_image !== 'undefined') || req_image == '') {
				image_url = req_image;
				console.log(image_url);
				client.messages.create({
					body: "Here is a picture of \"" + search_term + "\"",
					to: body["From"],
					from: '+15854818566',
					mediaUrl: image_url,
				}, function(err, message) {
					if (!err){
						process.stdout.write(message.sid);
						console.log('Success! The SID for this SMS message is:');
        				console.log(message.sid);
        				console.log("\nMessage sent");
					} else {
						Log.error("Something went wrong with twilio");
						Log.error(err);
					}
				});
			} else {
				client.messages.create({
					body: "Can't find a picture of \"" + search_term + "\" yet. Check back later",
					to: body["From"],
					from: '+15854818566',
					mediaUrl: image_url,
				}, function(err, message) {
					process.stdout.write(message.sid);
					console.log("\nMessage sent");
				});
			}
		});
		// if (image_found){
		// 	var image_url = image_found;
		// } else {
		// 	var image_url = ;
		// }

		// client.messages.create({
		// 	body: body_text,
		// 	to: data["From"],
		// 	from: '+15854818566',
		// 	mediaUrl: image_url
		// }, function(err, message) {
		// 	process.stdout.write(message.sid);
		// 	console.log("\nMessage sent")
		// });
		// // END SMS message test
	}
};

