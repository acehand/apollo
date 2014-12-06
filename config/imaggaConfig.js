module.exports.imaggaConfig = {
	key : 'acc_eec5d258cff0bff',
	secret : 'ff5890d85c0afc1c701d82269866dcae',
	endpoint : 'http://api.imagga.com/',
	tag_endpoint : 'http://api.imagga.com/v1/tagging',
	headers : {
		'headers' : {'Authorization': "Basic " + new Buffer('acc_eec5d258cff0bff:ff5890d85c0afc1c701d82269866dcae').toString('base64') }
	}
}

module.exports.shutterStock = {
	key : '068fbc8e56a18a20776b',
	secret : 'e6dcf212ee3c3ac6299b868c84ebf0452bb9ff76',
	base_url : 'https://api.shutterstock.com/v2/images/search',
	headers : {
		'headers' : {'Authorization': "Basic " + new Buffer('068fbc8e56a18a20776b:e6dcf212ee3c3ac6299b868c84ebf0452bb9ff76').toString('base64') }
	}

}

module.exports.twilioConfig = {
	key : 'AC7e83dcc644f2db1aba8831700b2ab78d',
	secret : '1392668645e3c5ce5895aa67e052032c',
	default_pic: "http://thumb7.shutterstock.com/display_pic_with_logo/1284574/194061785/stock-photo-astronaut-on-the-moon-elements-of-this-image-furnished-by-nasa-194061785.jpg"
}