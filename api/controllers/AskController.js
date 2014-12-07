/**
 * AskController
 *
 * @description :: Server-side logic for managing asks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req, res) {
		res.view('ask/index');
	}
};

