/**
 * @import {Request, Response, NextFunction} from "express";
 */

import { CustomError } from "../utils/CustomError.js";

/**
 * 
 * @param {Error} err 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
export function errorHandler(err, req, res, next){
    console.error(err);

    if(err instanceof CustomError){
        return res.status(err.statusCode).json({code: err.code});
    }

    return res.status(500).send(err.message);
}