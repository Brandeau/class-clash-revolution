
const startButton = document.getElementById('start-button');
const usernameForm = document.getElementById('username-form');

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
            console.log(playerData)

        } catch(e){
            console.error(e)
        }
}

usernameForm.addEventListener('submit', createBasePlayer)