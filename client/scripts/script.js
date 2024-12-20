
const startButton = document.getElementById('start-button');
const usernameForm = document.getElementById('username-form');
const characterForm = document.getElementById('character-form');

let player;
let playerId;
let clashers = [];

/**
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
 * 
 * @param {SubmitEvent} event 
 */
async function chooseClasher(event){
    event.preventDefault();
    
    const selectedChar = characterForm.elements.character.value;
    try{
        const response = await fetch('http://localhost:3000/api/clashers');
        const data = await response.json();

        clashers.push(data[selectedChar]);
        addClasher();

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

usernameForm.addEventListener('submit', createBasePlayer);
characterForm.addEventListener('submit', chooseClasher);