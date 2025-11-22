import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
import gameRouter from "./routes/game.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: __dirname + "/../.env" });

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/games", gameRouter);

const PORT = process.env.PORT || 3000;
// connexion à la base de données
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to database"));
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
