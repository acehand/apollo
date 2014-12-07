/**
 * HomeController
 *
 * @description :: Server-side logic for managing Homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var HomeController = {
	index: function(req, res) {
		if (req.session.passport && req.session.passport.user) {
			User.findOne({
				id: req.session.passport.user
			}, function(err, user){
				if (user) {
					res.view('home/index', {user: user});
				} else {
					console.log('here');
					res.redirect('/login');
				}
			});
		} else {
			res.redirect('/login');
		}
	}
};

module.exports = HomeController;
