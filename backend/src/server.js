import express from "express";
import notesRouter from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

connectDB();

//middleware / allows to get access to request body
app.use(express.json());

app.use("/api/notes", notesRouter);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
