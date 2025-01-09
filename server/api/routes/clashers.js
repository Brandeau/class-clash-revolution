import { clashers } from "../../data/clashers.js";
import { tryCatch } from "../../../utils/tryCatch.js";

/**
 * @import {Request, Response, NextFunction} from "express";
 */

/**
 * Retrieves a list of clashers
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns { Response | void}
 */
function getClashers(req, res, next){

    return res.status(200).json(clashers);
 
}

const getClashersHandler = tryCatch(getClashers);

export { getClashersHandler }