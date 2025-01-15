import Character from "./Character.js";
import globals from "../globals.js";
import { State } from "../constants.js";
 
export default class HellBatHandToHand extends Character {
    constructor(id, state, xPos, yPos, imageSet, frames, physics, hitBox, collisions, lifePoints, afterAttackLeeway) {
        super(id, state, xPos, yPos, imageSet, frames, physics, hitBox, collisions, lifePoints, afterAttackLeeway);
    }

    updatePhysics() {
        const amplitude = 80;
    
        this.physics.angle += this.physics.omega * globals.deltaTime;
    
        this.xPos += this.physics.vx * globals.deltaTime;
        this.yPos = this.physics.yRef + amplitude * Math.sin(this.physics.angle);
    
        this.updateAnimationFrame();
    }

    updateLogic() {
        // |||||||||||| UPDATE LIFE POINTS
        if (this.collisions.isCollidingWithPlayer) {
            const player = globals.screenSprites[0];
            
            if ((player.isLeftwardsHandToHandAttackEffective || player.isRightwardsHandToHandAttackEffective) && (this.afterAttackLeeway.value === 0)) {
                this.lifePoints--;

                globals.score += 200;

                if (this.lifePoints === 0) {
                    globals.score += 200;

                    this.state = State.OFF;
                } else {
                    this.afterAttackLeeway.value = 3;
                }
            }
        }
        
        if (this.collisions.isCollidingWithMagicalOrb && (this.afterAttackLeeway.value === 0)) {
            this.lifePoints--;

            globals.score += 150;

            if (this.lifePoints === 0) {
                globals.score += 150;

                this.state = State.OFF;
            } else {
                this.afterAttackLeeway.value = 3;
            }
        }

        if (this.afterAttackLeeway.value > 0) {
            this.afterAttackLeeway.timeChangeCounter += globals.deltaTime;
    
            if (this.afterAttackLeeway.timeChangeCounter >= this.afterAttackLeeway.timeChangeValue) {
                this.afterAttackLeeway.value--;
                this.afterAttackLeeway.timeChangeCounter = 0;
            }
        }
    }
}