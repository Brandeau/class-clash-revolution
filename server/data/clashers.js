import { Character } from '../Character.js'


const luigi = new Character("89e38ed7-668d-496a-b7c4-a9e7542a0ef8", "luigi", 10)
                .addMove({name: "Vigilate Punch", description: "Just a really hard punch", power: 3})
                .addMove({name: "Labor Inspection Complaint", description: "You file a complaint with the labor inspection department. The opponent is fined", power: 1})
                .addMove({name: "Silent Quitting", description: "Do as little as possible still within your job's requirements", power: 2})
                .addMove({name: "Industrial Sabotage", description: "You sabotaged the enemy's plant. They lose half of their sales", power: 3})
                .addMove({name: "DDOS Attack", description: "The enemy's site is now down!", power: 2});

const trini = new Character("dcabffe8-ed89-47a8-bd80-88ce76c8ae52", "Trini", 10)
                .addMove({name: "Class Action Lawsuit", description: "You and other victims sue the bastards! They now owe you lots of money", power: 2})
                .addMove({name: "Egg Throw", description: "A silly little prank", power: 1})
                .addMove({name: "Fire Punch", description: "You got fired, so you made a little fire", power: 2})
                .addMove({name: "Underwater Extravaganza", description: "Throws enemy in submarine which implodes", power: 3})
                .addMove({name: "Cancellation", description: "cancels the enemy through social media", power: 3});

const clashers = [luigi, trini];

export { clashers }