import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utils/connect.js";

import formRoutes from "./routes/form.js";
import dalleRoutes from "./routes/dall-e.js";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1", formRoutes);
app.use("/api/v1/dalle", dalleRoutes);

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080);
  } catch (err) {
    console.log(err);
  }
};

startServer();
