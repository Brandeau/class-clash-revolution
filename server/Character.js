
class Character {
    constructor(id, name, health, moveset){
        this.id = id;
        this.name = name;
        this.health = health;
        this.moveset = [];
    }

    dealDamage(opponent, move){
        const oppHealth = opponent.health;
    
        const newOppHealth = oppHealth - move.power;
    
        return newOppHealth;
    }

    receiveDamage(move){
        this.heath = this.health - move.power;
    }

    addMove(move){
        this.moveset.push(move);
        return this;
    }
}

export { Character };