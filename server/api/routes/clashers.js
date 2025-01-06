const clashers = {
    luigi: {
        id: "89e38ed7-668d-496a-b7c4-a9e7542a0ef8",
        name: "Luigi",
        health: 10,
        moveset: [{
                name: "Vigilate Punch",
                description: "",
                power: 3
            },
            {
                name: "Labor Inspection Complaint",
                description: "",
                power: 1
            },
            {
                name: "Silent Quitting",
                description: "",
                power: 2
            },
            {
                name: "Industrial Sabotage",
                description: "",
                power: 3
            },{
                name: "DDOS Attack",
                description: "",
                power: 2
            }
        ]
    },
    tracy: {
        id: "dcabffe8-ed89-47a8-bd80-88ce76c8ae52",
        name: "Tracy",
        health: 10,
        moveset: [
            {
                name: "Class Action Lawsuit",
                description: "",
                power: 2
            },
            {
                name: "Egg Throw",
                description: "",
                power: 1
            },
            {
                name: "Fire Punch",
                description: "",
                power: 2
            },
            {
                name: "Underwater Extravaganza",
                description: "Throws enemy in submarine which implodes",
                power: 3
            },
            {
                name: "Cancellation",
                description: "cancels the enemy through social media",
                power: 3
            }
        ]
    }
}

export function getClashersHandler(req, res, next){
    try {
        return res.status(200).json(clashers);
    } catch(e) {
        return next(e);
    }
}

export function getClasherHandler(req, res, next){

    try {
        const {id} = req.params;

        const clasher = clashers.find((player) => player.id === id);

        return res.status(200).json(player);
    } catch(e) {
        return next(e);
    }
}