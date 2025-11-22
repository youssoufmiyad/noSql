import express from "express";
import gameController from "../controllers/game.js";

const gameRouter = express.Router();

gameRouter.get("/", gameController.getGames);

gameRouter.get("/stats", gameController.getStats);

gameRouter.get("/export", gameController.exportGamesToCsv);

gameRouter.get("/:id", gameController.getGameById);

gameRouter.post("/", gameController.addGame);

gameRouter.post("/:id/favorite", gameController.toggleGameFavorite);

gameRouter.put("/:id", gameController.modifyGame);

gameRouter.delete("/:id", gameController.deleteGame);

export default gameRouter;
