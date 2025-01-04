import Character from "./Character.js";
import globals from "../globals.js";

export default class HellBatHandToHand extends Character {
    constructor(id, state, xPos, yPos, imageSet, frames, physics, hitBox, collisions, lifePoints, afterAttackLeeway) {
        super(id, state, xPos, yPos, imageSet, frames, physics, hitBox, collisions, lifePoints, afterAttackLeeway);
    }

    update() {
        const amplitude = 80;
        
        if ((this.xPos + this.imageSet.xDestinationSize) > globals.canvas.width) {
            this.physics.vx = -this.physics.vLimit;
        } else if (this.xPos < 0) {
            this.physics.vx = this.physics.vLimit;
        }
    
        this.physics.angle += this.physics.omega * globals.deltaTime;
    
        this.xPos += this.physics.vx * globals.deltaTime;
        this.yPos = this.physics.yRef + amplitude * Math.sin(this.physics.angle);
    
        this.updateAnimationFrame();
    }
}