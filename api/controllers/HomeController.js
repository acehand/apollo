/**
 * HomeController
 *
 * @description :: Server-side logic for managing Homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var HomeController = {
	index: function(req, res) {
		// console.log(req.session.passport.user);
		User.findOne({
			id: req.session.passport.user
		}, function(err, passport){
			if (passport) {
				res.view('home/index', {user: passport});
			} else {
				res.redirect('/login');
			}
		});
	}
};

module.exports = HomeController;
