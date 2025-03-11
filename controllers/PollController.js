const Poll = require("../models/poll");

// add a new poll
const createPoll = async (req, res) => {
  const { question, type, options, expiresIn } = req.body;
  const expiresAt = new Date(Date.now() + expiresIn * 60 * 60 * 1000);

  const pollOptions =
    type === "yes-no"
      ? [
          { text: "Yes", votes: 0 },
          { text: "No", votes: 0 },
        ]
      : options.map((option) => ({ text: option, votes: 0 }));

  const poll = new Poll({
    question,
    type,
    options: pollOptions,
    expiresAt,
    resultsVisible: false,
  });
  console.log(poll);

  await poll.save();
  res.json({ id: poll._id });
};

// get a poll by id
const getPoll = async (req, res) => {
  const poll = await Poll.findById(req.params.id);

  if (!poll) {
    return res.status(404).json({ error: "Poll not found" });
  }

  // Check if the poll has expired
  if (poll.expiresAt < new Date() && !poll.resultsVisible) {
    poll.resultsVisible = true;
    await poll.save();
  }

  res.json(poll);
};

//poll voting system
const pollVote = async (req, res) => {
  console.log(req.params.id);
  console.log("first");
  const { optionIndex } = req.body;
  const poll = await Poll.findById(req.params.id);

  if (!poll) {
    return res.status(404).json({ error: "Poll not found" });
  }

  // Check if the poll has expired
  if (poll.expiresAt < new Date() && !poll.resultsVisible) {
    poll.resultsVisible = true;
    await poll.save();
    return poll;
  }

  poll.options[optionIndex].votes += 1;
  await poll.save();
  res.json(poll);
};

// Poll comment for Anonymous
const pollComments = async (req, res) => {
  try {
    const { text } = req.body;
    const poll = await Poll.findById(req.params.id);

    if (!poll) {
      return res.status(404).json({ error: "Poll not found" });
    }

    poll.comments.push({ text });
    await poll.save();

    res.json(poll.comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//poll like reaction
const pollLike = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);

    if (!poll) {
      return res.status(404).json({ error: "Poll not found" });
    }

    poll.likes += 1;
    await poll.save();

    res.json({ likes: poll.likes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//poll like reaction
const pollTrending = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);

    if (!poll) {
      return res.status(404).json({ error: "Poll not found" });
    }

    poll.trending += 1;
    await poll.save();

    res.json({ likes: poll.likes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPoll,
  getPoll,
  pollVote,
  pollComments,
  pollLike,
  pollTrending,
};
