/**
 * FaceController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to FaceController)
   */
  _config: {},

    show: function (req, res, next) {
	res.view('face/show');

  res.send();

  },

  create: function (req, res, next) {

var protocol = req.connection.encrypted?'https':'http';
var baseUrl = protocol + '://' + req.headers.host + '/';

var imgName = req.param('imgName');
var onlineLink = baseUrl + 'linker/img/' + imgName;
console.log(onlineLink);

var request = require('request');
request('http://api.skybiometry.com/fc/faces/detect.json?api_key=e4d4ec55fc2c437eb4af7bf22f701f27&api_secret=cc0a6e6c81ef41a290b2e93430df78fc&urls='+onlineLink+'&attributes=all', function (error, response, body) {
  if (!error && response.statusCode == 200) {

    var smile = new Array();
    smile = JSON.parse(body).photos[0].tags[0].attributes.smiling['value'];
    console.log(smile);

  }
})

	res.view('face/create');

  	// the sign-up form --> new.ejs
  	// Face.create( req.params.all(), function userCreated (err, user) {

  	// 	// If there's an error
  	// 	// if (err) return next(err);

  	// 	if (err) {
  	// 		console.log(err);

	  // 		// If error redirect back to sign-up page
	  // 		return res.redirect('/user/new');
	  // 	}

  	// 	// After successfully creating the user
  	// 	// redirect to the show action
  	// 	// res.json(user);
  	// 	res.redirect('/user/show/'+user.id);
  	// });
  }


  
};
