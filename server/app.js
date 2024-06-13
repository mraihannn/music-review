if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const Controller = require("./controllers");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.post("/api/users/register", Controller.register);
app.post("/api/users/login", Controller.login);
app.post("/api/users/login-google", Controller.loginByGoogle);

app.use(require("./middlewares/authentication"));

app.get("/api/music/search", Controller.getMusic);
app.get("/api/music/recommendations", Controller.getRecommendations);
app.get("/api/music/:spotifyId", Controller.getMusicById);

app.post("/api/reviews/:spotifyId", Controller.createReview);

app.use(require("./middlewares/errorHandler"));

module.exports = app;
