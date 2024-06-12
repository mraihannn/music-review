const { default: axios } = require("axios");

async function spotifyToken() {
  try {
    const { data } = await axios.post(
      "https://accounts.spotify.com/api/token",
      {
        grant_type: "client_credentials",
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
}

module.exports = spotifyToken;
