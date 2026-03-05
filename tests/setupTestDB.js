
import dotenv from "dotenv";
dotenv.config(); // loads MONGO_URI from .env

import connectDB from "../src/config/db.js";

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  // Close MongoDB connection after all tests
  const mongoose = await import("mongoose").then(m => m.default);
  await mongoose.connection.close();
});