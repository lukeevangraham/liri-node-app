require("dotenv").config();

var keys = require("./keys.js");

// Example of accessing key information
// var spotify = new Spotify(keys.spotify);

// Take in the command line arguments
const userArguments = process.argv.slice(2);

console.log(userArguments);