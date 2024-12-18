import express from "express";
import { getPlayers, createPlayer } from "./routes/players.js";

export const apiRouter = express.Router();

apiRouter.get("/players", getPlayers);

apiRouter.post("/players", createPlayer);