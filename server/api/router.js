import express from "express";
import { getPlayersHandler, createPlayerHandler, getPlayerHandler, addClasherHandler } from "./routes/players.js";
import { getClashersHandler } from "./routes/clashers.js";

export const apiRouter = express.Router();

apiRouter.get("/players/:id", getPlayerHandler);

apiRouter.patch("/players/:id", addClasherHandler);

apiRouter.get("/players", getPlayersHandler);

apiRouter.post("/players", createPlayerHandler);

apiRouter.get("/clashers", getClashersHandler);
