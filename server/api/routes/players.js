import crypto from 'crypto';
import { players } from '../../data/players.js';
import { tryCatch } from '../../../utils/tryCatch.js';
import { create } from 'domain';

/**
 * @import {Request, Response, NextFunction} from "express";
 */

/**
 * Retrieves a list of players
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Response | void}
 */
function getPlayers(req, res, next) {
    try {
        return res.status(200).json(players);
    } catch(e) {
        return next(e);
    }
}

/**
 * Creates the player
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Response | void}
 */
function createPlayer(req, res, next){
  const uuid = crypto.randomUUID();
  const {name} = req.body;
  const player = { 
      id: uuid,
      name: name,
      isPlaying: false,
      clashers: []
  }

  players.push(player);

  return res.status(200).json(player);

}

/**
 * Retrieves a player with a specific id
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Response | void}
 */
function getPlayer(req, res, next){

  const {id} = req.params;

  const player = players.find((player) => player.id === id);

  return res.status(200).json(player);

}

/**
 * Adds a clasher to the specified player
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Response | void}
 */
function addClasher(req, res, next){

  const {id} = req.params;
  const newClasher = req.body;

  const player = players.find((player) => player.id === id);

  player.clashers.push(newClasher);

  return res.status(200).json(player)

}

/**
 * Handles the effect of an attack on the opponent's health
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Response | void}
 */
function attackOpponent(req, res, next){

  const {id} = req.params;
  const attack = req.body;
  console.log(attack);

  const player = players.find((player) => player.id === id);

  if(Object.keys(attack).length != 0 || !attack){
    
    player.clashers[0].health = player.clashers[0].health - attack.power;
    return res.status(200).json(player.clashers[0].health);
  }

  return res.status(200).json(player.clashers[0].health);

}

const getPlayersHandler = tryCatch(getPlayers);
const getPlayerHandler = tryCatch(getPlayer);
const createPlayerHandler = tryCatch(createPlayer);
const addClasherHandler = tryCatch(addClasher);
const attackOpponentHandler = tryCatch(attackOpponent);

export { getPlayerHandler, getPlayersHandler, createPlayerHandler, addClasherHandler, attackOpponentHandler }