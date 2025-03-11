const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const pollRoute = require("./routes/PollRoute");

//configuration
const PORT = process.env.PORT || 5000;
dotenv.config();
connectDB();
connectDB();

//use middlewares
const app = express();
app.use(cors());
app.use(express.json());

//api end points
app.use("/api", pollRoute);
app.get("/", (req, res) => {
  res.send("VanishVote API is running...");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
