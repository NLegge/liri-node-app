console.log('*****');
//Twitter keys
var Twitter = require('twitter');
var twitterKeys = new Twitter ({
  consumer_key: 'c3IuedWtg8MOpowOuLTKTTQYt',
  consumer_secret: 'CJJoxTl3O5WCntOT5VNZndyGpFNY3jo6zbRjfIpUahfYMBiFNx',
  access_token_key: '909931102898233344-A9YvMFBcqz8wVjzmTO08Tx1ixKeFKhh',
  access_token_secret: 'iBMJJFnoWXiK9Lze7qdisTjqEyuEqfqPlK5c8DBEurzuT',
});
//spotify keys
var Spotify = require('node-spotify-api');
var spotifyKeys = new Spotify({
  id: "82a7654e851d47a58747d34bb5c7f9e1",
  secret: "1a05d32bb32842e298746fdb3280562d"
});
//export keys for use in liri.js
module.exports = {
	twitterKeys: twitterKeys,
	spotifyKeys: spotifyKeys
};
  