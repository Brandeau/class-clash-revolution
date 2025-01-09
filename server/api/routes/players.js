import crypto from 'crypto';
import { players } from '../../data/players.js';
import { tryCatch } from '../../../utils/tryCatch.js';
import { CustomError } from '../../../utils/CustomError.js';
import { findById } from '../../../utils/findById.js';
import { INVALID_PLAYER_NAME, PLAYER_NOT_FOUND } from '../../data/errorCodes.js';

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
function getPlayers(req, res) {

  return res.status(200).json(players);

}

/**
 * Creates the player
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns {Response | void}
 */
function createPlayer(req, res){
  const uuid = crypto.randomUUID();
  const {name} = req.body;
  const player = { 
      id: uuid,
      name: name,
      isPlaying: false,
      clashers: []
  }

  players.push(player);

  if(name.length < 3 || typeof name !== "string"){
    throw new CustomError(INVALID_PLAYER_NAME, "Name must be a string of at least three characters", 400);
  }

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
function getPlayer(req, res){

  const {id} = req.params;

  const player = findById(players, id)

  if(!player){
    throw new CustomError(PLAYER_NOT_FOUND, "Player not found", 404);
  }

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
function addClasher(req, res){

  const {id} = req.params;
  const newClasher = req.body;

  const player = findById(players, id);

  player.clashers.push(newClasher);

  if(!player){
    throw new CustomError(PLAYER_NOT_FOUND, "Player not found", 404);
  }

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
function attackOpponent(req, res){

  const {id} = req.params;
  const attack = req.body;

  const player = findById(players, id);

  if(!player){
    throw new CustomError(PLAYER_NOT_FOUND, "Player not found", 404);
  }

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