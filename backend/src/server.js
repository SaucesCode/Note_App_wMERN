import express from "express";
import cors from "cors";
import notesRouter from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import { rateLimiter } from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();

//middleware is a function that runs in the middle of the request and response
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json()); // allows to get access to request body
app.use(rateLimiter);

app.use("/api/notes", notesRouter);

const PORT = process.env.PORT || 5001;

// connect the DB first before starting the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
  });
});
