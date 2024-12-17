
const startButton = document.getElementById('start-button');
const usernameForm = document.getElementById('username-form');

/**
 * 
 * @param {SubmitEvent} event 
 */
function createBasePlayer(event){
    event.preventDefault();

    const nickname = event.target?.username?.value;
    
    fetch("http://localhost:3000/api/players", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: nickname,
        })
    }).then((r) => r.json()).then(console.log).catch(console.error);
}

usernameForm.addEventListener('submit', createBasePlayer)