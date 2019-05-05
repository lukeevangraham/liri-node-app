require("dotenv").config();

var moment = require('moment');
moment().format();

var keys = require("./keys.js");

// Example of accessing key information
// var spotify = new Spotify(keys.spotify);

// Take in the command line arguments
const userArguments = process.argv.slice(2);

// console.log(userArguments);

const searchTerm = userArguments.slice(1).join(' ');

// console.log(searchTerm);

if (userArguments[0] === "concert-this") {
    // Grab the axios package...
    var axios = require("axios");

    var artist = userArguments[1];
    console.log(artist);

    axios
        .get("http://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            // If the axios was successful...
            // Then log the body from the site!
            console.log(response.data[0]);

            console.log('\n\n');
            console.log('Venue name: ' + response.data[0].venue.name);
            console.log('Venue location: ' + response.data[0].venue.city + ", " + response.data[0].venue.country);
            // console.log('Date of Event: ' + data.tracks.items[0].external_urls.spotify);
            // console.log('Album: ' + data.tracks.items[0].album.name);
            console.log('\n\n');





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
    spotify.search({ type: 'track', query: searchTerm }, function (err, data) {
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

    })

}
if (userArguments[0] === "movie-this") {

    // var movieInput = userArguments[1];
    console.log(searchTerm);

    var axios = require("axios");

    axios
        .get("http://www.omdbapi.com/?apikey=trilogy&t=" + searchTerm)
        .then(function (response) {
            // If the axios was successful...
            // Then log the body from the site!
            console.log(response.data);

            console.log('\n\n');
            console.log('Title: ' + response.data.Title);
            console.log('Year Released: ' + response.data.Year);
            console.log('IMDB Rating: ' + response.data.imdbRating + "/10");
            console.log('Rotten Tomatoes Rating: ' + response.data.Ratings[1].Value);
            console.log('Language: ' + response.data.Language);
            console.log('Plot: ' + response.data.Plot);
            console.log('Actors: ' + response.data.Actors);
            console.log('\n\n');



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
if (userArguments[0] === "do-what-it-says") {

}