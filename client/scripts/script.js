
const startButton = document.getElementById('start-button');
const usernameForm = document.getElementById('username-form');
const characterForm = document.getElementById('character-form');
const attackSection = document.getElementById('attacks');

let player;
let playerId;
let clashers = [];

/**
 * Creates a player with only a nickname
 * 
 * @param {SubmitEvent} event 
 */
async function createBasePlayer(event){
        event.preventDefault();

        const nickname = event.target?.username?.value;
        
        try{
            const response = await fetch("http://localhost:3000/api/players", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: nickname,
                })
            });
            const playerData = await response.json();
            playerId = playerData.id;    

        } catch(e){
            console.error(e)
        }
}

/**
 * Retrieves the player via UUID
 * 
 * @param {UUID} playerId 
 */
async function getPlayer(playerId){
    try{
        const response = await fetch(`http://localhost:3000/api/players/${playerId}`);
        const data = await response.json();
        
    } catch(e){
        console.error("Error getting player:", e)
    }
}

/**
 * Adds the selected clasher to the clashers array
 */
async function chooseClasher(){
    
    const selectedChar = characterForm.elements.character.value;
    try{
        const response = await fetch('http://localhost:3000/api/clashers');
        const data = await response.json();

        const clasher = data.find((clasher) => clasher.name === selectedChar);

        clashers.push(clasher);

    } catch(e){

    }
}

/**
 * Adds the selected clasher to the player's clasher array property
 */
async function addClasher(){
    
    try{    
        const clasher = clashers[0];
        const response = await fetch(`http://localhost:3000/api/players/${playerId}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clasher)
        })
        const data = await response.json();
        player = data;

    } catch(e){
        console.error("Error updating player:", e)    }

}

/**
 * Searches for an opponent
 */
async function searchOpponent(){
    try{
        const response = await fetch(`http://localhost:3000/api/opponents?playerId=${playerId}`);
        const data = await response.json();
        
        return data;

    }catch(e){
        console.error("Oops");
    }
}

/**
 * Handles each attack
 */
async function handleAttackButtonClick(){

    const opponent = await searchOpponent();
    const opponentId = opponent.id;

    try{
        const response = await fetch(`http://localhost:3000/api/players/${opponentId}/health`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.dataset.name,
                description: this.dataset.description,
                power: this.dataset.power
            })
        })
        const health = await response.json();
    }catch(e){
        console.error("Something went wrong")
    }
}

/**
 * Creates a list with the moves for the character
 */
async function createAttackList(){
    const moves = player.clashers[0].moveset;
    const attackUl = document.createElement("ul");
    attackUl.className = 'attackButtonListClass';

    for(let i = 0; i < moves.length; i++){
        const li = document.createElement('li');
        const attackButton = document.createElement('button');
        attackButton.dataset.name = moves[i].name;
        attackButton.dataset.description = moves[i].description;
        attackButton.dataset.power = moves[i].power;
        attackButton.onclick = handleAttackButtonClick;
        li.textContent = moves[i].name;
        attackButton.appendChild(li)
        attackUl.appendChild(attackButton);
    }

    attackSection.append(attackUl);
}

/**
 * Initializes the fight
 * 
 * @param {SubmitEvent} event 
 */
async function startFightHandler(event){
    event.preventDefault();

    await chooseClasher();
    await addClasher();
    await createAttackList();
}

usernameForm.addEventListener('submit', createBasePlayer);
characterForm.addEventListener('submit', startFightHandler);