import crypto from 'crypto';
import { players } from '../../data/players.js';

/**
 * @import {Request, Response, NextFunction} from "express";
 */

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
        isPlaying: false,
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

export function attackOpponentHandler(req, res, next){
    try{
      const {id} = req.params;
      const attack = req.body;
      console.log(attack);

      const player = players.find((player) => player.id === id);

      if(Object.keys(attack).length != 0 || !attack){
        
        player.clashers[0].health = player.clashers[0].health - attack.power;
        return res.status(200).json(player.clashers[0].health);
      }

      return res.status(200).json(player.clashers[0].health);

    }catch(e){
        return next(e)
    }
}