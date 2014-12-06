/**
 * SmsController
 *
 * @description :: Server-side logic for managing sms
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var twilio = require("/usr/local/lib/node_modules/twilio/lib");
var client = new twilio.RestClient('AC7e83dcc644f2db1aba8831700b2ab78d', '1392668645e3c5ce5895aa67e052032c');


module.exports = {
	incoming: function(req, res){
		var data = req.body;
		console.log(data["Body"]);
		console.log(data["From"]);
		// console.log(JSON.stringify(req.body));
		res.end();

// SMS Message sender from earlier (TEST)
	client.messages.create({
    // body: "Searching for a picture of ".concat(data["Body"]),
    body: "Can't find a picture of " + data["Body"] + " yet. Check back later",
    to: data["From"],
    from: '+15854818566',
    // mediaUrl: "http://www.example.com/hearts.png"
   mediaUrl: "http://thumb7.shutterstock.com/display_pic_with_logo/1284574/194061785/stock-photo-astronaut-on-the-moon-elements-of-this-image-furnished-by-nasa-194061785.jpg"
}, function(err, message) {
    process.stdout.write(message.sid);
    console.log("\nMessage sent")
});
// END SMS message test



	}
};

