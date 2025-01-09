/**
 * Retrieves a player from the list of players by its id
 * @param {array} players 
 * @param {UUUID} id 
 */
export function findById(players, id){
    const player = players.find((player) => player.id === id);

    return player;

}