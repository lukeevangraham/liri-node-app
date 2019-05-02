require("dotenv").config();

var moment = require('moment');
moment().format();

var keys = require("./keys.js");

// Example of accessing key information
// var spotify = new Spotify(keys.spotify);

// Take in the command line arguments
const userArguments = process.argv.slice(2);

console.log(userArguments);

if (userArguments[0] === "concert-this") {
    // Grab the axios package...
    var axios = require("axios");

    var artist = userArguments[1];
    console.log(artist);

    axios
        .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
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

}
if (userArguments[0] === "movie-this") {

}
if (userArguments[0] === "do-what-it-says") {

}