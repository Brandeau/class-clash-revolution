import crypto from 'crypto';

/**
 * @import {Request, Response, NextFunction} from "express";
 */

const players = [];

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Response | void}
 */
export function getPlayersHandler(req, res, next) {
    try {
        return res.status(200).json(players);
    } catch(e) {
        return next(e);
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Response | void}
 */
export function createPlayerHandler(req, res, next){
    const uuid = crypto.randomUUID();
    const {name} = req.body;
    const player = { 
        id: uuid,
        name: name,
        clashers: []
    }

    players.push(player);

    try {
        return res.status(200).json(player);
    } catch(e) {
        return next(e);
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Response | void}
 */
export function getPlayerHandler(req, res, next){

    try {
        const {id} = req.params;

        const player = players.find((player) => player.id === id);

        return res.status(200).json(player);
    } catch(e) {
        return next(e);
    }
}

export function addClasherHandler(req, res, next){
    try{
        const {id} = req.params;
        const newClasher = req.body;

        const player = players.find((player) => player.id === id);

        player.clashers.push(newClasher);

        return res.status(200).json(player)
    }catch(e){
        return next(e);
    }
}