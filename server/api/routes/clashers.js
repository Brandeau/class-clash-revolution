import { clashers } from "../../data/clashers.js";

export function getClashersHandler(req, res, next){
    try {
        return res.status(200).json(clashers);
    } catch(e) {
        return next(e);
    }
}