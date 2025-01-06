import { players } from "../../data/players.js";

export function getOpponentsHandler(req, res, next){

    const playerId = req.query.playerId;
    const opponent = players.find((player) => player.id !== playerId) || null;
    try {
        return res.status(200).json(opponent);
    } catch(e) {
        return next(e);
    }
}