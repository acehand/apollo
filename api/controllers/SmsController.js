/**
 * SmsController
 *
 * @description :: Server-side logic for managing sms
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var twilio = require("twilio");
var client = new twilio.RestClient(sails.config.twilioConfig.key, sails.config.twilioConfig.key.secret);


module.exports = {
	incoming: function(req, res){
		var data = req.body;
		console.log(data["Body"]);
		console.log(data["From"]);
		// res.end();
		// TEST: Currently don't return a picture
		var image_found = false;
		if (image_found){
			var body_text = "Here is a picture of " + data["Body"];
			var image_url = "";
		} else {
			var body_text = "Can't find a picture of " + data["Body"] + " yet. Check back later"
			var image_url = sails.config.twilioConfig.default_pic
		}

// SMS Message sender from earlier (TEST)
	client.messages.create({
    body: body_text,
    to: data["From"],
    from: '+15854818566',
    mediaUrl: image_url
}, function(err, message) {
    process.stdout.write(message.sid);
    console.log("\nMessage sent")
});
// END SMS message test



	}
};

