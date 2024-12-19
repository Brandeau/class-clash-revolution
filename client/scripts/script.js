
const startButton = document.getElementById('start-button');
const usernameForm = document.getElementById('username-form');
const characterForm = document.getElementById('character-form');

let player;

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
            player = playerData;
            getPlayer(player.id)    
            console.log(player)

        } catch(e){
            console.error(e)
        }
}

async function getPlayer(playerId){
    try{
        const response = await fetch(`http://localhost:3000/api/players/${playerId}`);
        const data = await response.json();
        console.log(data);
        
    } catch(e){
        console.error("Error getting player:", e)
    }
}

async function chooseClasher(event){
    event.preventDefault();
    
    const selectedChar = characterForm.elements.character.value;
    try{
        const response = await fetch('http://localhost:3000/api/clashers');
        const data = await response.json();
        player.clashers.push(data[selectedChar])
        console.log(player.clashers)
        console.log(data["luigi"])

    } catch(e){

    }
}

usernameForm.addEventListener('submit', createBasePlayer);
characterForm.addEventListener('submit', chooseClasher);