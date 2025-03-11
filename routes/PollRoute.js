const express = require("express");
const {
  createPoll,
  getPoll,
  pollVote,
  pollComments,
  pollLike,
  pollTrending,
} = require("../controllers/PollController");
const pollRoute = express.Router();

pollRoute.post("/create-poll", createPoll);
pollRoute.get("/poll/:id", getPoll);
pollRoute.put("/poll/:id/vote", pollVote);
pollRoute.put("/poll/:id/comments", pollComments);
pollRoute.put("/poll/:id/like", pollLike);
pollRoute.put("/poll/:id/trending", pollTrending);

module.exports = pollRoute;
