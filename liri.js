require("dotenv").config();

var moment = require('moment');
moment().format();

var keys = require("./keys.js");

// Example of accessing key information
// var spotify = new Spotify(keys.spotify);

// Take in the command line arguments
const userArguments = process.argv.slice(2);

console.log(userArguments);

const searchTerm = userArguments.slice(1).join(' ');

console.log(searchTerm);

if (userArguments[0] === "concert-this") {
    // Grab the axios package...
    var axios = require("axios");

    var artist = userArguments[1];
    console.log(artist);

    axios
        .get("http://www.bandsintown.com/event/?app_id=codingbootcamp&artist=" + artist + "&date=upcoming")
        .then(function(response) {
            // If the axios was successful...
            // Then log the body from the site!
            console.log(response.data);





          })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });

}
if (userArguments[0] === "spotify-this-song") {
    var Spotify = require('node-spotify-api');
 
var spotify = new Spotify(keys.spotify);

// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
spotify.search({ type: 'track', query: searchTerm }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
//   console.log(data.tracks.items[0].external_urls.spotify); 

  console.log('\n\n');
  console.log('Artist: ' + data.tracks.items[0].album.artists[0].name);
  console.log('Song name: ' + data.tracks.items[0].name);
  console.log('Preview: ' + data.tracks.items[0].external_urls.spotify);
  console.log('Album: ' + data.tracks.items[0].album.name);
  console.log('\n\n');
  
     
// spotify
// .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
// .then(function(data) {
//   console.log(data); 



})
// .catch(function(err) {
//   console.error('Error occurred: ' + err); 
// });
}
if (userArguments[0] === "movie-this") {

}
if (userArguments[0] === "do-what-it-says") {

}