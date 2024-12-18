import crypto from 'crypto';

const players = [];

export function getPlayers(req, res, next) {
    try {
        return res.status(200).json(players);
    } catch(e) {
        return next(e);
    }
}

export function createPlayer(req, res, next){
    const uuid = crypto.randomUUID();
    const name = req.body.name;
    const player = { 
        id: uuid,
        name: name,
        catchers: []
    }

    players.push(player);

    try {
        return res.status(200).json(players);
    } catch(e) {
        return next(e);
    }
}