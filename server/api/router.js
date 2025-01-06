import express from "express";
import { getPlayersHandler, createPlayerHandler, getPlayerHandler, addClasherHandler, attackOpponentHandler } from "./routes/players.js";
import { getClashersHandler } from "./routes/clashers.js";
import { getOpponentsHandler } from "./routes/opponents.js";

export const apiRouter = express.Router();

apiRouter.get("/players/:id", getPlayerHandler);

apiRouter.patch("/players/:id", addClasherHandler);

apiRouter.get("/players", getPlayersHandler);

apiRouter.post("/players", createPlayerHandler);

apiRouter.get("/clashers", getClashersHandler);

apiRouter.patch("/players/:id/health", attackOpponentHandler);

apiRouter.get("/opponents", getOpponentsHandler);
