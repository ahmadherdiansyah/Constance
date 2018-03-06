// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: '402191946869476', // your App ID
		'clientSecret' 	: '69307010cf842119684ed6a5a715ef8d', // your App Secret
		'callbackURL' 	: 'http://localhost:3000/auth/facebook/callback'
	},

	'twitterAuth' : {
		'consumerKey' 		: 'your-consumer-key-here',
		'consumerSecret' 	: 'your-client-secret-here',
		'callbackURL' 		: 'http://localhost:8080/auth/twitter/callback'
	},

	'googleAuth' : {
		'clientID' 		: '108992684181-gvro7mg3bal2eb3q1q84t9fj72t6ulvd.apps.googleusercontent.com',
		'clientSecret' 	: 'DHIMsLTWHZYNJc5YzqNyF2TU',
		'callbackURL' 	: 'http://localhost:3000/auth/google/callback'
	}

};