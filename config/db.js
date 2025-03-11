const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("Database is already connected.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "vanisvote",
    });
    isConnected = true;

    await mongoose.connection.on("connected", () => {
      console.log("Database connected successfully!");
    });

    mongoose.connection.on("error", (err) => {
      console.error("Database connection error:", err);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
