import { CustomError } from "../../../utils/CustomError.js";
import { tryCatch } from "../../../utils/tryCatch.js";
import { players } from "../../data/players.js";
import { OPPONENT_NOT_FOUND } from "../../data/errorCodes.js";

/**
 * Finds an opponent
 * 
 * @param {Response} req 
 * @param {Request} res 
 * @param {NextFunction} next 
 * @returns {Response | void}
 */
export function getOpponent(req, res){

    const playerId = req.query.playerId;
    const opponent = players.find((player) => player.id !== playerId);

    if(!opponent){
        throw new CustomError(OPPONENT_NOT_FOUND, "Could not find an opponent", 404);
    }

    return res.status(200).json(opponent);

}

const getOpponentHandler = tryCatch(getOpponent);

export { getOpponentHandler }