/**
 * @import {Request, Response, NextFunction} from "express";
 */

export function tryCatch(fn){
    return async function (req, res, next){
        try{
            return fn(req, res, next);
        }catch(e){
            return next(e);
        }
    }
}
