const getGeminiResponse = require("../api/geminiAPI");
const spotifyAPI = require("../api/spotifyAPI");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const getOpenAiResponse = require("../helpers/openai");
const spotifyToken = require("../helpers/spotifyToken");
const { User, Review } = require("../models");
const CustomError = require("../utils/CustomError");

class Controller {
  static async register(req, res, next) {
    const { email, password } = req.body;

    try {
      const user = await User.create({ email, password });
      res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        throw new CustomError(
          "Unathorized2",
          "Email or password is incorrect",
          401
        );
      }

      if (!comparePassword(password, user.password)) {
        throw new CustomError(
          "Unathorized2",
          "Email or password is incorrect",
          401
        );
      }

      const access_token = signToken({ id: user.id });

      res.json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async getMusic(req, res, next) {
    const { q, limit, offset } = req.query;

    try {
      const { access_token } = await spotifyToken();
      const { data } = await spotifyAPI.get(
        `/search?q=track%3A${q.replace(
          " ",
          "+"
        )}&type=track&limit=${limit}&offset=${offset}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getMusicById(req, res, next) {
    const { spotifyId } = req.params;

    try {
      const { access_token } = await spotifyToken();
      const { data } = await spotifyAPI.get(`/tracks/${spotifyId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const reviews = await Review.findAll({
        where: { spotifyId },
      });
      res.json({ data, reviews });
    } catch (error) {
      next(error);
    }
  }

  static async getRecommendations(req, res, next) {
    try {
      const userReviews = await Review.findAll({
        where: { userId: req.user.id },
      });
      if (!userReviews.length) throw new CustomError("NotFound");

      const prompt = await Controller.createPromptFromReviews(userReviews);
      // res.json({ prompt });
      let responseAI = await getGeminiResponse(prompt);
      // responseAI = JSON.parse(responseAI);
      const { access_token } = await spotifyToken();
      const { data } = await spotifyAPI.get(
        `/search?q=track%3A${responseAI.replace(
          " ",
          "+"
        )}&type=track&limit=10&offset=0`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      res.json({ trackGenerated: responseAI, data });
    } catch (error) {
      next(error);
    }
  }

  static async createReview(req, res, next) {
    const { spotifyId } = req.params;
    const { rating, comment } = req.body;

    try {
      const review = await Review.create({
        userId: req.user.id,
        spotifyId,
        rating,
        comment,
      });
      res.json(review);
    } catch (error) {
      next(error);
    }
  }

  static async getSpotifyTrackDetails(spotifyId) {
    try {
      const { access_token } = await spotifyToken();
      const { data } = await spotifyAPI.get(`/tracks/${spotifyId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      return data;
    } catch (err) {
      console.error(err);
      throw new Error("Error fetching track details from Spotify");
    }
  }
  static async createPromptFromReviews(reviews) {
    let prompt = "Analyze the following song preferences:\n";

    for (const review of reviews) {
      const trackDetails = await Controller.getSpotifyTrackDetails(
        review.spotifyId
      );
      prompt += `- title: ${trackDetails.name} from ${trackDetails.artists
        .map((artist) => artist.name)
        .join(", ")}, Album: ${trackDetails.album.name}, Rating: ${
        review.rating
      }, Comment: ${review.comment || "No Comment"}\n`;
    }

    prompt +=
      '\nBased on these preferences, generate a song title that would likely have a high rating and a "very good" comment. Generate exactly one song title and do not include any additional text. The song should be a literal song, not just a sound.';

    return prompt;
  }
}

module.exports = Controller;
