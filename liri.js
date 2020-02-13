require("dotenv").config();

var moment = require('moment');
var keys = require("./keys.js");
var fs = require('fs');

// Take in the command line arguments
var userArguments = process.argv.slice(2);

var searchTerm = userArguments.slice(1).join(' ');

fs.appendFile("log.txt", userArguments, function (err) {
    if (err) throw err;
})

// SEARCH SPOTIFY FUNCTION
function searchSpotify(searchTerm) {
    var Spotify = require('node-spotify-api');

    var spotify = new Spotify(keys.spotify);

    if (searchTerm === "") {
        searchTerm = "The Sign Ace";
    }
    spotify.search({ type: 'track', query: searchTerm }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        let answer = `
        
        Artist: ` + data.tracks.items[0].album.artists[0].name + `
        Song name: ` + data.tracks.items[0].name + `
        Preview: ` + data.tracks.items[0].external_urls.spotify + `
        Album: ` + data.tracks.items[0].album.name + `
        
        `;

        console.log(answer)
        fs.appendFile('log.txt', answer, function(err) {
            if (err) throw err;
        });
        // console.log('\n\n');
        // console.log('Artist: ' + data.tracks.items[0].album.artists[0].name);
        // console.log('Song name: ' + data.tracks.items[0].name);
        // console.log('Preview: ' + data.tracks.items[0].external_urls.spotify);
        // console.log('Album: ' + data.tracks.items[0].album.name);
        // console.log('\n\n');
    })
}

//Search Concert Function
function searchConcert(searchTerm) {
    // Grab the axios package...
    var axios = require("axios");

    var artist = userArguments[1];
    // console.log(artist);

    axios
        .get("http://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            // If the axios was successful...
            // Then log the body from the site!
            // console.log(response.data.length);

            // console.log('\n\n');
            for (let i = 0; i < response.data.length; i++) {

                let answer = `
                Venue name: ` + response.data[i].venue.name + `
                Venue location: ` + response.data[i].venue.city + ", " + response.data[i].venue.region + " " + response.data[i].venue.country + `
                Date of Event: ` + moment(response.data[i].datetime).format('MM/DD/YYYY') + `
                `

                console.log(answer)
                fs.appendFile('log.txt', answer, function(err) {
                    if (err) throw err;
                });
                // console.log('Venue name: ' + response.data[i].venue.name);
                // console.log('Venue location: ' + response.data[i].venue.city + ", " + response.data[i].venue.region + " " + response.data[i].venue.country);
                // console.log('Date of Event: ' + moment(response.data[i].datetime).format('MM/DD/YYYY'));
                // console.log('\n');
            }
            // console.log('\n');
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

// SEARCH MOVIE FUNCTION
function searchMovies(searchTerm) {

    var axios = require("axios");

    if (searchTerm === "") {
        searchTerm = "Mr. Nobody";
    }

    axios
        .get("http://www.omdbapi.com/?apikey=trilogy&t=" + searchTerm)
        .then(function (response) {
            // If the axios was successful...
            // Then log the body from the site!

            if (response.data.Response === "True") {
                console.log('\n\n');
                console.log('Title: ' + response.data.Title);
                console.log('Year Released: ' + response.data.Year);
                console.log('IMDB Rating: ' + response.data.imdbRating + "/10");
                console.log('Rotten Tomatoes Rating: ' + response.data.Ratings[1].Value);
                console.log('Country: ' + response.data.Country);
                console.log('Language: ' + response.data.Language);
                console.log('Plot: ' + response.data.Plot);
                console.log('Actors: ' + response.data.Actors);
                console.log('\n\n');

            } else {
                console.log(response.data.Error)
            }
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

//IF USER ENETERED "do-what-it-says"
if (userArguments[0] === "do-what-it-says") {

    fs.readFile('random.txt', 'utf8', (err, data) => {
        if (err) throw err;
        var fileArguments = data.split(",");
        userArguments[0] = fileArguments[0];
        searchTerm = fileArguments[1];


        // IF USER ENTERS "concert-this"
        if (userArguments[0] === "concert-this") {
            searchConcert(searchTerm)
        }

        // IF USER ENTERED "spotify-this-song"
        if (userArguments[0] === "spotify-this-song") {
            searchSpotify(searchTerm);
        }

        // IF USER ENTERED "movie-this"
        if (userArguments[0] === "movie-this") {
            searchMovies(searchTerm)
        }
    })

}

// IF USER ENTERS "concert-this"
if (userArguments[0] === "concert-this") {
    searchConcert(searchTerm)
}



// IF USER ENTERED "spotify-this-song"
if (userArguments[0] === "spotify-this-song") {

    searchSpotify(searchTerm);
}

// IF USER ENTERED "movie-this"
if (userArguments[0] === "movie-this") {
    searchMovies(searchTerm)
}


