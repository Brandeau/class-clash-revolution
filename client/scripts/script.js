
const startButton = document.getElementById('start-button');
const usernameForm = document.getElementById('username-form');
const characterForm = document.getElementById('character-form');
const attackSection = document.getElementById('attacks');

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

async function chooseClasher(){
    
    const selectedChar = characterForm.elements.character.value;
    try{
        const response = await fetch('http://localhost:3000/api/clashers');
        const data = await response.json();

        clashers.push(data[selectedChar]);

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

async function createAttackList(){
    const moves = player.clashers[0].moveset[0];
    const attackUl = document.createElement("ul");
    attackUl.className = 'attackButtonListClass';

    for (const key in moves) {
        const li = document.createElement('li');
        const attackButton = document.createElement('button');
        li.textContent = moves[key].name;
        attackButton.appendChild(li)
        attackUl.appendChild(attackButton);
      }

    attackSection.append(attackUl);
}

async function startFightHandler(event){
    event.preventDefault();
    await chooseClasher();
    await addClasher();
    await createAttackList();
}

usernameForm.addEventListener('submit', createBasePlayer);
characterForm.addEventListener('submit', startFightHandler);