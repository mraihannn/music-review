const { default: axios } = require("axios");

const spotifyAPI = axios.create({
  baseURL: process.env.SPOTIFY_API,
});

module.exports = spotifyAPI;
