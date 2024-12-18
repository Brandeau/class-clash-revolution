import express from "express";
import cors from "cors";
import { apiRouter } from "./api/router.js";

export const app = express();

app.use(express.json());

app.use(cors());

app.use("/api", apiRouter);