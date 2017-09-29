var keys = require("./keys.js");
var request = require('request');
var fs = require("fs");
var twitterKeys = keys.twitterKeys;
var spotifyKeys = keys.spotifyKeys;
var songTitle = "";
var movieTitle = "";
var argv = process.argv;
//Define functions for each command
switch (argv[2]) {
  case "my-tweets":
    myTweets();
    break;

  case "spotify-this-song":
    spotifyThis();
    break;

  case "movie-this":
    movieThis();
    break;

  case "do-what-it-says":
    doThis();
    break;
}
//Return last 20 tweets
function myTweets() {
  writeToLog()
  twitterKeys.get('statuses/user_timeline', {
    count: 20
  }, function(error, tweets, response) {
    for (var i = 0; i < tweets.length; i++) {
      console.log(tweets[i].text + "\n" + tweets[i].created_at + "\n_____________________________________");
    }
  });
}
//Search for the song in spotify
function spotifyThis() {
  writeToLog()
  if (argv[3] === undefined) {
    songTitle = "The Sign, Ace of Base";
  } else {
    for (var i = 3; i < argv.length; i++) {
      if (i === argv.length - 1) {
        songTitle += argv[i];
      } else {
        songTitle += argv[i] + " ";
      }
    }
  }
  spotifyKeys.search({
      type: 'track',
      query: songTitle
    }).then(function(response) {
      console.log("Artist: " + JSON.stringify(response.tracks.items[0].album.artists[0].name, null, 2) +
        "\nSong Name: " + JSON.stringify(response.tracks.items[0].name, null, 2) +
        "\nPreview Link: " + JSON.stringify(response.tracks.items[0].album.artists[0].external_urls.spotify, null, 2) +
        "\nAlbum: " + JSON.stringify(response.tracks.items[0].album.name, null, 2));
    })
    .catch(function(err) {
      console.log(err);
    });
}
//Use request to search the OMDB API for movie info
function movieThis() {
  writeToLog()
  if (argv[3] === undefined) {
    movieTitle = "Mr Nobody";
  } else {
    for (var i = 3; i < argv.length; i++) {
      if (i === argv.length - 1) {
        movieTitle += argv[i];
      } else {
        movieTitle += argv[i] + " ";
      }
    }
  }
  request("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=40e9cece", function(err, response, body) {
    // If the request is successful
    if (!err && response.statusCode === 200) {
      // Then log the Release Year for the movie
      console.log(
      "Title: " + JSON.parse(body).Title +
      "\nYear: " + JSON.parse(body).Year +
      "\nIMDB Rating: " + JSON.parse(body).Ratings[0].Value  +
      "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value +
      "\nCountry: " + JSON.parse(body).Country +
      "\nLanguage: " + JSON.parse(body).Language +
      "\nPlot: " + JSON.parse(body).Plot +
      "\nActors: " + JSON.parse(body).Actors
      );
    } 
    else {
      console.log(err);
    }
  });
}
//search for the song listes in random.txt
function doThis() {
  fs.readFile("random.txt", "utf8", function(err, data) {
 	if (err) {
      return console.log(err);
    }
    else {
      var dataSplit = data.split(","); 
      songTitle = dataSplit[1];
      argv.push(songTitle);
      spotifyThis();
    }
  })
}
//Write each request to log.txt
function writeToLog() {
  var newArgv = argv.slice(2, argv.length);
  fs.appendFile("log.txt", '\n' + newArgv, function(err){
    if (err) {
      return console.log(err);
    }
  });
}